import {
  Lock,
  CreditCard,
  Database,
  Layers,
  ShieldCheck,
  Code2,
} from "lucide-react";

const features = [
  {
    tag: "AUTH_SSR",
    title: "Supabase Authentication",
    description:
      "Fully typed authentication flow using `@supabase/ssr`. Complete with Email/Password, Google OAuth, session token refreshing, and password reset routes.",
    icon: Lock,
    code: `const supabase = await createClient();
const { data: { user } } = await supabase.auth.getUser();`,
  },
  {
    tag: "BILLING_ENGINE",
    title: "Stripe Recurring Billing",
    description:
      "Stripe Checkout sessions with price ID mapping, customer creation, and signature-verified webhook handlers for subscriptions, cancellations, and invoices.",
    icon: CreditCard,
    code: `switch (event.type) {
  case "checkout.session.completed":
  case "customer.subscription.updated":
}`,
  },
  {
    tag: "POSTGRES_RLS",
    title: "Database & Profiles Schema",
    description:
      "Complete SQL schema for user profiles linked to auth.users. Includes automated database triggers, updated_at handlers, and strict Row Level Security.",
    icon: Database,
    code: `create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);`,
  },
  {
    tag: "EDGE_GUARD",
    title: "Protected Route Middleware",
    description:
      "Edge middleware that validates user tokens, refreshes cookies on every request, and intercepts unauthenticated access before pages are rendered.",
    icon: ShieldCheck,
    code: `if (pathname.startsWith('/dashboard') && !user) {
  return NextResponse.redirect('/login');
}`,
  },
  {
    tag: "DESIGN_SYSTEM",
    title: "Shadcn UI & Tailwind",
    description:
      "Zero lock-in UI components built on Radix UI primitives. Pre-configured dark theme, accessible dialogs, switches, badges, and clean typography.",
    icon: Layers,
    code: `import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";`,
  },
  {
    tag: "TYPE_SAFETY",
    title: "100% Strict TypeScript",
    description:
      "End-to-end type safety from server actions and route handlers to client forms and Supabase database models. Zero compilation warnings.",
    icon: Code2,
    code: `export interface Plan {
  id: string;
  monthlyPrice: number;
  monthlyPriceId: string;
}`,
  },
];

export function Features() {
  return (
    <section id="features" className="py-28 md:py-36 relative border-t border-white/[0.08] bg-[#09090b]">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-20 text-left">
          <div className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-3 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
            Architectural Foundation
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.035em] text-zinc-100 leading-tight">
            Engineered for reliability, velocity, and clean DX
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 leading-relaxed font-normal">
            No bloated third-party abstractions. Built strictly on Next.js 14 App Router,
            official Supabase SSR utilities, and Stripe standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group relative flex flex-col justify-between rounded-xl border border-white/[0.08] bg-zinc-950/40 p-6 hover:border-white/20 hover:bg-zinc-900/30 transition-all duration-200 hover:-translate-y-0.5"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="h-8 w-8 rounded-lg border border-white/10 bg-zinc-900/80 flex items-center justify-center text-zinc-300 group-hover:border-white/25 group-hover:text-white transition-colors duration-200">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="font-mono text-[10px] tracking-wider text-zinc-500 uppercase px-2 py-0.5 rounded border border-white/[0.06] bg-white/[0.02]">
                      {feature.tag}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-medium text-zinc-100 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.05]">
                  <pre className="font-mono text-[11px] text-zinc-500 leading-relaxed overflow-x-auto bg-black/40 p-2.5 rounded-md border border-white/[0.04]">
                    <code>{feature.code}</code>
                  </pre>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
