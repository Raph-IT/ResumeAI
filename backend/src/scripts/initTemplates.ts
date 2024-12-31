import mongoose from 'mongoose';
import { Template } from '../models/Template';
import { defaultResumeTemplates, defaultCoverLetterTemplates } from '../data/defaultTemplates';
import dotenv from 'dotenv';

dotenv.config();

const initTemplates = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    
    // Supprime les templates existants
    await Template.deleteMany({});
    
    // Insère les templates par défaut
    await Template.insertMany([
      ...defaultResumeTemplates,
      ...defaultCoverLetterTemplates
    ]);
    
    console.log('Templates initialized successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing templates:', error);
    process.exit(1);
  }
};

initTemplates(); 