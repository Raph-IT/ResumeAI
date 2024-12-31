import { Request, Response } from 'express';
import { aiService } from '../services/aiService';

export const aiSuggestionController = {
  // Améliorer une description
  improveDescription: async (req: Request, res: Response) => {
    try {
      const { description, context } = req.body;
      const improvedDescription = await aiService.improveDescription(description, context);
      res.json({ improvedDescription });
    } catch (error) {
      res.status(500).json({ error: 'Error improving description' });
    }
  },

  // Suggérer des compétences
  suggestSkills: async (req: Request, res: Response) => {
    try {
      const { jobTitle, experience } = req.body;
      const suggestedSkills = await aiService.suggestSkills(jobTitle, experience);
      res.json({ skills: suggestedSkills });
    } catch (error) {
      res.status(500).json({ error: 'Error suggesting skills' });
    }
  },

  // Améliorer le résumé
  improveSummary: async (req: Request, res: Response) => {
    try {
      const { summary, experience, skills } = req.body;
      const improvedSummary = await aiService.improveSummary(summary, experience, skills);
      res.json({ improvedSummary });
    } catch (error) {
      res.status(500).json({ error: 'Error improving summary' });
    }
  },

  // Analyser le CV complet
  analyzeResume: async (req: Request, res: Response) => {
    try {
      const resume = req.body;
      
      // Analyser chaque section et fournir des suggestions
      const suggestions = {
        summary: await aiService.improveSummary(
          resume.summary,
          resume.experience.map((e: any) => e.title),
          resume.skills.map((s: any) => s.name)
        ),
        skills: await aiService.suggestSkills(
          resume.experience[0]?.title,
          JSON.stringify(resume.experience)
        ),
        experience: await Promise.all(
          resume.experience.map((exp: any) =>
            aiService.improveDescription(exp.description, exp.title)
          )
        )
      };

      res.json({ suggestions });
    } catch (error) {
      res.status(500).json({ error: 'Error analyzing resume' });
    }
  }
}; 