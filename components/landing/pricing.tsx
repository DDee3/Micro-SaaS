"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PLANS, type Plan } from "@/lib/stripe/config";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Check, Sparkles, Loader2 } from "lucide-react";
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
    <section id="pricing" className="py-24 sm:py-32 relative border-t border-border/40">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <Badge variant="outline" className="mb-4 px-3 py-1 text-xs border-primary/30 text-primary">
            Simple & Transparent Pricing
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
            Predictable plans that scale with you
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            Start small at $9/mo, upgrade as you grow, and cancel anytime directly through the Stripe billing portal.
          </p>

          {/* Monthly / Yearly Toggle */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <span
              className={`text-sm font-medium ${
                !isYearly ? "text-foreground font-semibold" : "text-muted-foreground"
              }`}
            >
              Monthly
            </span>
            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
              aria-label="Toggle annual billing"
            />
            <span
              className={`text-sm font-medium flex items-center gap-2 ${
                isYearly ? "text-foreground font-semibold" : "text-muted-foreground"
              }`}
            >
              Yearly
              <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
                Save ~20%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PLANS.map((plan) => {
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
            const priceId = isYearly ? plan.yearlyPriceId : plan.monthlyPriceId;
            const isLoading = loadingPriceId === priceId;

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between rounded-2xl p-8 backdrop-blur-sm transition-all duration-300 ${
                  plan.popular
                    ? "bg-card border-2 border-primary shadow-2xl shadow-primary/10 -translate-y-2"
                    : "bg-card/40 border border-border/60 hover:border-border hover:bg-card/60"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-md">
                      <Sparkles className="h-3.5 w-3.5" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground min-h-[40px]">
                    {plan.description}
                  </p>

                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight">
                      ${price}
                    </span>
                    <span className="text-sm font-medium text-muted-foreground">
                      {isYearly ? "/year" : "/month"}
                    </span>
                  </div>

                  <ul className="mt-8 space-y-3.5 border-t border-border/50 pt-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-foreground/90">
                        <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4">
                  <Button
                    onClick={() => handleSelectPlan(plan)}
                    disabled={isLoading}
                    variant={plan.popular ? "gradient" : "outline"}
                    className="w-full h-11 text-sm font-semibold"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Redirecting to Stripe...
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
