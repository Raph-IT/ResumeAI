import Stripe from 'stripe';
import { db } from '../config/firebase';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
});

const CREDIT_PACKAGES = {
  basic: {
    credits: 50,
    price: 499, // $4.99
    priceId: process.env.STRIPE_PRICE_BASIC
  },
  pro: {
    credits: 200,
    price: 1499, // $14.99
    priceId: process.env.STRIPE_PRICE_PRO
  },
  unlimited: {
    credits: 1000,
    price: 4999, // $49.99
    priceId: process.env.STRIPE_PRICE_UNLIMITED
  }
};

export const stripeService = {
  // Créer une session de paiement
  async createCheckoutSession(userId: string, packageId: keyof typeof CREDIT_PACKAGES) {
    const package_ = CREDIT_PACKAGES[packageId];
    if (!package_) throw new Error('Invalid package');

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: package_.priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/credits/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/credits/cancel`,
      client_reference_id: userId,
      metadata: {
        credits: package_.credits.toString(),
        packageId
      }
    });

    return session;
  },

  // Gérer le webhook de paiement réussi
  async handlePaymentSuccess(session: Stripe.Checkout.Session) {
    const userId = session.client_reference_id;
    const credits = parseInt(session.metadata?.credits || '0');

    if (!userId || !credits) {
      throw new Error('Invalid session data');
    }

    const userRef = db.collection('users').doc(userId);
    const creditsRef = db.collection('userCredits').doc(userId);

    await db.runTransaction(async (transaction) => {
      const creditsDoc = await transaction.get(creditsRef);
      const currentCredits = creditsDoc.exists ? creditsDoc.data()?.credits || 0 : 0;

      transaction.set(creditsRef, {
        credits: currentCredits + credits,
        lastUpdated: new Date()
      }, { merge: true });

      // Enregistrer la transaction
      const transactionRef = db.collection('creditTransactions').doc();
      transaction.set(transactionRef, {
        userId,
        credits,
        type: 'purchase',
        amount: session.amount_total,
        stripeSessionId: session.id,
        createdAt: new Date()
      });
    });
  }
}; 