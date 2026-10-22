"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Loader2, Sparkles } from "lucide-react";

interface ManageSubscriptionButtonProps {
  hasStripeCustomer: boolean;
  className?: string;
}

export function ManageSubscriptionButton({
  hasStripeCustomer,
  className,
}: ManageSubscriptionButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleOpenPortal = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/stripe/portal", {
        method: "POST",
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Unable to open billing portal.");
        setLoading(false);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to connect to billing portal";
      console.error("Billing portal error:", message);
      alert("Failed to connect to billing portal. Please try again.");
      setLoading(false);
    }
  };

  if (!hasStripeCustomer) {
    return (
      <Button
        size="sm"
        onClick={() => {
          window.location.href = "/#pricing";
        }}
        className={`rounded-full bg-white text-zinc-950 hover:bg-zinc-200 font-medium text-xs h-8 px-4 shadow-[0_0_20px_rgba(255,255,255,0.12)] transition-all duration-200 active:scale-[0.98] ${className}`}
      >
        <Sparkles className="mr-1.5 h-3.5 w-3.5 text-zinc-600" />
        Upgrade Plan
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleOpenPortal}
      disabled={loading}
      className={`rounded-full border border-white/[0.08] bg-zinc-900/60 text-zinc-300 hover:bg-zinc-800 hover:text-white hover:border-white/20 transition-all duration-200 text-xs h-8 px-4 backdrop-blur-sm active:scale-[0.98] ${className}`}
    >
      {loading ? (
        <span className="flex items-center gap-1.5">
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          Connecting...
        </span>
      ) : (
        <span className="flex items-center gap-1.5">
          <ExternalLink className="h-3.5 w-3.5 text-zinc-400" />
          Manage Billing
        </span>
      )}
    </Button>
  );
}
