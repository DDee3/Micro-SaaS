"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OAuthButton } from "@/components/auth/oauth-button";
import { AuthFormDivider } from "@/components/auth/auth-form-divider";
import { Loader2, AlertCircle, ArrowLeft, Sparkles } from "lucide-react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/dashboard";
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
        return;
      }

      if (data?.session) {
        router.push(redirectTo);
        router.refresh();
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred.");
      setLoading(false);
    }
  };

  return (
    <Card className="border-border/80 bg-card/60 backdrop-blur-xl shadow-2xl">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight">
          Welcome back
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Sign in to access your dashboard and manage subscriptions
        </CardDescription>
      </CardHeader>
      <CardContent>
        {errorMsg && (
          <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Google OAuth button */}
        <OAuthButton />

        <AuthFormDivider />

        {/* Email/Password form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/login?forgot=true"
                className="text-xs text-primary hover:underline font-medium"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <Button
            type="submit"
            variant="gradient"
            className="w-full h-11"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center border-t border-border/50 pt-4">
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-primary hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden bg-background">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[300px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="absolute top-6 left-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>

      <div className="mb-8 text-center">
        <Link href="/" className="inline-flex items-center gap-2 group">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-2xl tracking-tight">
            LaunchSaaS<span className="text-primary">.kit</span>
          </span>
        </Link>
      </div>

      <div className="w-full max-w-md">
        <Suspense
          fallback={
            <Card className="border-border/80 bg-card/60 backdrop-blur-xl shadow-2xl p-8 flex items-center justify-center min-h-[300px]">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </Card>
          }
        >
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}

