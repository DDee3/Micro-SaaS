"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, LayoutDashboard, Terminal } from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <header className="fixed top-4 inset-x-0 mx-auto max-w-5xl w-[calc(100%-2rem)] z-50 rounded-full border border-white/[0.08] bg-[#09090b]/80 backdrop-blur-xl px-5 py-2.5 shadow-[0_16px_36px_rgba(0,0,0,0.6)] transition-all duration-300">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="h-7 w-7 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-300 group-hover:border-white/25 transition-colors">
            <Terminal className="h-3.5 w-3.5" />
          </div>
          <span className="font-medium text-xs sm:text-sm text-zinc-100 tracking-tight">
            LaunchKit
          </span>
          <span className="font-mono text-[10px] text-zinc-500 border border-white/[0.06] bg-white/[0.02] px-1.5 py-0.2 rounded-full">
            v1.0
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-zinc-400">
          <Link href="#features" className="hover:text-zinc-100 transition-colors">
            Features
          </Link>
          <Link href="#pricing" className="hover:text-zinc-100 transition-colors">
            Pricing
          </Link>
          <Link href="#faq" className="hover:text-zinc-100 transition-colors">
            FAQ
          </Link>
          <Link href="/dashboard" className="hover:text-zinc-100 transition-colors">
            Dashboard
          </Link>
        </nav>

        <div className="flex items-center gap-2.5">
          {user ? (
            <Button
              asChild
              size="sm"
              className="bg-white text-zinc-950 hover:bg-zinc-200 font-medium text-xs h-7 px-3.5 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all active:scale-[0.98]"
            >
              <Link href="/dashboard" className="gap-1.5">
                <LayoutDashboard className="h-3.5 w-3.5" />
                Console
              </Link>
            </Button>
          ) : (
            <>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-xs text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04] h-7 px-3 rounded-full"
              >
                <Link href="/login">Sign in</Link>
              </Button>
              <Button
                asChild
                size="sm"
                className="bg-white text-zinc-950 hover:bg-zinc-200 font-medium text-xs h-7 px-3.5 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.12)] transition-all active:scale-[0.98] group"
              >
                <Link href="#pricing" className="gap-1">
                  <span>Get Started</span>
                  <ArrowRight className="h-3 w-3 text-zinc-500 group-hover:translate-x-0.5 group-hover:text-zinc-950 transition-transform" />
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
