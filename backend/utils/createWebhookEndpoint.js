import Stripe from "stripe";

export const createWebhookEndpoint = async () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const webhookEndpoint = await stripe.webhookEndpoints.create({
    enabled_events: ["charge.succeeded", "charge.failed"],
    url: `${process.env.SERVER_URL}/webhook`,
  });

  return webhookEndpoint.id;
};
