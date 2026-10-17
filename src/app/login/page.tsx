"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { Bus, Shield, User, ArrowRight, Lock, Mail, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { switchRole, currentUser } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes("admin")) {
      switchRole("ADMIN");
      router.push("/admin");
    } else {
      switchRole("USER");
      router.push("/profile");
    }
  };

  const handleQuickPassenger = () => {
    switchRole("USER");
    setSuccessMsg("Logged in as Passenger (Alex Johnson)");
    setTimeout(() => router.push("/search"), 600);
  };

  const handleQuickAdmin = () => {
    switchRole("ADMIN");
    setSuccessMsg("Logged in as Fleet Administrator");
    setTimeout(() => router.push("/admin"), 600);
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
            <Bus className="h-6 w-6" />
          </div>
          <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            Welcome to OmniBus
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Sign in to manage bookings, download e-tickets, and earn reward points
          </p>
        </div>

        {/* Quick Demo Access Switchers */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/50">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Quick 1-Click Demo Login
          </span>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleQuickPassenger}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-xs hover:border-blue-400 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <User className="h-3.5 w-3.5 text-emerald-600" />
              <span>Passenger</span>
            </button>
            <button
              type="button"
              onClick={handleQuickAdmin}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-xs hover:border-amber-400 hover:text-amber-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <Shield className="h-3.5 w-3.5 text-amber-600" />
              <span>Fleet Admin</span>
            </button>
          </div>
        </div>

        {successMsg && (
          <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="h-4 w-4" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Standard Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Email Address
            </label>
            <div className="mt-1 flex items-center rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
              <Mail className="h-4 w-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex.johnson@example.com"
                className="ml-2 w-full bg-transparent text-xs text-slate-900 focus:outline-none dark:text-white"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Password
              </label>
              <a href="#" className="text-[11px] text-blue-600 hover:underline">
                Forgot?
              </a>
            </div>
            <div className="mt-1 flex items-center rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
              <Lock className="h-4 w-4 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="ml-2 w-full bg-transparent text-xs text-slate-900 focus:outline-none dark:text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-xs font-bold text-white shadow-md hover:bg-blue-700 transition"
          >
            <span>Sign In to Account</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <p className="text-center text-xs text-slate-500">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-bold text-blue-600 hover:underline">
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
}
