import { z } from 'zod';

// Schémas de base
const contactSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  location: z.string().optional(),
  linkedin: z.string().url('Invalid LinkedIn URL').optional(),
  website: z.string().url('Invalid website URL').optional(),
});

const experienceSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  company: z.string().min(2, 'Company is required'),
  location: z.string().optional(),
  startDate: z.string().min(2, 'Start date is required'),
  endDate: z.string().optional(),
  current: z.boolean().optional(),
  description: z.array(z.string()),
  achievements: z.array(z.string()).optional(),
});

const educationSchema = z.object({
  degree: z.string().min(2, 'Degree is required'),
  institution: z.string().min(2, 'Institution is required'),
  location: z.string().optional(),
  startDate: z.string().min(2, 'Start date is required'),
  endDate: z.string().optional(),
  current: z.boolean().optional(),
  gpa: z.string().optional(),
  achievements: z.array(z.string()).optional(),
});

// Schéma principal du CV
export const resumeSchema = z.object({
  title: z.string().min(2, 'Resume title is required'),
  templateId: z.string().min(1, 'Template is required'),
  contact: contactSchema,
  experience: z.array(experienceSchema).min(1, 'At least one experience is required'),
  education: z.array(educationSchema),
  skills: z.array(z.object({
    name: z.string().min(2, 'Skill name is required'),
    level: z.number().min(0).max(100).optional(),
    category: z.string().optional(),
  })),
  projects: z.array(z.object({
    name: z.string().min(2, 'Project name is required'),
    description: z.string().min(10, 'Project description is too short'),
    technologies: z.array(z.string()),
    link: z.string().url('Invalid project URL').optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
  })).optional(),
  languages: z.array(z.object({
    name: z.string().min(2, 'Language name is required'),
    level: z.string().min(2, 'Language level is required'),
  })).optional(),
  certifications: z.array(z.string()).optional(),
  summary: z.string().optional(),
});

// Middleware de validation
export const validateResume = (schema: z.ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          error: 'Validation failed',
          details: error.errors,
        });
      } else {
        next(error);
      }
    }
  };
}; 