import mongoose from 'mongoose';
import { TemplateBase } from '../types/templates';

const templateSchema = new mongoose.Schema({
  id: String,
  name: { type: String, required: true },
  description: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['resume', 'coverLetter'], 
    required: true 
  },
  tags: [String],
  thumbnail: String,
  sections: [{
    id: String,
    name: String,
    type: String,
    required: Boolean,
    maxItems: Number
  }],
  structure: {
    header: Boolean,
    greeting: Boolean,
    sections: [String],
    closing: Boolean
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Template = mongoose.model<TemplateBase>('Template', templateSchema); 