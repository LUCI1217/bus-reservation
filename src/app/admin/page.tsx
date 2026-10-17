"use client";

import React from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useStore } from "@/lib/store";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  Bus,
  Map,
  CalendarDays,
  BookmarkCheck,
  TrendingUp,
  Users,
  ShieldCheck,
  DollarSign,
  ArrowUpRight,
  Plus,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { buses, routes, trips, bookings } = useStore();

  const totalRevenue = bookings
    .filter((b) => b.bookingStatus === "CONFIRMED")
    .reduce((sum, b) => sum + b.finalTotal, 0);

  const totalConfirmedBookings = bookings.filter(
    (b) => b.bookingStatus === "CONFIRMED"
  ).length;

  const totalSeatsInFleet = buses.reduce((acc, b) => acc + b.totalSeats, 0);

  const stats = [
    {
      title: "Gross Confirmed Revenue",
      value: formatCurrency(totalRevenue),
      change: "+18.4% this week",
      icon: DollarSign,
      color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40",
    },
    {
      title: "Active Scheduled Trips",
      value: trips.length.toString(),
      change: "Across 5 intercity corridors",
      icon: CalendarDays,
      color: "text-blue-600 bg-blue-50 dark:bg-blue-950/40",
    },
    {
      title: "Active Fleet Vehicles",
      value: buses.length.toString(),
      change: `${totalSeatsInFleet} total passenger capacity`,
      icon: Bus,
      color: "text-amber-600 bg-amber-50 dark:bg-amber-950/40",
    },
    {
      title: "Confirmed Passenger Manifests",
      value: totalConfirmedBookings.toString(),
      change: "100% QR verified",
      icon: BookmarkCheck,
      color: "text-purple-600 bg-purple-50 dark:bg-purple-950/40",
    },
  ];

  return (
    <AdminLayout
      title="Fleet Operations & Overview"
      subtitle="Real-time status of scheduled departures, active coaches, and gross reservation metrics"
      action={
        <div className="flex gap-2">
          <Link
            href="/admin/buses"
            className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-amber-600 transition"
          >
            <Plus className="h-4 w-4" />
            <span>Add New Bus</span>
          </Link>
          <Link
            href="/admin/trips"
            className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-slate-800 dark:bg-white dark:text-slate-900 transition"
          >
            <Plus className="h-4 w-4" />
            <span>Schedule Trip</span>
          </Link>
        </div>
      }
    >
      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">
                  {stat.title}
                </span>
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${stat.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-3 font-mono text-2xl font-black text-slate-900 dark:text-white">
                {stat.value}
              </p>
              <p className="mt-1 text-[11px] text-slate-400 font-medium">
                {stat.change}
              </p>
            </div>
          );
        })}
      </div>

      {/* 2 Column Operations Grid */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Recent Bookings (Col 7) */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Recent Passenger Reservations
              </h3>
              <p className="text-[11px] text-slate-400">
                Latest bookings across all scheduled trips
              </p>
            </div>
            <Link
              href="/admin/bookings"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-1"
            >
              <span>View all</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-4 divide-y divide-slate-100 dark:divide-slate-800">
            {bookings.slice(0, 5).map((booking) => (
              <div key={booking.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-900 dark:text-white">
                      {booking.pnr}
                    </span>
                    <span
                      className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                        booking.bookingStatus === "CONFIRMED"
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                          : "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300"
                      }`}
                    >
                      {booking.bookingStatus}
                    </span>
                  </div>
                  <p className="mt-0.5 text-slate-500 text-[11px]">
                    {booking.user.name} • {booking.trip.route.origin} → {booking.trip.route.destination}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-mono font-bold text-slate-900 dark:text-white">
                    {formatCurrency(booking.finalTotal)}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {booking.selectedSeats.join(", ")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fleet Quick Status (Col 5) */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Active Fleet Coaches ({buses.length})
              </h3>
              <p className="text-[11px] text-slate-400">
                Operational status & seat capacity
              </p>
            </div>
            <Link
              href="/admin/buses"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-1"
            >
              <span>Manage</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-4 space-y-3">
            {buses.slice(0, 5).map((bus) => (
              <div
                key={bus.id}
                className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/50 text-xs"
              >
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{bus.name}</p>
                  <p className="text-[11px] text-slate-400 font-mono">
                    {bus.registrationNumber} • {bus.busType.replace(/_/g, " ")}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                    {bus.totalSeats} seats
                  </span>
                  <span className="block text-[10px] text-emerald-600 font-semibold">
                    ● Ready
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
