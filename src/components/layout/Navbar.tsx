"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bus, User, Shield, Menu, X, Ticket, Calendar, Tag, HelpCircle, ChevronDown, Check } from "lucide-react";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const { currentUser, switchRole } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const isAdminRoute = pathname.startsWith("/admin");

  const navLinks = [
    { href: "/search", label: "Find Buses", icon: Bus },
    { href: "/offers", label: "Offers", icon: Tag },
    { href: "/my-bookings", label: "My Bookings", icon: Calendar },
    { href: "/my-tickets", label: "My Tickets", icon: Ticket },
    { href: "/help", label: "Help & FAQ", icon: HelpCircle },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95 transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Bus className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                  Omni<span className="text-blue-600 dark:text-blue-400">Bus</span>
                </span>
                <span className="rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-bold text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
                  EXPRESS
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium tracking-wide">
                PREMIUM TRAVEL
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 font-semibold"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Section: Role Switcher & Auth */}
        <div className="hidden md:flex items-center gap-3">
          {/* Role Switcher Pill */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition"
              title="Quickly switch between passenger and admin roles"
            >
              <div
                className={cn(
                  "h-2 w-2 rounded-full animate-pulse",
                  currentUser.role === "ADMIN" ? "bg-amber-500" : "bg-emerald-500"
                )}
              />
              <span>Role: <strong className="font-semibold">{currentUser.role}</strong></span>
              <ChevronDown className="h-3 w-3 text-slate-400" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-700 dark:bg-slate-800 z-50">
                <div className="px-2 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Switch Active Role
                </div>
                <button
                  onClick={() => {
                    switchRole("USER");
                    setRoleDropdownOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-medium transition",
                    currentUser.role === "USER"
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                      : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-emerald-600" />
                    <div>
                      <p className="font-semibold">Passenger (User)</p>
                      <p className="text-[10px] text-slate-400">Search & book tickets</p>
                    </div>
                  </div>
                  {currentUser.role === "USER" && <Check className="h-4 w-4 text-blue-600" />}
                </button>
                <button
                  onClick={() => {
                    switchRole("ADMIN");
                    setRoleDropdownOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-medium transition mt-1",
                    currentUser.role === "ADMIN"
                      ? "bg-amber-50 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                      : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-amber-600" />
                    <div>
                      <p className="font-semibold">Administrator</p>
                      <p className="text-[10px] text-slate-400">Manage fleet, routes & trips</p>
                    </div>
                  </div>
                  {currentUser.role === "ADMIN" && <Check className="h-4 w-4 text-amber-600" />}
                </button>
              </div>
            )}
          </div>

          {/* Admin Dashboard CTA if Admin */}
          {currentUser.role === "ADMIN" && (
            <Link
              href="/admin"
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold shadow-sm transition",
                isAdminRoute
                  ? "bg-amber-500 text-white hover:bg-amber-600"
                  : "bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
              )}
            >
              <Shield className="h-3.5 w-3.5" />
              <span>Admin Dashboard</span>
            </Link>
          )}

          {/* User profile / login button */}
          <Link
            href="/profile"
            className="flex items-center gap-2 rounded-full border border-slate-200 bg-white p-1 pr-3 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 transition"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold text-xs dark:bg-blue-900 dark:text-blue-200">
              {currentUser.name.charAt(0)}
            </div>
            <span className="text-xs font-medium text-slate-700 dark:text-slate-200">
              {currentUser.name.split(" ")[0]}
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => switchRole(currentUser.role === "USER" ? "ADMIN" : "USER")}
            className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300"
          >
            {currentUser.role}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 dark:border-slate-800 dark:bg-slate-900">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <Icon className="h-4 w-4 text-blue-600" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
              <Link
                href="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <User className="h-4 w-4 text-emerald-600" />
                <span>My Profile ({currentUser.name})</span>
              </Link>
              {currentUser.role === "ADMIN" && (
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-lg bg-amber-500 px-3 py-2.5 text-sm font-medium text-white"
                >
                  <Shield className="h-4 w-4" />
                  <span>Admin Dashboard</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
