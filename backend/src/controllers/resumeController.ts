// src/controllers/resumeController.ts
import { Request, Response } from 'express';
import { Resume } from '../models/Resume';
import { FilterQuery } from 'mongoose';

interface SearchFilters {
  title?: string;
  templateId?: string;
  skills?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export const resumeController = {
  // Créer un nouveau CV
  create: async (req: Request, res: Response) => {
    try {
      const resume = new Resume({
        ...req.body,
        userId: req.user?.id // Ajouté par le middleware d'authentification
      });
      await resume.save();
      res.status(201).json(resume);
    } catch (error) {
      res.status(500).json({ error: 'Error creating resume' });
    }
  },

  // Récupérer tous les CV d'un utilisateur
  getAllByUser: async (req: Request, res: Response) => {
    try {
      const resumes = await Resume.find({ userId: req.user?.id });
      res.json(resumes);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching resumes' });
    }
  },

  // Récupérer un CV par son ID
  getById: async (req: Request, res: Response) => {
    try {
      const resume = await Resume.findOne({
        _id: req.params.id,
        userId: req.user?.id
      });
      
      if (!resume) {
        return res.status(404).json({ error: 'Resume not found' });
      }
      
      res.json(resume);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching resume' });
    }
  },

  // Mettre à jour un CV
  update: async (req: Request, res: Response) => {
    try {
      const resume = await Resume.findOneAndUpdate(
        { _id: req.params.id, userId: req.user?.id },
        req.body,
        { new: true }
      );

      if (!resume) {
        return res.status(404).json({ error: 'Resume not found' });
      }

      res.json(resume);
    } catch (error) {
      res.status(500).json({ error: 'Error updating resume' });
    }
  },

  // Supprimer un CV
  delete: async (req: Request, res: Response) => {
    try {
      const resume = await Resume.findOneAndDelete({
        _id: req.params.id,
        userId: req.user?.id
      });

      if (!resume) {
        return res.status(404).json({ error: 'Resume not found' });
      }

      res.json({ message: 'Resume deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting resume' });
    }
  },

  // Auto-sauvegarder un CV
  autoSave: async (req: Request, res: Response) => {
    try {
      const resume = await Resume.findOneAndUpdate(
        { _id: req.params.id, userId: req.user?.id },
        { ...req.body, updatedAt: new Date() },
        { new: true }
      );

      if (!resume) {
        return res.status(404).json({ error: 'Resume not found' });
      }

      res.json(resume);
    } catch (error) {
      res.status(500).json({ error: 'Error auto-saving resume' });
    }
  },

  // Dupliquer un CV
  duplicate: async (req: Request, res: Response) => {
    try {
      const originalResume = await Resume.findOne({
        _id: req.params.id,
        userId: req.user?.id
      });

      if (!originalResume) {
        return res.status(404).json({ error: 'Resume not found' });
      }

      const duplicateResume = new Resume({
        ...originalResume.toObject(),
        _id: undefined,
        title: `${originalResume.title} (Copy)`,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      await duplicateResume.save();
      res.status(201).json(duplicateResume);
    } catch (error) {
      res.status(500).json({ error: 'Error duplicating resume' });
    }
  },

  // Recherche avancée de CV
  search: async (req: Request, res: Response) => {
    try {
      const {
        query,
        filters,
        sort = 'updatedAt',
        order = 'desc',
        page = 1,
        limit = 10
      } = req.body;

      const searchQuery: FilterQuery<typeof Resume> = {
        userId: req.user?.id
      };

      // Recherche textuelle
      if (query) {
        searchQuery.$or = [
          { title: { $regex: query, $options: 'i' } },
          { 'contact.fullName': { $regex: query, $options: 'i' } },
          { 'skills.name': { $regex: query, $options: 'i' } }
        ];
      }

      // Appliquer les filtres
      if (filters) {
        if (filters.title) {
          searchQuery.title = { $regex: filters.title, $options: 'i' };
        }

        if (filters.templateId) {
          searchQuery.templateId = filters.templateId;
        }

        if (filters.skills?.length) {
          searchQuery['skills.name'] = { $in: filters.skills };
        }

        if (filters.dateRange) {
          searchQuery.updatedAt = {
            $gte: filters.dateRange.start,
            $lte: filters.dateRange.end
          };
        }
      }

      // Calculer le nombre total pour la pagination
      const total = await Resume.countDocuments(searchQuery);

      // Exécuter la requête avec tri et pagination
      const resumes = await Resume.find(searchQuery)
        .sort({ [sort]: order === 'desc' ? -1 : 1 })
        .skip((page - 1) * limit)
        .limit(limit);

      res.json({
        resumes,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'Error searching resumes' });
    }
  },

  // Suggestions de compétences basées sur les CV existants
  suggestSkills: async (req: Request, res: Response) => {
    try {
      const { query } = req.query;
      
      const skills = await Resume.aggregate([
        { $match: { userId: req.user?.id } },
        { $unwind: '$skills' },
        { $group: { _id: '$skills.name', count: { $sum: 1 } } },
        { $match: { _id: { $regex: query as string, $options: 'i' } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
      ]);

      res.json(skills.map(s => ({ name: s._id, count: s.count })));
    } catch (error) {
      res.status(500).json({ error: 'Error fetching skill suggestions' });
    }
  },

  // Statistiques des CV
  getStats: async (req: Request, res: Response) => {
    try {
      const stats = await Resume.aggregate([
        { $match: { userId: req.user?.id } },
        {
          $group: {
            _id: null,
            totalResumes: { $sum: 1 },
            averageSkills: { $avg: { $size: '$skills' } },
            templateUsage: {
              $push: '$templateId'
            },
            updatedThisMonth: {
              $sum: {
                $cond: [
                  {
                    $gte: [
                      '$updatedAt',
                      new Date(new Date().setDate(1))
                    ]
                  },
                  1,
                  0
                ]
              }
            }
          }
        }
      ]);

      res.json(stats[0] || { totalResumes: 0, averageSkills: 0, templateUsage: [], updatedThisMonth: 0 });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching resume statistics' });
    }
  }
};