import Link from "next/link";
import { Terminal } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#090a0c] py-14">
      <div className="container max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="h-7 w-7 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-300">
            <Terminal className="h-3.5 w-3.5" />
          </div>
          <span className="font-medium text-sm text-zinc-200 tracking-tight">
            LaunchKit
          </span>
          <span className="font-mono text-[10px] text-zinc-500 border border-white/[0.06] bg-white/[0.02] px-1.5 py-0.5 rounded">
            Next.js 14 Micro-SaaS
          </span>
        </div>

        <div className="flex items-center gap-6 text-xs text-zinc-400">
          <Link href="#features" className="hover:text-zinc-200 transition-colors">
            Features
          </Link>
          <Link href="#pricing" className="hover:text-zinc-200 transition-colors">
            Pricing
          </Link>
          <Link href="/login" className="hover:text-zinc-200 transition-colors">
            Sign In
          </Link>
          <Link href="/signup" className="hover:text-zinc-200 transition-colors">
            Sign Up
          </Link>
          <Link href="/dashboard" className="hover:text-zinc-200 transition-colors">
            Dashboard
          </Link>
        </div>

        <p className="font-mono text-xs text-zinc-500">
          © {new Date().getFullYear()} LaunchKit. Designed with precision.
        </p>
      </div>
    </footer>
  );
}
