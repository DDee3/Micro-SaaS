"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CreditCard, ExternalLink, Loader2 } from "lucide-react";

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
    } catch (err) {
      console.error(err);
      alert("Failed to connect to billing portal. Please try again.");
      setLoading(false);
    }
  };

  if (!hasStripeCustomer) {
    return (
      <Button
        variant="default"
        size="sm"
        onClick={() => {
          window.location.href = "/#pricing";
        }}
        className={className}
      >
        <CreditCard className="mr-2 h-4 w-4" />
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
      className={className}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          Opening Portal...
        </span>
      ) : (
        <span className="flex items-center gap-2">
          <ExternalLink className="h-4 w-4" />
          Manage Billing & Subscription
        </span>
      )}
    </Button>
  );
}

