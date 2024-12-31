import { z } from 'zod';

export const contactSchema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  location: z.string().optional(),
  linkedin: z.string().url('Invalid LinkedIn URL').optional(),
  website: z.string().url('Invalid website URL').optional(),
});

export const experienceSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  company: z.string().min(2, 'Company is required'),
  location: z.string().optional(),
  startDate: z.string().min(2, 'Start date is required'),
  endDate: z.string().optional(),
  current: z.boolean().optional(),
  description: z.array(z.string()),
  achievements: z.array(z.string()).optional(),
});

export const educationSchema = z.object({
  degree: z.string().min(2, 'Degree is required'),
  institution: z.string().min(2, 'Institution is required'),
  location: z.string().optional(),
  startDate: z.string().min(2, 'Start date is required'),
  endDate: z.string().optional(),
  current: z.boolean().optional(),
  gpa: z.string().optional(),
  achievements: z.array(z.string()).optional(),
});

export const skillSchema = z.object({
  name: z.string().min(2, 'Skill name is required'),
  level: z.number().min(0).max(100).optional(),
  category: z.string().optional(),
});

export const projectSchema = z.object({
  name: z.string().min(2, 'Project name is required'),
  description: z.string().min(10, 'Description is too short'),
  technologies: z.array(z.string()),
  link: z.string().url('Invalid project URL').optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export const resumeSchema = z.object({
  id: z.string().optional(),
  templateId: z.string(),
  userId: z.string(),
  title: z.string().min(2, 'Resume title is required'),
  contact: contactSchema,
  experience: z.array(experienceSchema),
  education: z.array(educationSchema),
  skills: z.array(skillSchema),
  projects: z.array(projectSchema).optional(),
  languages: z.array(z.object({
    name: z.string(),
    level: z.string(),
  })).optional(),
  certifications: z.array(z.string()).optional(),
  summary: z.string().optional(),
  updatedAt: z.string().optional(),
  createdAt: z.string().optional(),
});

export type ResumeData = z.infer<typeof resumeSchema>; 