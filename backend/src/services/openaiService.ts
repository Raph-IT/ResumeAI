import openai from '../config/openai';

interface ParsedResume {
  fullName: string;
  jobTitle: string;
  phoneNumber: string;
  linkedinUrl: string;
  location: string;
  experienceLevel: string;
  minimumSalary: string;
  jobType: 'Full Time' | 'Part Time';
}

export async function parseResumeWithGPT(text: string): Promise<ParsedResume> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Extract resume information in JSON format."
        },
        {
          role: "user",
          content: `Parse this resume and return a JSON object:\n${text}`
        }
      ],
      response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    throw new Error('Failed to parse resume with GPT');
  }
}