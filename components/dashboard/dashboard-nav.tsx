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
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#090a0c]/85 backdrop-blur-md">
      <div className="container max-w-6xl mx-auto flex h-14 items-center justify-between px-6">
        <div className="flex items-center gap-7">
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="h-7 w-7 rounded-lg bg-zinc-900 border border-white/15 flex items-center justify-center text-zinc-200 group-hover:border-white/30 transition-all duration-200">
              <Terminal className="h-3.5 w-3.5" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm text-zinc-100 tracking-tight">
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
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex text-xs text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04] h-8 px-2.5 gap-1.5 font-normal">
            <Link href="/" target="_blank">
              <span>Landing Page</span>
              <ExternalLink className="h-3 w-3 text-zinc-500" />
            </Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full border border-white/10 hover:border-white/20 transition-all p-0">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatarUrl} alt={user.fullName || "User"} />
                  <AvatarFallback className="bg-zinc-900 text-zinc-200 font-mono text-xs">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-zinc-950 border border-white/10 text-zinc-300 shadow-2xl" align="end" forceMount>
              <DropdownMenuLabel className="font-normal p-3">
                <div className="flex flex-col space-y-1">
                  <p className="text-xs font-medium text-zinc-100">
                    {user.fullName || "Account"}
                  </p>
                  <p className="text-[11px] font-mono text-zinc-500 truncate">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/[0.06]" />
              <DropdownMenuGroup className="p-1">
                <DropdownMenuItem asChild className="text-xs focus:bg-zinc-900 focus:text-zinc-100 rounded-md">
                  <Link href="/dashboard" className="flex items-center cursor-pointer py-1.5">
                    <LayoutDashboard className="mr-2 h-3.5 w-3.5 text-zinc-400" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="text-xs focus:bg-zinc-900 focus:text-zinc-100 rounded-md">
                  <Link href="/#pricing" className="flex items-center cursor-pointer py-1.5">
                    <CreditCard className="mr-2 h-3.5 w-3.5 text-zinc-400" />
                    <span>Subscription Plans</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="bg-white/[0.06]" />
              <div className="p-1">
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="text-xs text-red-400 focus:text-red-300 focus:bg-red-500/10 rounded-md cursor-pointer py-1.5"
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
