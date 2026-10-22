"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PLANS, type Plan } from "@/lib/stripe/config";
import { Button } from "@/components/ui/button";
import { Check, Loader2, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

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
    } catch (err) {
      console.error(err);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setLoadingPriceId(null);
    }
  };

  return (
    <section id="pricing" className="py-28 md:py-36 relative border-t border-white/[0.06] bg-[#090a0c]">
      <div className="container max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mb-14 text-left">
          <div className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-3 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
            Pricing Tiers
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-zinc-100 leading-tight">
            Transparent pricing for builders
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 leading-relaxed font-normal">
            Start small with our $9/mo tier, upgrade seamlessly as your customer base expands,
            and allow users to self-manage billing via Stripe.
          </p>

          {/* Segmented Control Toggle (Linear/Vercel Style) */}
          <div className="mt-8 inline-flex items-center p-1 rounded-lg border border-white/[0.08] bg-zinc-950/80 backdrop-blur-md">
            <button
              type="button"
              onClick={() => setIsYearly(false)}
              className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                !isYearly
                  ? "bg-zinc-800 text-white shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setIsYearly(true)}
              className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                isYearly
                  ? "bg-zinc-800 text-white shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <span>Annual Billing</span>
              <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.2 rounded">
                -20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PLANS.map((plan) => {
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
            const priceId = isYearly ? plan.yearlyPriceId : plan.monthlyPriceId;
            const isLoading = loadingPriceId === priceId;

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between rounded-xl p-8 backdrop-blur-sm transition-all duration-300 ${
                  plan.popular
                    ? "border border-white/20 bg-zinc-900/40 shadow-[0_15px_40px_rgba(0,0,0,0.6)] md:-translate-y-1.5"
                    : "border border-white/[0.07] bg-zinc-950/40 hover:border-white/15 hover:bg-zinc-900/20"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 right-6">
                    <span className="font-mono text-[10px] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full bg-white text-zinc-950 shadow-md">
                      Popular Choice
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-zinc-100 tracking-tight">
                      {plan.name}
                    </h3>
                  </div>

                  <p className="mt-2 text-xs sm:text-sm text-zinc-400 min-h-[38px] leading-relaxed">
                    {plan.description}
                  </p>

                  <div className="mt-6 flex items-baseline gap-1.5">
                    <span className="text-4xl sm:text-5xl font-semibold text-zinc-100 tracking-[-0.03em]">
                      ${price}
                    </span>
                    <span className="font-mono text-xs text-zinc-500">
                      {isYearly ? "/yr" : "/mo"}
                    </span>
                  </div>

                  <ul className="mt-8 space-y-3 border-t border-white/[0.06] pt-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                        <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4">
                  <Button
                    onClick={() => handleSelectPlan(plan)}
                    disabled={isLoading}
                    className={`w-full h-10 text-xs font-medium transition-all duration-200 active:scale-[0.98] ${
                      plan.popular
                        ? "bg-white text-zinc-950 hover:bg-zinc-200 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                        : "border border-white/10 bg-zinc-900/50 text-zinc-200 hover:bg-zinc-800 hover:border-white/20"
                    }`}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        Connecting to Stripe...
                      </span>
                    ) : (
                      plan.cta
                    )}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
