import { Request, Response } from 'express';
import { Template } from '../models/Template';

export const templateController = {
  // Récupérer tous les templates
  getTemplates: async (req: Request, res: Response) => {
    try {
      const templates = await Template.find();
      res.json(templates);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching templates' });
    }
  },

  getTemplateById: async (req: Request, res: Response) => {
    try {
      const template = await Template.findById(req.params.id);
      if (!template) {
        return res.status(404).json({ error: 'Template not found' });
      }
      res.json(template);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching template' });
    }
  },

  // Créer un nouveau template
  createTemplate: async (req: Request, res: Response) => {
    try {
      const template = new Template(req.body);
      await template.save();
      res.status(201).json(template);
    } catch (error) {
      res.status(500).json({ error: 'Error creating template' });
    }
  },

  updateTemplate: async (req: Request, res: Response) => {
    try {
      const template = await Template.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!template) {
        return res.status(404).json({ error: 'Template not found' });
      }
      res.json(template);
    } catch (error) {
      res.status(500).json({ error: 'Error updating template' });
    }
  },

  deleteTemplate: async (req: Request, res: Response) => {
    try {
      const template = await Template.findByIdAndDelete(req.params.id);
      if (!template) {
        return res.status(404).json({ error: 'Template not found' });
      }
      res.json({ message: 'Template deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting template' });
    }
  }
}; 