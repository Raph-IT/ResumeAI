import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  templateId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  contact: {
    fullName: String,
    email: String,
    phone: String,
    location: String,
    linkedin: String,
    website: String
  },
  experience: [{
    title: String,
    company: String,
    location: String,
    startDate: String,
    endDate: String,
    current: Boolean,
    description: [String],
    achievements: [String]
  }],
  education: [{
    degree: String,
    institution: String,
    location: String,
    startDate: String,
    endDate: String,
    current: Boolean,
    gpa: String,
    achievements: [String]
  }],
  skills: [{
    name: String,
    level: Number,
    category: String
  }],
  projects: [{
    name: String,
    description: String,
    technologies: [String],
    link: String,
    startDate: String,
    endDate: String
  }],
  languages: [{
    name: String,
    level: String
  }],
  certifications: [String],
  summary: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware pour mettre à jour updatedAt
resumeSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const Resume = mongoose.model('Resume', resumeSchema);
   