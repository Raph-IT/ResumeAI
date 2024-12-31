import express from 'express';
import { stripeService } from '../services/stripeService';
import { authenticateUser } from '../middleware/auth';

const router = express.Router();

router.use(authenticateUser);

// Créer une session de paiement
router.post('/create-checkout-session', async (req, res) => {
  try {
    const { packageId } = req.body;
    const session = await stripeService.createCheckoutSession(req.user!.id, packageId);
    res.json({ sessionId: session.id });
  } catch (error) {
    res.status(500).json({ error: 'Error creating checkout session' });
  }
});

// Webhook Stripe
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      await stripeService.handlePaymentSuccess(session);
    }

    res.json({ received: true });
  } catch (error) {
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
});

export default router; 