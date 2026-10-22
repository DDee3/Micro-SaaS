import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Copy, Terminal, Shield, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-32 pb-24 md:pt-44 md:pb-36 overflow-hidden bg-[#090a0c]">
      {/* Subtle top horizon spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[360px] bg-gradient-to-b from-white/[0.07] via-white/[0.02] to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10"
      />

      <div className="container max-w-5xl mx-auto px-6 text-center">
        {/* Release / Status Pill */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full border border-white/[0.08] bg-zinc-900/60 backdrop-blur-md mb-8 hover:border-white/20 transition-all duration-200">
          <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          <span className="font-mono text-[11px] text-zinc-300 tracking-wide uppercase">
            Next.js 14 App Router • Supabase SSR • Stripe Subscriptions
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.035em] text-zinc-100 leading-[1.08] max-w-4xl mx-auto">
          The modern foundation for your next Micro-SaaS
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed font-normal">
          A production-ready starter kit engineered with strict TypeScript, automated
          Stripe recurring webhooks, Supabase RLS profiles, and clean typography.
        </p>

        {/* CTA Button Group */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto h-11 px-7 bg-white text-zinc-950 hover:bg-zinc-200 font-medium text-sm shadow-[0_0_25px_rgba(255,255,255,0.15)] transition-all duration-200 active:scale-[0.98] group"
          >
            <Link href="#pricing" className="gap-2">
              <span>Deploy Your SaaS</span>
              <ArrowRight className="h-4 w-4 text-zinc-600 group-hover:translate-x-0.5 group-hover:text-zinc-950 transition-all duration-200" />
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full sm:w-auto h-11 px-6 border-white/10 bg-zinc-900/40 text-zinc-300 hover:bg-zinc-900 hover:text-white hover:border-white/20 transition-all duration-200 text-sm font-medium backdrop-blur-sm"
          >
            <Link href="/login" className="gap-2">
              <span>View Dashboard Demo</span>
            </Link>
          </Button>
        </div>

        {/* Value Metrics / Highlights */}
        <div className="mt-14 pt-10 border-t border-white/[0.06] grid grid-cols-2 md:grid-cols-4 gap-6 text-left max-w-3xl mx-auto">
          <div>
            <div className="font-mono text-xs uppercase tracking-wider text-zinc-500">Tech Stack</div>
            <div className="mt-1 text-sm font-medium text-zinc-200">Next.js 14 + TS</div>
          </div>
          <div>
            <div className="font-mono text-xs uppercase tracking-wider text-zinc-500">Database</div>
            <div className="mt-1 text-sm font-medium text-zinc-200">Supabase PostgreSQL</div>
          </div>
          <div>
            <div className="font-mono text-xs uppercase tracking-wider text-zinc-500">Billing</div>
            <div className="mt-1 text-sm font-medium text-zinc-200">Stripe Webhooks & Portal</div>
          </div>
          <div>
            <div className="font-mono text-xs uppercase tracking-wider text-zinc-500">Security</div>
            <div className="mt-1 text-sm font-medium text-zinc-200">Row-Level Security (RLS)</div>
          </div>
        </div>

        {/* Precision Product Interface Mockup */}
        <div className="mt-16 sm:mt-20 relative mx-auto max-w-4xl rounded-xl border border-white/[0.08] bg-zinc-950/80 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl group">
          {/* Subtle perimeter border gradient on hover */}
          <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-b from-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="rounded-lg border border-white/[0.06] bg-[#0c0e12] overflow-hidden text-left">
            {/* Header bar */}
            <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3 bg-zinc-950/60">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-zinc-800 border border-white/10" />
                <div className="h-2.5 w-2.5 rounded-full bg-zinc-800 border border-white/10" />
                <div className="h-2.5 w-2.5 rounded-full bg-zinc-800 border border-white/10" />
              </div>
              <div className="font-mono text-[11px] text-zinc-500 flex items-center gap-1.5">
                <span className="text-emerald-400">●</span> telemetry.live.cloud
              </div>
              <div className="font-mono text-[11px] text-zinc-500">
                app/dashboard
              </div>
            </div>

            {/* Terminal / Live Metrics Layout */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-md border border-white/[0.05] bg-zinc-900/30">
                <div className="font-mono text-[11px] text-zinc-500 uppercase tracking-wider">Recurring Revenue</div>
                <div className="mt-2 text-2xl font-semibold text-zinc-100 tracking-tight">$8,940.00</div>
                <div className="mt-1 font-mono text-[11px] text-emerald-400">+18.4% this month</div>
              </div>

              <div className="p-4 rounded-md border border-white/[0.05] bg-zinc-900/30">
                <div className="font-mono text-[11px] text-zinc-500 uppercase tracking-wider">Stripe Webhook Sync</div>
                <div className="mt-2 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-sm font-medium text-zinc-200">checkout.completed</span>
                </div>
                <div className="mt-1 font-mono text-[11px] text-zinc-500">Latency: 42ms • Status: 200 OK</div>
              </div>

              <div className="p-4 rounded-md border border-white/[0.05] bg-zinc-900/30">
                <div className="font-mono text-[11px] text-zinc-500 uppercase tracking-wider">Supabase RLS Policy</div>
                <div className="mt-2 text-sm font-medium text-zinc-200 flex items-center gap-1.5">
                  <Shield className="h-4 w-4 text-emerald-400" />
                  <span>Enforced (auth.uid = id)</span>
                </div>
                <div className="mt-1 font-mono text-[11px] text-zinc-500">Zero data leakage risk</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
