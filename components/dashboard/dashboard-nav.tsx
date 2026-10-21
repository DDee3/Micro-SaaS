import Link from "next/link";
import { Sparkles } from "lucide-react";
import { UserNav } from "@/components/dashboard/user-nav";

interface DashboardNavProps {
  user: {
    email?: string;
    fullName?: string;
    avatarUrl?: string;
  };
}

export function DashboardNav({ user }: DashboardNavProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/80 backdrop-blur-md">
      <div className="container max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-500 flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">
              LaunchSaaS<span className="text-primary">.kit</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link
              href="/dashboard"
              className="text-foreground transition-colors"
            >
              Overview
            </Link>
            <Link
              href="/#pricing"
              className="hover:text-foreground transition-colors"
            >
              Upgrade
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <UserNav user={user} />
        </div>
      </div>
    </header>
  );
}

