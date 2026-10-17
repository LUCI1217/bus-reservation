"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import {
  User as UserIcon,
  Mail,
  Phone,
  Shield,
  Ticket,
  Calendar,
  Award,
  CheckCircle2,
  Edit3,
} from "lucide-react";

export default function ProfilePage() {
  const { currentUser, bookings, setCurrentUser } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser.name);
  const [phone, setPhone] = useState(currentUser.phone);

  const userBookings = bookings.filter((b) => b.userId === currentUser.id);
  const confirmedCount = userBookings.filter((b) => b.bookingStatus === "CONFIRMED").length;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentUser({
      ...currentUser,
      name,
      phone,
    });
    setIsEditing(false);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {/* Profile Header Banner */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-6 text-white sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-2xl font-black text-white shadow-inner">
                {currentUser.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black">{currentUser.name}</h1>
                  <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-bold">
                    {currentUser.role}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-blue-200">{currentUser.email}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-1.5 rounded-xl bg-white/10 px-4 py-2 text-xs font-bold text-white hover:bg-white/20 backdrop-blur-md transition self-start sm:self-auto"
            >
              <Edit3 className="h-3.5 w-3.5" />
              <span>{isEditing ? "Cancel" : "Edit Profile"}</span>
            </button>
          </div>
        </div>

        {/* Travel Stats Quick Bar */}
        <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100 bg-slate-50 text-center dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-800/40">
          <div className="p-4">
            <p className="font-mono text-xl font-black text-slate-900 dark:text-white">
              {userBookings.length}
            </p>
            <p className="text-[11px] text-slate-400">Total Bookings</p>
          </div>
          <div className="p-4">
            <p className="font-mono text-xl font-black text-emerald-600">
              {confirmedCount}
            </p>
            <p className="text-[11px] text-slate-400">Active / Confirmed</p>
          </div>
          <div className="p-4">
            <p className="font-mono text-xl font-black text-amber-500">
              {confirmedCount * 120} pts
            </p>
            <p className="text-[11px] text-slate-400">OmniPoints Reward</p>
          </div>
        </div>

        {/* Details & Edit Form */}
        <div className="p-6 sm:p-8">
          {isEditing ? (
            <form onSubmit={handleSave} className="max-w-md space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-300 p-2 text-xs dark:border-slate-700 dark:bg-slate-800"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Mobile Phone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-300 p-2 text-xs dark:border-slate-700 dark:bg-slate-800"
                  required
                />
              </div>
              <button
                type="submit"
                className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-sm"
              >
                Save Changes
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Contact & Account Details
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-xs">
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/50">
                  <span className="text-slate-400">Email Address</span>
                  <p className="mt-1 font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-blue-600" />
                    <span>{currentUser.email}</span>
                  </p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/50">
                  <span className="text-slate-400">Phone Number</span>
                  <p className="mt-1 font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-emerald-600" />
                    <span>{currentUser.phone}</span>
                  </p>
                </div>
              </div>

              {/* Quick Navigation Cards */}
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-3">
                <Link
                  href="/my-bookings"
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition"
                >
                  <Calendar className="h-4 w-4" />
                  <span>View My Bookings</span>
                </Link>
                <Link
                  href="/my-tickets"
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition"
                >
                  <Ticket className="h-4 w-4" />
                  <span>View E-Tickets</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
