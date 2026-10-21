import Stripe from "stripe";

export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY || "sk_test_placeholder_key_for_build",
  {
    apiVersion: "2024-09-30.acacia" as any,
    appInfo: {
      name: "Micro SaaS Starter Kit",
      version: "1.0.0",
    },
  }
);
