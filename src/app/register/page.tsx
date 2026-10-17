"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { Bus, User, Mail, Phone, Lock, ArrowRight, CheckCircle2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { setCurrentUser } = useStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [registered, setRegistered] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = {
      id: `usr-${Date.now()}`,
      name: name || "New Traveler",
      email: email || "traveler@example.com",
      phone: phone || "+91 98000 11223",
      role: "USER" as const,
      createdAt: new Date().toISOString(),
    };
    setCurrentUser(newUser);
    setRegistered(true);
    setTimeout(() => {
      router.push("/profile");
    }, 800);
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
            <Bus className="h-6 w-6" />
          </div>
          <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            Create an Account
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Join thousands of travelers enjoying seamless intercity bus journeys
          </p>
        </div>

        {registered && (
          <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="h-4 w-4" />
            <span>Account created successfully! Redirecting...</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Full Legal Name
            </label>
            <div className="mt-1 flex items-center rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
              <User className="h-4 w-4 text-slate-400" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Maya Sharma"
                className="ml-2 w-full bg-transparent text-xs text-slate-900 focus:outline-none dark:text-white"
              />
            </div>
          </div>

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
                placeholder="maya@example.com"
                className="ml-2 w-full bg-transparent text-xs text-slate-900 focus:outline-none dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Mobile Phone
            </label>
            <div className="mt-1 flex items-center rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
              <Phone className="h-4 w-4 text-slate-400" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 00000"
                className="ml-2 w-full bg-transparent text-xs text-slate-900 focus:outline-none dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Password
            </label>
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
            <span>Register & Start Booking</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <p className="text-center text-xs text-slate-500">
          Already registered?{" "}
          <Link href="/login" className="font-bold text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
