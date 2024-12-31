import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const aiService = {
  // Améliorer une description d'expérience
  async improveDescription(description: string, context: string) {
    try {
      const prompt = `Améliorer cette description d'expérience professionnelle en la rendant plus impactante et en utilisant des verbes d'action. 
      Contexte du poste : ${context}
      Description actuelle : ${description}
      
      Améliorez en gardant le même sens mais en :
      1. Utilisant des verbes d'action forts
      2. Quantifiant les résultats quand c'est possible
      3. Mettant en avant les compétences clés
      4. Restant concis et professionnel`;

      const response = await openai.createChatCompletion({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 200
      });

      return response.data.choices[0].message?.content;
    } catch (error) {
      console.error('AI improvement error:', error);
      throw error;
    }
  },

  // Suggérer des compétences pertinentes
  async suggestSkills(jobTitle: string, experience: string) {
    try {
      const prompt = `En tant qu'expert RH, suggérez une liste de compétences pertinentes pour ce profil :
      Poste : ${jobTitle}
      Expérience : ${experience}
      
      Retournez uniquement une liste de compétences techniques et non-techniques pertinentes, séparées par des virgules.`;

      const response = await openai.createChatCompletion({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 150
      });

      const skills = response.data.choices[0].message?.content?.split(',').map(s => s.trim());
      return skills;
    } catch (error) {
      console.error('AI skills suggestion error:', error);
      throw error;
    }
  },

  // Analyser et améliorer le résumé
  async improveSummary(summary: string, experience: string[], skills: string[]) {
    try {
      const prompt = `En tant qu'expert en recrutement, améliorez ce résumé professionnel :
      Résumé actuel : ${summary}
      Expérience : ${experience.join(', ')}
      Compétences : ${skills.join(', ')}
      
      Créez un résumé professionnel percutant qui :
      1. Met en avant les réalisations clés
      2. Souligne les compétences distinctives
      3. Est adapté au marché actuel
      4. Reste concis (max 3-4 phrases)`;

      const response = await openai.createChatCompletion({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 200
      });

      return response.data.choices[0].message?.content;
    } catch (error) {
      console.error('AI summary improvement error:', error);
      throw error;
    }
  }
}; 