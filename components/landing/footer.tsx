import Link from "next/link";
import { Sparkles, Github, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/50 py-12 md:py-16">
      <div className="container max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="font-semibold text-lg tracking-tight">
            LaunchSaaS<span className="text-primary">.kit</span>
          </span>
        </div>

        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <Link href="#features" className="hover:text-foreground transition-colors">
            Features
          </Link>
          <Link href="#pricing" className="hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Link href="/login" className="hover:text-foreground transition-colors">
            Sign In
          </Link>
          <Link href="/signup" className="hover:text-foreground transition-colors">
            Sign Up
          </Link>
        </div>

        <p className="text-xs text-muted-foreground text-center md:text-right">
          © {new Date().getFullYear()} LaunchSaaS Kit. Built for indie hackers and micro-saas creators.
        </p>
      </div>
    </footer>
  );
}

