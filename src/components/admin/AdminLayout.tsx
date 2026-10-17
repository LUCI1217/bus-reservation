"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Bus,
  Map,
  CalendarDays,
  BadgePercent,
  BookmarkCheck,
  Shield,
  ArrowLeft,
  Menu,
  X,
  Bell,
  Settings,
  UserCheck,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function AdminLayout({ children, title, subtitle, action }: AdminLayoutProps) {
  const pathname = usePathname();
  const { currentUser, switchRole } = useStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const adminNavItems = [
    { href: "/admin", label: "Dashboard Overview", icon: LayoutDashboard },
    { href: "/admin/buses", label: "Manage Buses", icon: Bus },
    { href: "/admin/routes", label: "Manage Routes", icon: Map },
    { href: "/admin/trips", label: "Manage Trips", icon: CalendarDays },
    { href: "/admin/pricing", label: "Dynamic Pricing", icon: BadgePercent },
    { href: "/admin/bookings", label: "Bookings & Tickets", icon: BookmarkCheck },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Admin Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 border-r border-slate-200 bg-slate-900 p-4 text-slate-300 transition-transform dark:border-slate-800 md:static md:translate-x-0 flex flex-col justify-between",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div>
          {/* Logo / Header */}
          <div className="flex items-center justify-between px-2 py-3 border-b border-slate-800">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white font-bold shadow-md shadow-amber-500/20">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <span className="text-base font-black tracking-tight text-white">
                  Omni<span className="text-amber-400">Admin</span>
                </span>
                <span className="block text-[10px] uppercase font-bold text-slate-400">
                  Fleet Control
                </span>
              </div>
            </Link>

            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-slate-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Nav List */}
          <nav className="mt-6 space-y-1">
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Operations
            </div>
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition",
                    isActive
                      ? "bg-amber-500 text-white shadow-md shadow-amber-500/20"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Switcher */}
        <div className="border-t border-slate-800 pt-4 space-y-2">
          <div className="rounded-xl bg-slate-800/80 p-3">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-white">Admin Authorized</span>
            </div>
            <p className="mt-1 text-[11px] text-slate-400 truncate">
              {currentUser.email}
            </p>
          </div>

          <Link
            href="/"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700 hover:text-white transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Passenger Site</span>
          </Link>
        </div>
      </aside>

      {/* Main Admin Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-4 sm:px-8 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-500">
              <span className="rounded bg-amber-100 px-2 py-0.5 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                ADMIN CONSOLE
              </span>
              <span>•</span>
              <span>All Systems Operational</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => switchRole("USER")}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 transition"
              title="Test view as regular Passenger"
            >
              Switch to Passenger Mode
            </button>
          </div>
        </header>

        {/* Page Content Body */}
        <div className="flex-1 p-4 sm:p-8">
          <div className="mx-auto max-w-6xl">
            {/* Page Header */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                  {title}
                </h1>
                {subtitle && (
                  <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
                )}
              </div>
              {action && <div>{action}</div>}
            </div>

            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
