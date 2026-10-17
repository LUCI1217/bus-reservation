"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useStore } from "@/lib/store";
import { BusCard } from "@/components/bus/BusCard";
import { SearchForm } from "@/components/search/SearchForm";
import { BusType } from "@/types";
import {
  SlidersHorizontal,
  X,
  RotateCcw,
  Clock,
  Sparkles,
  Search,
  Filter,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const { trips, searchQuery } = useStore();

  const originParam = searchParams.get("origin") || searchQuery.origin || "Mumbai";
  const destParam = searchParams.get("destination") || searchQuery.destination || "Goa (Panaji)";
  const dateParam = searchParams.get("date") || searchQuery.travelDate || "2026-10-25";

  // Filter States
  const [selectedBusTypes, setSelectedBusTypes] = useState<BusType[]>([]);
  const [selectedTimings, setSelectedTimings] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(2000);
  const [sortBy, setSortBy] = useState<string>("departure_asc");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Available amenities
  const allAmenities = ["WiFi", "AC", "Charging Point", "Water Bottle", "Blankets"];

  // Filter & Sort Logic
  const filteredTrips = useMemo(() => {
    return trips.filter((trip) => {
      // Route matching
      const matchesOrigin =
        !originParam ||
        trip.route.origin.toLowerCase().includes(originParam.toLowerCase());
      const matchesDest =
        !destParam ||
        trip.route.destination.toLowerCase().includes(destParam.toLowerCase());

      // Bus Type filter
      const matchesBusType =
        selectedBusTypes.length === 0 ||
        selectedBusTypes.includes(trip.bus.busType);

      // Price filter
      const matchesPrice = trip.currentFare <= maxPrice;

      // Amenities filter
      const matchesAmenities =
        selectedAmenities.length === 0 ||
        selectedAmenities.every((a) => trip.bus.amenities.includes(a));

      // Timing filter
      let matchesTiming = true;
      if (selectedTimings.length > 0) {
        const hour = parseInt(trip.departureTime.split(":")[0], 10);
        matchesTiming = selectedTimings.some((t) => {
          if (t === "morning") return hour >= 6 && hour < 12;
          if (t === "afternoon") return hour >= 12 && hour < 18;
          if (t === "evening") return hour >= 18 && hour < 22;
          if (t === "night") return hour >= 22 || hour < 6;
          return false;
        });
      }

      return matchesOrigin && matchesDest && matchesBusType && matchesPrice && matchesAmenities && matchesTiming;
    }).sort((a, b) => {
      if (sortBy === "price_asc") return a.currentFare - b.currentFare;
      if (sortBy === "price_desc") return b.currentFare - a.currentFare;
      if (sortBy === "departure_asc") return a.departureTime.localeCompare(b.departureTime);
      if (sortBy === "rating_desc") return b.bus.rating - a.bus.rating;
      return 0;
    });
  }, [trips, originParam, destParam, selectedBusTypes, selectedTimings, selectedAmenities, maxPrice, sortBy]);

  const resetFilters = () => {
    setSelectedBusTypes([]);
    setSelectedTimings([]);
    setSelectedAmenities([]);
    setMaxPrice(2000);
    setSortBy("departure_asc");
  };

  const toggleBusType = (type: BusType) => {
    setSelectedBusTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleTiming = (timing: string) => {
    setSelectedTimings((prev) =>
      prev.includes(timing) ? prev.filter((t) => t !== timing) : [...prev, timing]
    );
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Search Header Bar */}
      <div className="mb-6">
        <SearchForm variant="compact" />
      </div>

      {/* Main Grid: Sidebar Filters & Results */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Sidebar Filter (Desktop) */}
        <aside className="hidden lg:col-span-3 lg:block space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Filters</h3>
              </div>
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Departure Time */}
            <div className="py-4 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Departure Time
              </span>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: "morning", label: "Morning", sub: "06:00 - 12:00" },
                  { id: "afternoon", label: "Afternoon", sub: "12:00 - 18:00" },
                  { id: "evening", label: "Evening", sub: "18:00 - 22:00" },
                  { id: "night", label: "Night", sub: "22:00 - 06:00" },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => toggleTiming(t.id)}
                    className={`rounded-xl border p-2 text-left transition ${
                      selectedTimings.includes(t.id)
                        ? "border-blue-600 bg-blue-50 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300 font-bold"
                        : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    }`}
                  >
                    <p className="font-semibold">{t.label}</p>
                    <p className="text-[10px] text-slate-400">{t.sub}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Bus Types */}
            <div className="py-4 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Coach Type
              </span>
              <div className="mt-3 space-y-2 text-xs">
                {[
                  { id: "VOLVO_MULTI_AXLE", label: "Volvo Multi-Axle" },
                  { id: "LUXURY_SCANIA", label: "Luxury Scania" },
                  { id: "AC_SLEEPER", label: "AC Sleeper (Berth)" },
                  { id: "AC_SEATER", label: "AC Seater" },
                  { id: "NON_AC_SLEEPER", label: "Non-AC Sleeper" },
                ].map((b) => (
                  <label
                    key={b.id}
                    className="flex items-center gap-2.5 cursor-pointer text-slate-700 dark:text-slate-300"
                  >
                    <input
                      type="checkbox"
                      checked={selectedBusTypes.includes(b.id as BusType)}
                      onChange={() => toggleBusType(b.id as BusType)}
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-xs font-medium">{b.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="py-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold uppercase tracking-wider text-slate-400">
                  Max Price
                </span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  {formatCurrency(maxPrice)}
                </span>
              </div>
              <input
                type="range"
                min="400"
                max="2000"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="mt-3 w-full accent-blue-600"
              />
            </div>

            {/* Amenities */}
            <div className="pt-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Amenities
              </span>
              <div className="mt-3 space-y-2 text-xs">
                {allAmenities.map((amenity) => (
                  <label
                    key={amenity}
                    className="flex items-center gap-2.5 cursor-pointer text-slate-700 dark:text-slate-300"
                  >
                    <input
                      type="checkbox"
                      checked={selectedAmenities.includes(amenity)}
                      onChange={() => toggleAmenity(amenity)}
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>{amenity}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Right Area: Results List */}
        <section className="lg:col-span-9">
          {/* Results Summary Bar */}
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                {filteredTrips.length} {filteredTrips.length === 1 ? "Bus" : "Buses"} Available
              </h2>
              <p className="text-xs text-slate-500">
                {originParam} → {destParam} • {dateParam}
              </p>
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 focus:outline-none"
              >
                <option value="departure_asc">Earliest Departure</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating_desc">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Bus Cards List */}
          {filteredTrips.length > 0 ? (
            <div className="space-y-4">
              {filteredTrips.map((trip) => (
                <BusCard key={trip.id} trip={trip} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-900/30">
                <Search className="h-7 w-7" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                No Buses Found
              </h3>
              <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
                No scheduled departures matched your current filter criteria for {originParam} to {destParam}.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm font-semibold">Loading search results...</div>}>
      <SearchResultsContent />
    </Suspense>
  );
}
