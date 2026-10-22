"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, LayoutDashboard, Terminal } from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
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

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      authListener.subscription.unsubscribe();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [supabase]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#090a0c]/85 backdrop-blur-md border-b border-white/[0.06] py-3.5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container max-w-6xl mx-auto flex items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="h-8 w-8 rounded-lg bg-zinc-900 border border-white/15 flex items-center justify-center text-zinc-200 group-hover:border-white/30 group-hover:text-white transition-all duration-200">
            <Terminal className="h-4 w-4" />
          </div>
          <div className="flex items-center gap-1.5 font-medium tracking-tight text-sm sm:text-base text-zinc-100">
            <span>LaunchKit</span>
            <span className="font-mono text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded border border-white/10 bg-white/[0.04] text-zinc-400">
              v1.0
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-[13px] font-medium text-zinc-400">
          <Link
            href="#features"
            className="hover:text-zinc-100 transition-colors duration-150"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="hover:text-zinc-100 transition-colors duration-150"
          >
            Pricing
          </Link>
          <Link
            href="#faq"
            className="hover:text-zinc-100 transition-colors duration-150"
          >
            FAQ
          </Link>
          <Link
            href="/dashboard"
            className="hover:text-zinc-100 transition-colors duration-150"
          >
            Dashboard
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <Button
              asChild
              size="sm"
              className="bg-white text-zinc-950 hover:bg-zinc-200 font-medium text-xs h-8 px-3.5 shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-200 active:scale-[0.98]"
            >
              <Link href="/dashboard" className="gap-1.5">
                <LayoutDashboard className="h-3.5 w-3.5" />
                Dashboard
              </Link>
            </Button>
          ) : (
            <>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-xs text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04] h-8 px-3"
              >
                <Link href="/login">Sign in</Link>
              </Button>
              <Button
                asChild
                size="sm"
                className="bg-white text-zinc-950 hover:bg-zinc-200 font-medium text-xs h-8 px-3.5 shadow-[0_0_20px_rgba(255,255,255,0.12)] transition-all duration-200 active:scale-[0.98] group"
              >
                <Link href="#pricing" className="gap-1.5">
                  Get Started
                  <ArrowRight className="h-3 w-3 text-zinc-600 group-hover:translate-x-0.5 group-hover:text-zinc-950 transition-all duration-200" />
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
