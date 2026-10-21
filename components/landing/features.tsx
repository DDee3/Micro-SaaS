import {
  Lock,
  CreditCard,
  Database,
  Layers,
  Sparkles,
  ShieldAlert,
  Zap,
  Code2,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Lock,
    title: "Supabase Authentication",
    description:
      "Full auth suite ready to go: Email & Password, Google OAuth, Magic Links, and Password Reset flows with SSR session handling.",
  },
  {
    icon: CreditCard,
    title: "Stripe Billing & Subscriptions",
    description:
      "Stripe Checkout, Webhook handlers for checkout and subscription lifecycle, plus the Stripe Customer Portal for managing cards and cancellations.",
  },
  {
    icon: Database,
    title: "PostgreSQL & Row Level Security",
    description:
      "Complete SQL schema for profiles table linked to auth.users, automated database triggers, and strict RLS policies protecting customer data.",
  },
  {
    icon: ShieldAlert,
    title: "Protected Routes Middleware",
    description:
      "Edge-ready Next.js middleware that validates user tokens, refreshes cookies, and redirects unauthorized traffic before pages even render.",
  },
  {
    icon: Layers,
    title: "Modern Shadcn UI & Tailwind",
    description:
      "Crafted with Radix UI and Tailwind CSS. Clean, accessible, customizable components styled with sleek modern dark theme support.",
  },
  {
    icon: Code2,
    title: "100% TypeScript & Clean Architecture",
    description:
      "Strict typing throughout client and server components, modular library utilities, and idiomatic Next.js 14 App Router conventions.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 sm:py-32 relative border-t border-border/40">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            Built for Solopreneurs & Founders
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
            Everything you need to launch a profitable SaaS
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            Stop spending 40+ hours setting up auth, billing, database relations, and styling for every project.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="bg-card/40 border-border/60 hover:border-primary/40 hover:bg-card/60 transition-all duration-300 group"
              >
                <CardHeader>
                  <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="mt-4 text-xl font-semibold">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

