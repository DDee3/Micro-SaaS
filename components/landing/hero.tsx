import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Star } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-500/15 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[300px] bg-purple-500/15 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="container max-w-6xl mx-auto px-4 text-center">
        {/* Release / Announcement pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-xs font-medium text-primary mb-8 shadow-sm">
          <Zap className="h-3.5 w-3.5 fill-primary" />
          <span>Next.js 14 + Supabase + Stripe Production Boilerplate</span>
          <span className="text-muted-foreground">•</span>
          <span className="text-foreground/80 font-semibold">Ready to deploy</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.15] max-w-4xl mx-auto">
          Build & Ship Your Micro-SaaS in{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
            Hours, Not Weeks
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Skip months of repetitive boilerplate. Get complete authentication, automated
          Stripe recurring billing, Supabase PostgreSQL schema, and protected dashboard routes right out of the box.
        </p>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" variant="gradient" className="w-full sm:w-auto text-base h-12 px-8 shadow-xl shadow-blue-500/20">
            <Link href="#pricing">
              Get Starter Kit
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto text-base h-12 px-8">
            <Link href="/login">
              Explore Live Dashboard
            </Link>
          </Button>
        </div>

        {/* Trust & Highlights */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>Next.js 14 App Router</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>Supabase Auth & RLS</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>Stripe Webhooks & Portal</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>100% TypeScript</span>
          </div>
        </div>

        {/* Interactive / visual mock UI preview */}
        <div className="mt-16 sm:mt-20 relative mx-auto max-w-5xl rounded-2xl border border-border/80 bg-card/60 p-2 sm:p-4 shadow-2xl backdrop-blur-xl">
          <div className="rounded-xl border border-border/50 bg-background/95 overflow-hidden shadow-inner">
            {/* Window bar */}
            <div className="flex items-center justify-between border-b border-border/50 px-4 py-3 bg-muted/40">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="text-xs font-mono text-muted-foreground flex items-center gap-1.5 bg-background/80 px-3 py-1 rounded-md border border-border/40">
                <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
                <span>app.yourdomain.com/dashboard</span>
              </div>
              <div className="w-12" />
            </div>

            {/* Mock Dashboard Preview Content */}
            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              <div className="p-5 rounded-lg border border-border/60 bg-card/40 flex flex-col justify-between">
                <div className="text-xs text-muted-foreground uppercase font-semibold">Monthly Recurring Revenue</div>
                <div className="mt-2 text-3xl font-bold text-foreground">$12,450</div>
                <div className="mt-2 text-xs text-emerald-400 font-medium">↑ +24.8% vs last month</div>
              </div>
              <div className="p-5 rounded-lg border border-border/60 bg-card/40 flex flex-col justify-between">
                <div className="text-xs text-muted-foreground uppercase font-semibold">Active Subscribers</div>
                <div className="mt-2 text-3xl font-bold text-foreground">428</div>
                <div className="mt-2 text-xs text-emerald-400 font-medium">↑ +18 new today</div>
              </div>
              <div className="p-5 rounded-lg border border-border/60 bg-card/40 flex flex-col justify-between">
                <div className="text-xs text-muted-foreground uppercase font-semibold">Subscription Status</div>
                <div className="mt-2 text-3xl font-bold text-blue-400">Pro Plan</div>
                <div className="mt-2 text-xs text-muted-foreground">Auto-renews next month</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

