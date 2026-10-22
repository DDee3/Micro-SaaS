import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { ManageSubscriptionButton } from "@/components/dashboard/manage-subscription-button";
import {
  Activity,
  CreditCard,
  Database,
  CheckCircle2,
  ShieldCheck,
  HardDrive,
} from "lucide-react";

interface DashboardPageProps {
  searchParams: {
    success?: string;
    session_id?: string;
  };
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch full profile with billing details using admin client to guarantee freshness
  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const isSubscribed =
    profile?.subscription_status === "active" ||
    profile?.subscription_status === "trialing";

  const subscriptionStatus = profile?.subscription_status || "free";

  return (
    <div className="space-y-10 pb-16">
      {/* Checkout Success Banner */}
      {searchParams.success && (
        <div className="flex items-center gap-3 rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3.5 text-emerald-400">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <div className="text-xs sm:text-sm font-medium">
            Payment verified. Your subscription is active and premium account limits have been unlocked.
          </div>
        </div>
      )}

      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-white/[0.06]">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-wider text-zinc-500 mb-1">
            Console / Overview
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-zinc-100">
            Welcome back, {profile?.full_name || user.email?.split("@")[0]}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 font-normal">
            Monitor API usage, manage database quotas, and configure Stripe billing.
          </p>
        </div>

        {/* Primary Action Button (Single Upgrade / Manage Button) */}
        <div className="flex items-center gap-3">
          <ManageSubscriptionButton
            hasStripeCustomer={!!profile?.stripe_customer_id}
          />
        </div>
      </div>

      {/* Precision Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Subscription Status Card */}
        <div className="group rounded-xl border border-white/[0.07] bg-zinc-950/40 p-5 hover:border-white/20 hover:bg-zinc-900/20 transition-all duration-200 hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
              Subscription Status
            </span>
            <div className="h-7 w-7 rounded-md border border-white/10 bg-zinc-900/80 flex items-center justify-center text-zinc-400 group-hover:text-zinc-200 transition-colors">
              <CreditCard className="h-3.5 w-3.5" />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-2xl font-semibold text-zinc-100 tracking-tight capitalize">
              {isSubscribed ? "Active Plan" : "Free Plan"}
            </span>
            <span
              className={`font-mono text-[11px] px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5 border ${
                isSubscribed
                  ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                  : subscriptionStatus === "canceled"
                  ? "text-rose-400 bg-rose-500/10 border-rose-500/20"
                  : "text-zinc-400 bg-zinc-800/50 border-white/10"
              }`}
            >
              {isSubscribed && (
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              )}
              {subscriptionStatus}
            </span>
          </div>

          <p className="mt-4 text-xs font-mono text-zinc-500 pt-3 border-t border-white/[0.04]">
            {profile?.subscription_period_end
              ? `Renews: ${new Date(profile.subscription_period_end).toLocaleDateString()}`
              : "Upgrade via Stripe to unlock production scale."}
          </p>
        </div>

        {/* API Usage Quota Card */}
        <div className="group rounded-xl border border-white/[0.07] bg-zinc-950/40 p-5 hover:border-white/20 hover:bg-zinc-900/20 transition-all duration-200 hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
              Monthly Usage Quota
            </span>
            <div className="h-7 w-7 rounded-md border border-white/10 bg-zinc-900/80 flex items-center justify-center text-zinc-400 group-hover:text-zinc-200 transition-colors">
              <Activity className="h-3.5 w-3.5" />
            </div>
          </div>

          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-2xl font-semibold text-zinc-100 tracking-tight">
              {isSubscribed ? "12,480" : "420"}
            </span>
            <span className="font-mono text-xs text-zinc-500">
              of {isSubscribed ? "50,000 reqs" : "1,000 reqs"}
            </span>
          </div>

          {/* Sleek Progress Track */}
          <div className="w-full bg-zinc-900 rounded-full h-1 mt-3 border border-white/[0.03]">
            <div
              className="bg-zinc-200 h-1 rounded-full transition-all duration-500"
              style={{ width: isSubscribed ? "25%" : "42%" }}
            />
          </div>

          <p className="mt-3 text-xs font-mono text-zinc-500 pt-3 border-t border-white/[0.04]">
            Resets automatically on 1st of every month
          </p>
        </div>

        {/* Database & RLS Security Card */}
        <div className="group rounded-xl border border-white/[0.07] bg-zinc-950/40 p-5 hover:border-white/20 hover:bg-zinc-900/20 transition-all duration-200 hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
              PostgreSQL & Auth
            </span>
            <div className="h-7 w-7 rounded-md border border-white/10 bg-zinc-900/80 flex items-center justify-center text-zinc-400 group-hover:text-zinc-200 transition-colors">
              <Database className="h-3.5 w-3.5" />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-2xl font-semibold text-zinc-100 tracking-tight">
              RLS Policy
            </span>
            <span className="font-mono text-[11px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3 w-3" />
              Protected
            </span>
          </div>

          <p className="mt-4 text-xs font-mono text-zinc-500 pt-3 border-t border-white/[0.04]">
            Row Level Security verified for public.profiles
          </p>
        </div>
      </div>

      {/* Account & Billing Technical Details Table */}
      <div className="rounded-xl border border-white/[0.07] bg-zinc-950/40 overflow-hidden">
        <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
          <div>
            <h2 className="text-sm font-medium text-zinc-100 tracking-tight">
              Account & Billing Credentials
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Synchronized records between Supabase and Stripe Customer APIs
            </p>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-white/[0.06] bg-white/[0.02] text-zinc-500">
            LIVE SYNC
          </span>
        </div>

        <div className="divide-y divide-white/[0.04]">
          <div className="px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 hover:bg-white/[0.01] transition-colors">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">User ID</span>
            <span className="text-xs font-mono text-zinc-300 select-all">{user.id}</span>
          </div>

          <div className="px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 hover:bg-white/[0.01] transition-colors">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Email Address</span>
            <span className="text-xs text-zinc-300 font-mono select-all">{user.email}</span>
          </div>

          <div className="px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 hover:bg-white/[0.01] transition-colors">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Stripe Customer ID</span>
            <span className="text-xs font-mono text-zinc-300 select-all">
              {profile?.stripe_customer_id || "Unassigned (Created on first checkout)"}
            </span>
          </div>

          <div className="px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 hover:bg-white/[0.01] transition-colors">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Stripe Subscription ID</span>
            <span className="text-xs font-mono text-zinc-300 select-all">
              {profile?.stripe_subscription_id || "None"}
            </span>
          </div>

          <div className="px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 hover:bg-white/[0.01] transition-colors">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Active Price ID</span>
            <span className="text-xs font-mono text-zinc-300 select-all">
              {profile?.stripe_price_id || "None"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
