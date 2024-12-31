import { Request, Response } from 'express';
import { Resume } from '../models/Resume';
import { ResumeVersion } from '../models/ResumeVersion';

export const resumeVersionController = {
  // Créer une nouvelle version
  create: async (req: Request, res: Response) => {
    try {
      const { resumeId } = req.params;
      const { name, notes } = req.body;

      // Vérifier que le CV existe et appartient à l'utilisateur
      const resume = await Resume.findOne({
        _id: resumeId,
        userId: req.user?.id
      });

      if (!resume) {
        return res.status(404).json({ error: 'Resume not found' });
      }

      // Trouver la dernière version
      const lastVersion = await ResumeVersion.findOne({ resumeId })
        .sort({ version: -1 });

      const newVersion = new ResumeVersion({
        resumeId,
        userId: req.user?.id,
        version: lastVersion ? lastVersion.version + 1 : 1,
        data: resume.toObject(),
        name,
        notes
      });

      await newVersion.save();
      res.status(201).json(newVersion);
    } catch (error) {
      res.status(500).json({ error: 'Error creating version' });
    }
  },

  // Récupérer toutes les versions d'un CV
  getAllVersions: async (req: Request, res: Response) => {
    try {
      const { resumeId } = req.params;
      const versions = await ResumeVersion.find({
        resumeId,
        userId: req.user?.id
      }).sort({ version: -1 });

      res.json(versions);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching versions' });
    }
  },

  // Restaurer une version spécifique
  restore: async (req: Request, res: Response) => {
    try {
      const { resumeId, versionId } = req.params;

      // Vérifier que la version existe et appartient à l'utilisateur
      const version = await ResumeVersion.findOne({
        _id: versionId,
        resumeId,
        userId: req.user?.id
      });

      if (!version) {
        return res.status(404).json({ error: 'Version not found' });
      }

      // Créer une nouvelle version avant de restaurer
      const newVersion = new ResumeVersion({
        resumeId,
        userId: req.user?.id,
        version: version.version + 1,
        data: version.data,
        name: `Restored from version ${version.version}`,
        notes: `Automatic version created when restoring version ${version.version}`
      });

      await newVersion.save();

      // Mettre à jour le CV avec les données de la version
      const resume = await Resume.findOneAndUpdate(
        { _id: resumeId, userId: req.user?.id },
        version.data,
        { new: true }
      );

      if (!resume) {
        return res.status(404).json({ error: 'Resume not found' });
      }

      res.json({ resume, version: newVersion });
    } catch (error) {
      res.status(500).json({ error: 'Error restoring version' });
    }
  },

  // Comparer deux versions
  compare: async (req: Request, res: Response) => {
    try {
      const { resumeId, version1Id, version2Id } = req.params;

      const [version1, version2] = await Promise.all([
        ResumeVersion.findOne({
          _id: version1Id,
          resumeId,
          userId: req.user?.id
        }),
        ResumeVersion.findOne({
          _id: version2Id,
          resumeId,
          userId: req.user?.id
        })
      ]);

      if (!version1 || !version2) {
        return res.status(404).json({ error: 'One or both versions not found' });
      }

      res.json({
        version1: {
          version: version1.version,
          data: version1.data,
          createdAt: version1.createdAt
        },
        version2: {
          version: version2.version,
          data: version2.data,
          createdAt: version2.createdAt
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'Error comparing versions' });
    }
  }
}; 