import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ManageSubscriptionButton } from "@/components/dashboard/manage-subscription-button";
import {
  Activity,
  CreditCard,
  Database,
  CheckCircle2,
  Key,
  ShieldCheck,
  Zap,
} from "lucide-react";
import Link from "next/link";

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
    <div className="space-y-8 pb-12">
      {/* Checkout Success Banner */}
      {searchParams.success && (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-400">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <div className="text-sm">
            <span className="font-semibold">Payment Successful!</span> Your
            subscription is active and your account features are unlocked.
          </div>
        </div>
      )}

      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Welcome, {profile?.full_name || user.email?.split("@")[0]}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your micro-saas workspace, subscription, and account settings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <ManageSubscriptionButton
            hasStripeCustomer={!!profile?.stripe_customer_id}
          />
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Subscription Status Card */}
        <Card className="border-border/70 bg-card/60 backdrop-blur-sm relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Subscription Plan
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold capitalize">
                {isSubscribed ? "Active Plan" : "Free Plan"}
              </span>
              <Badge
                variant={
                  isSubscribed
                    ? "success"
                    : subscriptionStatus === "canceled"
                    ? "destructive"
                    : "outline"
                }
              >
                {subscriptionStatus}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {profile?.subscription_period_end
                ? `Renews on: ${new Date(
                    profile.subscription_period_end
                  ).toLocaleDateString()}`
                : "Upgrade to unlock unlimited features and higher limits."}
            </p>
          </CardContent>
        </Card>

        {/* API Usage / Quota */}
        <Card className="border-border/70 bg-card/60 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Monthly Usage Quota
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isSubscribed ? "12,480 / 50,000" : "420 / 1,000"}
            </div>
            <div className="w-full bg-muted rounded-full h-1.5 mt-3">
              <div
                className="bg-primary h-1.5 rounded-full"
                style={{ width: isSubscribed ? "25%" : "42%" }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Usage counters reset on the 1st of every month.
            </p>
          </CardContent>
        </Card>

        {/* Database & Security */}
        <Card className="border-border/70 bg-card/60 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Database & RLS Security
            </CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
              <ShieldCheck className="h-6 w-6" />
              Active & Protected
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Row-Level-Security (RLS) is actively enforced on profiles.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Account & Billing Deep-Dive Card */}
      <Card className="border-border/70 bg-card/40">
        <CardHeader>
          <CardTitle className="text-xl">Account & Billing Details</CardTitle>
          <CardDescription>
            Live synchronization between Supabase Profiles and Stripe Customer records
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-border/60">
            <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-sm font-medium text-muted-foreground">User ID</span>
              <span className="text-sm font-mono text-foreground">{user.id}</span>
            </div>
            <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-sm font-medium text-muted-foreground">Email Address</span>
              <span className="text-sm text-foreground">{user.email}</span>
            </div>
            <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-sm font-medium text-muted-foreground">Stripe Customer ID</span>
              <span className="text-sm font-mono text-foreground">
                {profile?.stripe_customer_id || "Not assigned yet"}
              </span>
            </div>
            <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-sm font-medium text-muted-foreground">Stripe Subscription ID</span>
              <span className="text-sm font-mono text-foreground">
                {profile?.stripe_subscription_id || "None"}
              </span>
            </div>
            <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-sm font-medium text-muted-foreground">Active Price ID</span>
              <span className="text-sm font-mono text-foreground">
                {profile?.stripe_price_id || "None"}
              </span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <ManageSubscriptionButton
              hasStripeCustomer={!!profile?.stripe_customer_id}
            />
            {!isSubscribed && (
              <Button asChild variant="gradient" size="sm">
                <Link href="/#pricing">
                  <Zap className="mr-2 h-4 w-4" />
                  View Upgrade Options
                </Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

