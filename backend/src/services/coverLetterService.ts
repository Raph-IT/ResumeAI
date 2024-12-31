import OpenAI from 'openai';
import admin from '../config/firebase-admin';

const db = admin.firestore();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

interface CoverLetterData {
  jobDescription: string;
  tone: 'Formal' | 'Semi-Formal' | 'Casual';
  userId: string;
}

interface CoverLetter {
  id: string;
  title: string;
  content: string;
  tone: 'Formal' | 'Semi-Formal' | 'Casual';
  createdAt: Date;
  userId: string;
}

export const generateCoverLetter = async (data: CoverLetterData): Promise<CoverLetter> => {
  try {
    const prompt = `
      Write a cover letter for the following job description:
      "${data.jobDescription}"
      
      Requirements:
      - Use a ${data.tone.toLowerCase()} tone
      - Keep it concise but compelling
      - Focus on relevant skills and experience
      - Make it engaging and personal
      - Follow standard cover letter format
      
      Response format:
      {
        "title": "Job title from description",
        "content": "Full cover letter content"
      }
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a professional cover letter writer. Generate a cover letter and respond only with valid JSON."
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

    const parsedResponse = JSON.parse(responseContent);
    
    // Créer un nouveau document dans Firestore
    const coverLetterRef = db.collection('coverLetters').doc();
    const coverLetter: CoverLetter = {
      id: coverLetterRef.id,
      title: parsedResponse.title,
      content: parsedResponse.content,
      tone: data.tone,
      createdAt: new Date(),
      userId: data.userId
    };

    await coverLetterRef.set(coverLetter);
    return coverLetter;

  } catch (error) {
    console.error('Error generating cover letter:', error);
    throw new Error('Failed to generate cover letter');
  }
};

export const getCoverLetters = async (userId: string): Promise<CoverLetter[]> => {
  try {
    const snapshot = await db
      .collection('coverLetters')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();

    return snapshot.docs.map(doc => doc.data() as CoverLetter);
  } catch (error) {
    console.error('Error fetching cover letters:', error);
    throw new Error('Failed to fetch cover letters');
  }
};

export const deleteCoverLetter = async (id: string, userId: string): Promise<void> => {
  try {
    const doc = await db.collection('coverLetters').doc(id).get();
    if (!doc.exists) {
      throw new Error('Cover letter not found');
    }
    
    const coverLetter = doc.data() as CoverLetter;
    if (coverLetter.userId !== userId) {
      throw new Error('Unauthorized');
    }

    await doc.ref.delete();
  } catch (error) {
    console.error('Error deleting cover letter:', error);
    throw new Error('Failed to delete cover letter');
  }
}; 