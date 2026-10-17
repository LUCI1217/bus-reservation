"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bus,
  ShieldCheck,
  Clock,
  Award,
  Star,
  MapPin,
  ArrowRight,
  Sparkles,
  Zap,
  TrendingUp,
  Percent,
  CheckCircle2,
  Users,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import { SearchForm } from "@/components/search/SearchForm";

export default function HomePage() {
  const router = useRouter();
  const { buses, routes, trips, setSearchQuery } = useStore();

  const handleRouteClick = (origin: string, destination: string) => {
    setSearchQuery({
      origin,
      destination,
      travelDate: "2026-10-25",
      passengerCount: 1,
    });
    router.push(
      `/search?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(
        destination
      )}&date=2026-10-25&passengers=1`
    );
  };

  return (
    <div className="flex flex-col gap-12 sm:gap-20 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-indigo-900 to-slate-900 pt-16 pb-28 text-white">
        {/* Glow & Backdrop pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent" />
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute top-1/2 -left-24 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-300 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>Next-Generation Intercity Bus Travel</span>
            </div>

            <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-6xl sm:leading-tight">
              Comfortable Journeys,{" "}
              <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
                Guaranteed Seats.
              </span>
            </h1>

            <p className="mt-4 text-base text-slate-300 sm:text-lg">
              Experience luxury Volvo & Scania buses with live seat layouts, 5-minute hold guarantees, transparent dynamic surge fares, and paperless QR boarding.
            </p>
          </div>

          {/* Interactive Search Box */}
          <div className="mx-auto mt-10 max-w-5xl">
            <SearchForm variant="hero" />
          </div>

          {/* Key Trust Metrics */}
          <div className="mt-12 grid grid-cols-2 gap-4 border-t border-slate-800/80 pt-8 sm:grid-cols-4">
            <div className="text-center">
              <p className="text-2xl font-black text-white sm:text-3xl">50,000+</p>
              <p className="text-xs text-slate-400">Monthly Happy Riders</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-black text-white sm:text-3xl">4.8 / 5.0</p>
              <p className="text-xs text-slate-400">Average Fleet Rating</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-black text-white sm:text-3xl">98.5%</p>
              <p className="text-xs text-slate-400">On-Time Performance</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-black text-white sm:text-3xl">100%</p>
              <p className="text-xs text-slate-400">Digital QR Verification</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Intercity Routes */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Top Destinations
            </span>
            <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Popular Intercity Routes
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Daily departures across major metropolitan corridors with premium coaches
            </p>
          </div>

          <Link
            href="/search"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            <span>View all routes</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Route Cards Grid */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {routes.slice(0, 6).map((route) => {
            const sampleTrip = trips.find((t) => t.routeId === route.id);
            const startingFare = sampleTrip ? sampleTrip.baseFare : 650;

            return (
              <div
                key={route.id}
                onClick={() => handleRouteClick(route.origin, route.destination)}
                className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-all hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <span className="text-xs font-bold text-slate-400">Daily Express</span>
                  </div>
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 font-mono text-[11px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {route.estimatedDuration}
                  </span>
                </div>

                <div className="mt-4">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {route.origin} → {route.destination}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    {route.distanceKm} km • {route.boardingPoints.length} boarding points
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
                  <div>
                    <span className="text-[11px] text-slate-400">Fares from</span>
                    <p className="font-mono text-base font-black text-slate-900 dark:text-white">
                      {formatCurrency(startingFare)}
                    </p>
                  </div>
                  <span className="flex items-center gap-1 text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                    <span>Book Seats</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Luxury Fleet */}
      <section className="bg-slate-100/60 py-12 dark:bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Our Premium Fleet
            </span>
            <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Featured Flagship Buses
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Each coach is maintained to the highest safety and comfort standards
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {buses.slice(0, 4).map((bus) => (
              <div
                key={bus.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900 transition hover:shadow-md"
              >
                <div className="bg-gradient-to-tr from-slate-900 to-blue-950 p-5 text-white">
                  <div className="flex items-center justify-between">
                    <span className="rounded bg-white/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                      {bus.busType.replace(/_/g, " ")}
                    </span>
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      <span>{bus.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <h3 className="mt-3 text-lg font-black">{bus.name}</h3>
                  <p className="text-xs text-slate-300 font-mono">{bus.registrationNumber}</p>
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                    <span>Capacity:</span>
                    <strong className="text-slate-900 dark:text-white font-mono">
                      {bus.totalSeats} Passenger Seats
                    </strong>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                    <span>Layout:</span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {bus.hasUpperDeck ? "Lower (Seater) + Upper (Sleeper)" : "Single Deck Seater"}
                    </span>
                  </div>

                  <div className="border-t border-slate-100 pt-2 dark:border-slate-800">
                    <span className="text-[11px] font-semibold text-slate-400">Amenities:</span>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {bus.amenities.map((a, i) => (
                        <span
                          key={i}
                          className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/bus/${bus.id}`}
                    className="mt-2 block w-full rounded-xl border border-blue-200 bg-blue-50 py-2 text-center text-xs font-bold text-blue-700 hover:bg-blue-100 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300 transition"
                  >
                    View Bus Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white shadow-xl sm:p-12">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold backdrop-blur-md">
              <Percent className="h-3.5 w-3.5 text-amber-300" />
              <span>Special Introductory Offer</span>
            </span>
            <h2 className="mt-4 text-3xl font-black sm:text-4xl">
              Save 20% on Your First Intercity Journey
            </h2>
            <p className="mt-2 text-sm text-blue-100">
              Use code <strong className="font-mono text-amber-300">EXPLORE20</strong> during checkout to claim your instant discount. Valid on all routes and buses.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/search"
                className="rounded-xl bg-white px-6 py-3 text-xs font-bold text-blue-900 shadow-md hover:bg-slate-100 transition active:scale-98"
              >
                Find & Book Now
              </Link>
              <Link
                href="/offers"
                className="rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-xs font-bold text-white hover:bg-white/20 transition"
              >
                Browse All Coupons
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose OmniBus */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Engineered for Modern Travelers
          </span>
          <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Why Travelers Choose OmniBus
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
              5-Minute Seat Holds
            </h3>
            <p className="mt-2 text-xs text-slate-500 leading-relaxed">
              Never lose your favorite window or sleeper berth while filling passenger details. Our real-time countdown locks your seat.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400">
              <TrendingUp className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
              Transparent Pricing
            </h3>
            <p className="mt-2 text-xs text-slate-500 leading-relaxed">
              See remaining seat thresholds and transparent dynamic surge multipliers without hidden fees or surprise markups.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
              Encrypted QR Tickets
            </h3>
            <p className="mt-2 text-xs text-slate-500 leading-relaxed">
              Digital boarding passes with cryptographic QR codes prevent counterfeiting and allow contactless, instant bus boarding.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
              Instant Refund Guarantee
            </h3>
            <p className="mt-2 text-xs text-slate-500 leading-relaxed">
              Clear cancellation slabs with one-click refund initiation. Transparent policies protect your plans against unexpected changes.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
