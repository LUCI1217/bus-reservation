"use client";

import React, { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { SeatMap } from "@/components/bus/SeatMap";
import { HoldTimerBanner } from "@/components/bus/HoldTimerBanner";
import { ChevronRight, ArrowLeft, Bus, Calendar, Clock, MapPin } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function SeatSelectionPage({
  params,
}: {
  params: Promise<{ id?: string; tripId?: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { trips, selectedTrip, setSelectedTrip, selectedSeats } = useStore();

  const tripId = resolvedParams.tripId || resolvedParams.id;
  const trip = trips.find((t) => t.id === tripId) || selectedTrip || trips[0];

  const handleContinue = () => {
    setSelectedTrip(trip);
    router.push("/checkout");
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/search" className="flex items-center gap-1 hover:text-slate-600 dark:hover:text-slate-200">
            <ArrowLeft className="h-3 w-3" />
            <span>Back to Search</span>
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="font-bold text-slate-900 dark:text-white">Seat Selection</span>
        </div>

        {/* Step Indicator */}
        <div className="hidden sm:flex items-center gap-2 text-xs">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-[10px]">
            1
          </span>
          <span className="font-bold text-blue-600">Select Seats</span>
          <span className="text-slate-300">→</span>
          <span className="text-slate-400">2. Passenger Details</span>
          <span className="text-slate-300">→</span>
          <span className="text-slate-400">3. Confirmation</span>
        </div>
      </div>

      {/* Trip Header Banner */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-black text-blue-600 dark:text-blue-400">
                {trip.tripCode}
              </span>
              <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                {trip.bus.name}
              </span>
            </div>
            <h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
              {trip.route.origin} to {trip.route.destination}
            </h2>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                <span>{formatDate(trip.travelDate)}</span>
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-slate-400" />
                <span>
                  {trip.departureTime} departure ({trip.route.estimatedDuration})
                </span>
              </span>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs text-slate-400">Available Seats:</span>
            <p className="font-mono text-lg font-black text-emerald-600">
              {trip.availableSeatsCount} left
            </p>
          </div>
        </div>
      </div>

      {/* Countdown Hold Banner */}
      <div className="mb-6">
        <HoldTimerBanner />
      </div>

      {/* Interactive Coach Seat Map */}
      <SeatMap
        bus={trip.bus}
        trip={trip}
        onContinue={handleContinue}
      />
    </div>
  );
}
