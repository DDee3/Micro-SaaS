export interface Plan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  monthlyPriceId: string;
  yearlyPriceId: string;
  popular?: boolean;
  features: string[];
  cta: string;
}

export const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Ideal for testing your MVP and early customer validation.",
    monthlyPrice: 9,
    yearlyPrice: 90, // $7.50/mo billed annually (~2 months free)
    monthlyPriceId: process.env.NEXT_PUBLIC_STRIPE_STARTER_MONTHLY_PRICE_ID || "price_starter_monthly",
    yearlyPriceId: process.env.NEXT_PUBLIC_STRIPE_STARTER_YEARLY_PRICE_ID || "price_starter_yearly",
    popular: false,
    features: [
      "1 Production Project",
      "Up to 2,500 active users",
      "Standard Supabase Database",
      "Email & Password + Google OAuth",
      "Community Discord Support",
    ],
    cta: "Start with Starter",
  },
  {
    id: "pro",
    name: "Pro",
    description: "Scale your revenue and unlock automated customer management.",
    monthlyPrice: 29,
    yearlyPrice: 290, // $24.16/mo billed annually (~2 months free)
    monthlyPriceId: process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID || "price_pro_monthly",
    yearlyPriceId: process.env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PRICE_ID || "price_pro_yearly",
    popular: true,
    features: [
      "Unlimited Projects",
      "Up to 50,000 active users",
      "Stripe Customer Billing Portal",
      "Automated Webhook Sync",
      "Priority Email & Chat Support",
      "Custom Domain Support",
      "Automated Database Backups",
    ],
    cta: "Upgrade to Pro",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "High volume limits, custom SLAs, and multi-tenant scaling.",
    monthlyPrice: 79,
    yearlyPrice: 790,
    monthlyPriceId: process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_MONTHLY_PRICE_ID || "price_enterprise_monthly",
    yearlyPriceId: process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_YEARLY_PRICE_ID || "price_enterprise_yearly",
    popular: false,
    features: [
      "Everything in Pro",
      "Unlimited active users",
      "Dedicated Slack channel & 99.9% SLA",
      "Multi-tenant Team Seats & Roles",
      "Custom Contract & Billing",
      "1-on-1 Architecture Review",
    ],
    cta: "Get Enterprise",
  },
];
