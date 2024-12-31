import { db } from '../config/firebase';
import { FieldValue } from 'firebase-admin/firestore';

interface CreditCosts {
  [key: string]: number;
}

const CREDIT_COSTS: CreditCosts = {
  'improve-description': 1,
  'suggest-skills': 1,
  'improve-summary': 2,
  'analyze-resume': 5
};

export const creditService = {
  async checkAndDeductCredits(userId: string, action: string): Promise<boolean> {
    try {
      const cost = CREDIT_COSTS[action];
      if (!cost) throw new Error('Invalid action');

      const creditsRef = db.collection('userCredits').doc(userId);
      
      const result = await db.runTransaction(async (transaction) => {
        const doc = await transaction.get(creditsRef);
        const currentCredits = doc.exists ? doc.data()?.credits || 0 : 0;

        if (currentCredits < cost) {
          return false;
        }

        transaction.set(creditsRef, {
          credits: currentCredits - cost,
          lastUpdated: new Date()
        }, { merge: true });

        // Enregistrer l'utilisation
        const usageRef = db.collection('creditUsage').doc();
        transaction.set(usageRef, {
          userId,
          action,
          cost,
          createdAt: new Date()
        });

        return true;
      });

      return result;
    } catch (error) {
      console.error('Credit check error:', error);
      return false;
    }
  },

  async getCreditsBalance(userId: string): Promise<number> {
    const doc = await db.collection('userCredits').doc(userId).get();
    return doc.exists ? doc.data()?.credits || 0 : 0;
  },

  async addCredits(userId: string, amount: number): Promise<void> {
    await db.collection('userCredits').doc(userId).set({
      credits: FieldValue.increment(amount),
      lastUpdated: new Date()
    }, { merge: true });
  },

  async getUsageHistory(userId: string) {
    const snapshot = await db.collection('creditUsage')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .limit(50)
      .get();

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }
}; 