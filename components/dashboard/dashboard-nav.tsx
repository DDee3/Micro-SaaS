"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Terminal, LayoutDashboard, CreditCard, LogOut, ExternalLink } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/lib/supabase/client";

interface DashboardNavProps {
  user: {
    email?: string;
    fullName?: string;
    avatarUrl?: string;
  };
}

export function DashboardNav({ user }: DashboardNavProps) {
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const initials =
    user.fullName
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() ||
    user.email?.slice(0, 2).toUpperCase() ||
    "U";

  return (
    <header className="fixed top-4 inset-x-0 mx-auto max-w-5xl w-[calc(100%-2rem)] z-50 rounded-full border border-white/[0.08] bg-[#09090b]/80 backdrop-blur-xl px-5 py-2.5 shadow-[0_16px_36px_rgba(0,0,0,0.6)] transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="h-7 w-7 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-300 group-hover:border-white/25 transition-colors">
              <Terminal className="h-3.5 w-3.5" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-xs sm:text-sm text-zinc-100 tracking-tight">
                LaunchKit
              </span>
              <span className="text-zinc-600 text-xs">/</span>
              <span className="font-mono text-[11px] text-zinc-400">
                Console
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-5 text-xs font-medium text-zinc-400">
            <Link
              href="/dashboard"
              className="text-zinc-100 transition-colors"
            >
              Overview
            </Link>
            <Link
              href="/#pricing"
              className="hover:text-zinc-100 transition-colors"
            >
              Plans
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="hidden sm:inline-flex text-xs text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04] h-8 px-2.5 gap-1.5 font-normal rounded-full"
          >
            <Link href="/" target="_blank">
              <span>Landing Page</span>
              <ExternalLink className="h-3 w-3 text-zinc-500" />
            </Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full border border-white/10 hover:border-white/25 transition-all p-0 focus:outline-none focus:ring-1 focus:ring-white/20"
              >
                <Avatar className="h-7 w-7">
                  <AvatarImage src={user.avatarUrl} alt={user.fullName || "User"} />
                  <AvatarFallback className="bg-zinc-900 text-zinc-200 font-mono text-[11px]">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 bg-zinc-950 border border-white/[0.08] text-zinc-300 shadow-2xl rounded-xl p-1"
              align="end"
              forceMount
            >
              <DropdownMenuLabel className="font-normal px-3 py-2.5">
                <div className="flex flex-col space-y-1">
                  <p className="text-xs font-medium text-zinc-100">
                    {user.fullName || "Account"}
                  </p>
                  <p className="text-[11px] font-mono text-zinc-500 truncate">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/[0.06] -mx-1" />
              <DropdownMenuGroup className="p-1">
                <DropdownMenuItem
                  asChild
                  className="text-xs text-zinc-300 focus:bg-zinc-900 focus:text-zinc-100 rounded-lg cursor-pointer"
                >
                  <Link href="/dashboard" className="flex items-center py-1.5">
                    <LayoutDashboard className="mr-2 h-3.5 w-3.5 text-zinc-400" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  asChild
                  className="text-xs text-zinc-300 focus:bg-zinc-900 focus:text-zinc-100 rounded-lg cursor-pointer"
                >
                  <Link href="/#pricing" className="flex items-center py-1.5">
                    <CreditCard className="mr-2 h-3.5 w-3.5 text-zinc-400" />
                    <span>Subscription Plans</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="bg-white/[0.06] -mx-1" />
              <div className="p-1">
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="text-xs text-rose-400 focus:text-rose-300 focus:bg-rose-500/10 rounded-lg cursor-pointer py-1.5"
                >
                  <LogOut className="mr-2 h-3.5 w-3.5" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
