// src/services/openaiService.ts
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const API_URL = 'https://api.openai.com/v1/chat/completions';

export interface ParsedResume {
  fullName: string;
  jobTitle: string;
  phoneNumber: string;
  linkedinUrl: string;
  location: string;
  experienceLevel: string;
  minimumSalary: string;
  jobType: 'Full Time' | 'Part Time';
}

export const openaiService = {
  async parseResume(text: string): Promise<ParsedResume> {
    const prompt = `
      Analyze the following resume text and extract key information in JSON format.
      Please return ONLY the JSON object with the following structure:
      {
        "fullName": "extracted full name",
        "jobTitle": "most recent or main job title",
        "phoneNumber": "extracted phone number",
        "linkedinUrl": "extracted LinkedIn URL or empty string",
        "location": "extracted location/city",
        "experienceLevel": "Entry/Mid-Level/Senior based on experience",
        "minimumSalary": "extracted salary expectation or empty string",
        "jobType": "Full Time or Part Time"
      }

      Resume text:
      ${text}
    `;

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo", // Utiliser gpt-3.5-turbo au lieu de gpt-4 (moins cher et plus de quota)
          messages: [
            {
              role: "system",
              content: "You are a resume parser. You only respond with valid JSON objects containing the requested information from resumes. If information is not found, use empty strings or reasonable defaults."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.1,
          max_tokens: 500 // Limite la longueur de la réponse
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`OpenAI API Error: ${response.status} - ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      
      if (!data.choices?.[0]?.message?.content) {
        throw new Error('Invalid response format from OpenAI');
      }

      try {
        const parsedData = JSON.parse(data.choices[0].message.content);
        return parsedData;
      } catch (parseError) {
        console.error('Invalid JSON in GPT response:', data.choices[0].message.content);
        throw new Error('Failed to parse GPT response as JSON');
      }
    } catch (error) {
      console.error('Detailed error:', error);
      
      // Retourner un objet par défaut en cas d'erreur
      return {
        fullName: '',
        jobTitle: '',
        phoneNumber: '',
        linkedinUrl: '',
        location: '',
        experienceLevel: 'Entry',
        minimumSalary: '',
        jobType: 'Full Time' as const
      };
    }
  }
};