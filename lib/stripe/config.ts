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
    id: "free",
    name: "Starter",
    description: "Perfect for testing ideas and launching your MVP.",
    monthlyPrice: 0,
    yearlyPrice: 0,
    monthlyPriceId: "",
    yearlyPriceId: "",
    popular: false,
    features: [
      "1 Active Project",
      "Up to 1,000 monthly active users",
      "Community support",
      "Standard analytics",
      "Basic Supabase storage (500MB)",
    ],
    cta: "Start Free",
  },
  {
    id: "pro",
    name: "Pro",
    description: "Everything you need to grow and monetize your SaaS product.",
    monthlyPrice: 29,
    yearlyPrice: 290, // $24.16/mo billed annually (~2 months free)
    monthlyPriceId: process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID || "price_pro_monthly",
    yearlyPriceId: process.env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PRICE_ID || "price_pro_yearly",
    popular: true,
    features: [
      "Unlimited Projects",
      "Up to 50,000 monthly active users",
      "Priority email & Discord support",
      "Advanced revenue & usage analytics",
      "Custom domain support",
      "Stripe Customer Billing Portal",
      "Automated daily database backups",
    ],
    cta: "Upgrade to Pro",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Dedicated scale, custom SLAs, and high-volume limits.",
    monthlyPrice: 79,
    yearlyPrice: 790,
    monthlyPriceId: process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_MONTHLY_PRICE_ID || "price_enterprise_monthly",
    yearlyPriceId: process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_YEARLY_PRICE_ID || "price_enterprise_yearly",
    popular: false,
    features: [
      "Everything in Pro",
      "Unlimited monthly active users",
      "Dedicated Slack channel & 99.9% SLA",
      "Multi-tenant team seats & roles",
      "Custom contract & invoices",
      "White-label branding",
      "1-on-1 Architecture review",
    ],
    cta: "Contact Sales",
  },
];

