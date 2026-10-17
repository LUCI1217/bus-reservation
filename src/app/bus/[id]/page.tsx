"use client";

import React, { use } from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import {
  Bus as BusIcon,
  Star,
  Shield,
  Wifi,
  Wind,
  Zap,
  Coffee,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";

export default function BusDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { buses, trips, setSelectedTrip } = useStore();

  const bus = buses.find((b) => b.id === resolvedParams.id);

  if (!bus) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">Bus Not Found</h2>
        <p className="mt-2 text-sm text-slate-500">
          The requested coach could not be located in our fleet registry.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  // Find trips served by this bus
  const scheduledTrips = trips.filter((t) => t.busId === bus.id);

  const handleBookTrip = (trip: (typeof trips)[0]) => {
    setSelectedTrip(trip);
    router.push("/checkout");
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-xs text-slate-400">
        <Link href="/" className="hover:text-slate-600 dark:hover:text-slate-200">
          Home
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/search" className="hover:text-slate-600 dark:hover:text-slate-200">
          Fleet
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="font-bold text-slate-900 dark:text-white">{bus.name}</span>
      </div>

      {/* Main Bus Header Card */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md dark:border-slate-800 dark:bg-slate-900">
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 p-6 text-white sm:p-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-blue-300">
                <BusIcon className="h-3.5 w-3.5" />
                <span>{bus.busType.replace(/_/g, " ")}</span>
              </div>
              <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                {bus.name}
              </h1>
              <p className="mt-1 text-xs text-slate-300">
                Operated by {bus.operatorName} • Reg. No:{" "}
                <span className="font-mono font-bold text-white">{bus.registrationNumber}</span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-white/10 p-4 text-center backdrop-blur-md">
                <div className="flex items-center justify-center gap-1 text-amber-400 font-bold text-xl">
                  <Star className="h-5 w-5 fill-current" />
                  <span>{bus.rating.toFixed(1)}</span>
                </div>
                <p className="mt-0.5 text-[10px] text-slate-300">
                  {bus.reviewsCount} passenger reviews
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bus Specs Grid */}
        <div className="border-b border-slate-100 p-6 dark:border-slate-800 sm:p-8">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            Coach Specifications & Safety
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/50">
              <span className="text-xs text-slate-400">Seating Capacity</span>
              <p className="mt-1 text-lg font-black text-slate-900 dark:text-white font-mono">
                {bus.totalSeats} Seats
              </p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/50">
              <span className="text-xs text-slate-400">Layout Decks</span>
              <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                {bus.hasUpperDeck ? "Double Deck (2+1)" : "Single Deck (2+2)"}
              </p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/50">
              <span className="text-xs text-slate-400">Fleet Status</span>
              <p className="mt-1 text-lg font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" />
                <span>Active & Certified</span>
              </p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/50">
              <span className="text-xs text-slate-400">Tracking</span>
              <p className="mt-1 text-lg font-bold text-blue-600 dark:text-blue-400">
                Live GPS Enabled
              </p>
            </div>
          </div>

          {/* Amenities List */}
          <div className="mt-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Onboard Amenities
            </h3>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {bus.amenities.map((amenity, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white p-3 text-xs font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scheduled Departures for this Coach */}
        <div className="p-6 sm:p-8">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Upcoming Departures on {bus.name}
          </h2>
          <p className="text-xs text-slate-500">
            Scheduled intercity journeys assigned to this coach
          </p>

          <div className="mt-4 space-y-3">
            {scheduledTrips.length > 0 ? (
              scheduledTrips.map((trip) => (
                <div
                  key={trip.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-800/40"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-black text-slate-900 dark:text-white">
                        {trip.departureTime} → {trip.arrivalTime}
                      </span>
                      <span className="rounded bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-800 dark:bg-blue-900/60 dark:text-blue-300">
                        {trip.route.estimatedDuration}
                      </span>
                    </div>
                    <p className="mt-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {trip.route.origin} to {trip.route.destination}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Date: {trip.travelDate} • {trip.availableSeatsCount} seats available
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-[11px] text-slate-400">Fare</span>
                      <p className="font-mono text-lg font-black text-slate-900 dark:text-white">
                        {formatCurrency(trip.currentFare)}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleBookTrip(trip)}
                      className="rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition"
                    >
                      Book This Bus
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 italic">
                No active departures currently scheduled for this vehicle.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
