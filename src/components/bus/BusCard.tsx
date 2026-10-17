"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bus, Trip } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { useStore } from "@/lib/store";
import {
  Wifi,
  Wind,
  Zap,
  Coffee,
  Shield,
  Star,
  ChevronDown,
  ChevronUp,
  Clock,
  MapPin,
  CheckCircle,
  Eye,
} from "lucide-react";
import { SeatMap } from "./SeatMap";

interface BusCardProps {
  trip: Trip;
  initiallyExpanded?: boolean;
}

export function BusCard({ trip, initiallyExpanded = false }: BusCardProps) {
  const router = useRouter();
  const { setSelectedTrip } = useStore();
  const [isSeatMapOpen, setIsSeatMapOpen] = useState(initiallyExpanded);
  const [activeTab, setActiveTab] = useState<"seats" | "stops" | "policy">("seats");

  const bus = trip.bus;
  const route = trip.route;

  const isLowAvailability = trip.availableSeatsCount <= 10;
  const isSurgeApplied = trip.currentFare > trip.baseFare;

  const handleSelectSeatsClick = () => {
    setSelectedTrip(trip);
    setIsSeatMapOpen(!isSeatMapOpen);
    setActiveTab("seats");
  };

  const handleProceedToCheckout = () => {
    setSelectedTrip(trip);
    router.push("/checkout");
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      {/* Top Banner if surge or promo */}
      {isSurgeApplied && (
        <div className="bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-700 dark:text-amber-400 border-b border-amber-200/40 flex items-center justify-between">
          <span>⚡ High Demand Route • Dynamic Surge Pricing Active</span>
          <span className="font-mono text-[11px]">Surge Tier: +{Math.round(((trip.currentFare - trip.baseFare) / trip.baseFare) * 100)}%</span>
        </div>
      )}

      {/* Main Bus Overview Bar */}
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
          {/* Operator & Bus Name info (Col 4) */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {bus.name}
              </h3>
              <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                {bus.busType.replace(/_/g, " ")}
              </span>
            </div>

            <p className="mt-1 text-xs font-medium text-slate-500">
              Operated by {bus.operatorName} • {bus.registrationNumber}
            </p>

            {/* Rating & Amenities */}
            <div className="mt-3 flex items-center gap-3">
              <div className="flex items-center gap-1 rounded-md bg-emerald-600 px-2 py-0.5 text-xs font-bold text-white">
                <Star className="h-3 w-3 fill-current" />
                <span>{bus.rating.toFixed(1)}</span>
              </div>
              <span className="text-xs text-slate-400">
                ({bus.reviewsCount} verified reviews)
              </span>

              {/* Amenity pills */}
              <div className="hidden sm:flex items-center gap-1 text-slate-400">
                {bus.amenities.includes("WiFi") && <span title="Free High-speed WiFi"><Wifi className="h-3.5 w-3.5" /></span>}
                {bus.amenities.includes("AC") && <span title="Air Conditioned"><Wind className="h-3.5 w-3.5" /></span>}
                {bus.amenities.includes("Charging Point") && <span title="Charging Outlets"><Zap className="h-3.5 w-3.5" /></span>}
              </div>
            </div>
          </div>

          {/* Timing & Duration (Col 5) */}
          <div className="lg:col-span-5">
            <div className="flex items-center justify-between gap-4">
              {/* Departure */}
              <div>
                <p className="font-mono text-xl font-black text-slate-900 dark:text-white">
                  {trip.departureTime}
                </p>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {route.origin}
                </p>
                <p className="text-[11px] text-slate-400 truncate max-w-[120px]">
                  {route.boardingPoints[0]?.name || "Main Terminal"}
                </p>
              </div>

              {/* Journey Duration Bar */}
              <div className="flex flex-1 flex-col items-center px-2">
                <span className="text-[11px] font-semibold text-slate-400">
                  {route.estimatedDuration}
                </span>
                <div className="relative my-1 w-full flex items-center justify-center">
                  <div className="h-0.5 w-full bg-slate-200 dark:bg-slate-700" />
                  <div className="absolute h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white dark:ring-slate-900" />
                </div>
                <span className="text-[10px] text-slate-400">
                  {route.intermediateStops.length} stops
                </span>
              </div>

              {/* Arrival */}
              <div className="text-right">
                <p className="font-mono text-xl font-black text-slate-900 dark:text-white">
                  {trip.arrivalTime}
                </p>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {route.destination}
                </p>
                <p className="text-[11px] text-slate-400 truncate max-w-[120px]">
                  {route.droppingPoints[0]?.name || "Central Drop"}
                </p>
              </div>
            </div>
          </div>

          {/* Pricing & CTA (Col 3) */}
          <div className="flex flex-col items-start lg:items-end justify-between border-t border-slate-100 pt-3 lg:border-t-0 lg:pt-0 lg:col-span-3">
            <div>
              <div className="flex items-baseline gap-1.5 lg:justify-end">
                <span className="text-xs text-slate-400">Starting from</span>
                <span className="font-mono text-2xl font-black text-slate-900 dark:text-white">
                  {formatCurrency(trip.currentFare)}
                </span>
              </div>
              {isSurgeApplied && (
                <p className="text-[11px] text-slate-400 line-through lg:text-right">
                  Base fare: {formatCurrency(trip.baseFare)}
                </p>
              )}
              <div className="mt-1 flex items-center gap-1.5 lg:justify-end">
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-bold ${
                    isLowAvailability
                      ? "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400"
                      : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                  }`}
                >
                  {trip.availableSeatsCount} seats left
                </span>
              </div>
            </div>

            <div className="mt-4 flex w-full gap-2">
              <button
                type="button"
                onClick={handleSelectSeatsClick}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition active:scale-98"
              >
                <span>{isSeatMapOpen ? "Hide Seats" : "Select Seats"}</span>
                {isSeatMapOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
              <Link
                href={`/bus/${bus.id}`}
                className="flex items-center justify-center rounded-xl border border-slate-200 p-2.5 text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                title="View Bus Specifications"
              >
                <Eye className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Section (Seat Map, Boarding Points, Policy) */}
      {isSeatMapOpen && (
        <div className="border-t border-slate-100 bg-slate-50/50 p-4 sm:p-6 dark:border-slate-800 dark:bg-slate-950/50">
          {/* Subtabs navigation */}
          <div className="mb-4 flex gap-2 border-b border-slate-200 pb-2 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setActiveTab("seats")}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                activeTab === "seats"
                  ? "bg-blue-600 text-white"
                  : "text-slate-600 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-800"
              }`}
            >
              Interactive Seat Layout
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("stops")}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                activeTab === "stops"
                  ? "bg-blue-600 text-white"
                  : "text-slate-600 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-800"
              }`}
            >
              Boarding & Dropping Points ({route.boardingPoints.length + route.droppingPoints.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("policy")}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                activeTab === "policy"
                  ? "bg-blue-600 text-white"
                  : "text-slate-600 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-800"
              }`}
            >
              Cancellation Policy
            </button>
          </div>

          {/* Seat Map Tab */}
          {activeTab === "seats" && (
            <SeatMap
              bus={bus}
              trip={trip}
              onContinue={handleProceedToCheckout}
            />
          )}

          {/* Boarding and Dropping Points Tab */}
          {activeTab === "stops" && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <div>
                <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  <span>Boarding Points ({route.origin})</span>
                </h4>
                <div className="mt-3 space-y-2.5">
                  {route.boardingPoints.map((bp) => (
                    <div
                      key={bp.id}
                      className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-xs dark:border-slate-800 dark:bg-slate-800/60"
                    >
                      <div className="flex items-center justify-between font-semibold text-slate-800 dark:text-slate-200">
                        <span>{bp.name}</span>
                        <span className="font-mono text-blue-600 dark:text-blue-400">
                          +{bp.timeOffsetMinutes} mins
                        </span>
                      </div>
                      <p className="mt-0.5 text-slate-400 text-[11px]">{bp.landmark}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                  <MapPin className="h-4 w-4 text-red-500" />
                  <span>Dropping Points ({route.destination})</span>
                </h4>
                <div className="mt-3 space-y-2.5">
                  {route.droppingPoints.map((dp) => (
                    <div
                      key={dp.id}
                      className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-xs dark:border-slate-800 dark:bg-slate-800/60"
                    >
                      <div className="flex items-center justify-between font-semibold text-slate-800 dark:text-slate-200">
                        <span>{dp.name}</span>
                        <span className="font-mono text-emerald-600 dark:text-emerald-400">
                          Drop
                        </span>
                      </div>
                      <p className="mt-0.5 text-slate-400 text-[11px]">{dp.landmark}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Cancellation Policy Tab */}
          {activeTab === "policy" && (
            <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 text-xs">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Cancellation & Refund Terms
              </h4>
              <div className="mt-4 divide-y divide-slate-100 dark:divide-slate-800">
                <div className="flex justify-between py-2 text-slate-600 dark:text-slate-300">
                  <span>More than 24 hours before departure</span>
                  <span className="font-bold text-emerald-600">90% Refund</span>
                </div>
                <div className="flex justify-between py-2 text-slate-600 dark:text-slate-300">
                  <span>Between 12 to 24 hours before departure</span>
                  <span className="font-bold text-amber-600">50% Refund</span>
                </div>
                <div className="flex justify-between py-2 text-slate-600 dark:text-slate-300">
                  <span>Less than 12 hours before departure</span>
                  <span className="font-bold text-red-600">No Refund (0%)</span>
                </div>
              </div>
              <p className="mt-3 text-[11px] text-slate-400">
                * Note: Platform convenience fee is non-refundable. All eligible refunds are credited to the original payment source within 3-5 business days.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
