"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PLANS, type Plan } from "@/lib/stripe/config";
import { Button } from "@/components/ui/button";
import { Check, Loader2, ArrowUpRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { TiltCard } from "./tilt-card";

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const [loadingPriceId, setLoadingPriceId] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleSelectPlan = async (plan: Plan) => {
    const priceId = isYearly ? plan.yearlyPriceId : plan.monthlyPriceId;
    setLoadingPriceId(priceId);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push(`/login?redirectTo=/dashboard&priceId=${priceId}`);
        return;
      }

      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Failed to create checkout session");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred.";
      console.error("Plan selection error:", message);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setLoadingPriceId(null);
    }
  };

  return (
    <section id="pricing" className="py-32 relative bg-[#000000] border-t border-white/[0.08]">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="max-w-3xl mb-16 text-left">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#FF5A00] mb-3 flex items-center gap-2">
            <span>// COMMERCIAL TIERS</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black tracking-[-0.04em] uppercase text-white leading-tight">
            TRANSPARENT REVENUE. <br />
            ZERO HIDDEN TAKES.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 font-normal leading-relaxed">
            Begin with a lean setup, upgrade seamlessly as subscriber volume multiplies,
            and empower customers to manage cards and cancellations directly.
          </p>

          <div className="mt-8 inline-flex items-center p-1 border border-white/15 bg-zinc-950 font-mono text-xs uppercase tracking-wider">
            <button
              type="button"
              onClick={() => setIsYearly(false)}
              className={`px-5 py-2 transition-all duration-200 ${
                !isYearly
                  ? "bg-white text-black font-bold shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Monthly Interval
            </button>
            <button
              type="button"
              onClick={() => setIsYearly(true)}
              className={`flex items-center gap-2 px-5 py-2 transition-all duration-200 ${
                isYearly
                  ? "bg-white text-black font-bold shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <span>Annual Interval</span>
              <span className="text-[10px] bg-[#FF5A00] text-black px-1.5 py-0.2 font-extrabold">
                -20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PLANS.map((plan) => {
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
            const priceId = isYearly ? plan.yearlyPriceId : plan.monthlyPriceId;
            const isLoading = loadingPriceId === priceId;

            return (
              <TiltCard
                key={plan.id}
                intensity={8}
                className={`flex flex-col justify-between p-8 border transition-all duration-300 relative ${
                  plan.popular
                    ? "border-2 border-[#FF5A00] bg-zinc-950 shadow-[0_0_40px_rgba(255,90,0,0.18)] md:-translate-y-2"
                    : "border border-white/10 bg-zinc-950/80 hover:border-white/30"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0">
                    <span className="font-mono text-[10px] uppercase tracking-widest font-black px-3.5 py-1 bg-[#FF5A00] text-black">
                      FLAGSHIP TIER
                    </span>
                  </div>
                )}

                <div>
                  <div className="font-mono text-[11px] text-zinc-500 uppercase tracking-widest mb-2">
                    ID // {plan.id}
                  </div>

                  <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                    {plan.name}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-zinc-400 min-h-[38px] leading-relaxed">
                    {plan.description}
                  </p>

                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="text-5xl sm:text-6xl font-black text-white tracking-[-0.05em] font-mono">
                      ${price}
                    </span>
                    <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
                      {isYearly ? "/year" : "/month"}
                    </span>
                  </div>

                  <ul className="mt-8 space-y-3.5 border-t border-white/[0.08] pt-6 font-mono text-xs text-zinc-300">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="h-4 w-4 text-[#FF5A00] shrink-0 mt-0.5" />
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Larger, Prominent Card Button */}
                <div className="mt-10 pt-4">
                  <Button
                    onClick={() => handleSelectPlan(plan)}
                    disabled={isLoading}
                    className={`w-full h-13 sm:h-14 text-sm font-mono font-black uppercase tracking-wider rounded-none transition-all duration-300 ${
                      plan.popular
                        ? "bg-[#FF5A00] text-black hover:bg-white hover:text-black shadow-[0_0_25px_rgba(255,90,0,0.3)]"
                        : "border-2 border-white/20 bg-black text-white hover:bg-white hover:text-black hover:border-white"
                    }`}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        INITIALIZING STRIPE...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <span>{plan.cta}</span>
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    )}
                  </Button>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
