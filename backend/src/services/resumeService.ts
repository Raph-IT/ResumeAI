import admin from '../config/firebase-admin';
import OpenAI from 'openai';
const pdfParse = require('pdf-parse');

const db = admin.firestore();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

interface ExtractedData {
  fullName: string;
  jobTitle: string;
  phoneNumber: string;
  linkedinUrl: string;
  location: string;
  experienceLevel: string;
  minimumSalary: string;
  jobType: 'Full Time' | 'Part Time';
}

export const extractResumeData = async (fileBuffer: Buffer): Promise<ExtractedData> => {
  try {
    // 1. Extraire le texte du PDF avec pdf-parse
    const data = await pdfParse(fileBuffer);
    const text = data.text;

    // 2. Utiliser ChatGPT pour analyser le texte
    const prompt = `
      Analyze the following resume text and extract these information in JSON format:
      - fullName
      - jobTitle
      - phoneNumber
      - linkedinUrl
      - location
      - experienceLevel (Entry/Mid/Senior)
      - minimumSalary (if mentioned)
      - jobType (Full Time/Part Time)
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a resume parser. Extract information and respond only with valid JSON."
        },
        {
          role: "user",
          content: prompt
        }
      ]
    });

    const responseContent = completion.choices[0].message.content;
    if (!responseContent) {
      throw new Error('No response from OpenAI');
    }

    const parsedData = JSON.parse(responseContent);
    return {
      fullName: parsedData.fullName || '',
      jobTitle: parsedData.jobTitle || '',
      phoneNumber: parsedData.phoneNumber || '',
      linkedinUrl: parsedData.linkedinUrl || '',
      location: parsedData.location || '',
      experienceLevel: parsedData.experienceLevel || 'Entry',
      minimumSalary: parsedData.minimumSalary || '',
      jobType: parsedData.jobType || 'Full Time'
    };

  } catch (error) {
    console.error('Error extracting data from PDF:', error);
    throw new Error('Failed to extract data from PDF');
  }
};

export const saveResumeData = async (userId: string, data: any) => {
  try {
    await db.collection('resumes').doc(userId).set(data, { merge: true });
  } catch (error) {
    console.error('Error in saveResumeData:', error);
    throw error;
  }
}; 