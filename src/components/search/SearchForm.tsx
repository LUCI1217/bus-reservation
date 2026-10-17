"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftRight, Calendar, MapPin, Users, Search } from "lucide-react";
import { useStore } from "@/lib/store";

interface SearchFormProps {
  className?: string;
  variant?: "hero" | "compact";
}

const POPULAR_CITIES = [
  "Mumbai",
  "Goa (Panaji)",
  "Bengaluru",
  "Hyderabad",
  "Delhi",
  "Jaipur",
  "Chennai",
  "Pune",
];

export function SearchForm({ className = "", variant = "hero" }: SearchFormProps) {
  const router = useRouter();
  const { searchQuery, setSearchQuery, swapSearchLocations } = useStore();
  const [showOriginList, setShowOriginList] = useState(false);
  const [showDestList, setShowDestList] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(
      `/search?origin=${encodeURIComponent(searchQuery.origin)}&destination=${encodeURIComponent(
        searchQuery.destination
      )}&date=${encodeURIComponent(searchQuery.travelDate)}&passengers=${searchQuery.passengerCount}`
    );
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`rounded-2xl border border-slate-200/80 bg-white p-3 sm:p-5 shadow-2xl dark:border-slate-700/80 dark:bg-slate-900 transition-all ${className}`}
    >
      <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:items-center">
        {/* Origin Field */}
        <div className="relative md:col-span-3">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            From (Origin)
          </label>
          <div className="mt-1 flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:focus-within:bg-slate-900">
            <MapPin className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
            <input
              type="text"
              value={searchQuery.origin}
              onChange={(e) =>
                setSearchQuery({ ...searchQuery, origin: e.target.value })
              }
              onFocus={() => setShowOriginList(true)}
              onBlur={() => setTimeout(() => setShowOriginList(false), 200)}
              placeholder="e.g. Mumbai"
              className="ml-2 w-full bg-transparent text-sm font-semibold text-slate-900 focus:outline-none dark:text-white"
              required
            />
          </div>

          {/* City Autocomplete Dropdown */}
          {showOriginList && (
            <div className="absolute left-0 top-full z-50 mt-1 max-h-48 w-full overflow-auto rounded-xl border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-700 dark:bg-slate-800">
              {POPULAR_CITIES.filter((c) =>
                c.toLowerCase().includes(searchQuery.origin.toLowerCase())
              ).map((city) => (
                <button
                  type="button"
                  key={city}
                  onMouseDown={() => {
                    setSearchQuery({ ...searchQuery, origin: city });
                    setShowOriginList(false);
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-slate-700 hover:bg-blue-50 dark:text-slate-200 dark:hover:bg-slate-700"
                >
                  <MapPin className="h-3 w-3 text-slate-400" />
                  <span>{city}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Swap Button */}
        <div className="flex justify-center md:col-span-1">
          <button
            type="button"
            onClick={swapSearchLocations}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-transform hover:scale-110 hover:border-blue-400 hover:text-blue-600 active:scale-95 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
            title="Swap Origin and Destination"
            aria-label="Swap Origin and Destination"
          >
            <ArrowLeftRight className="h-4 w-4" />
          </button>
        </div>

        {/* Destination Field */}
        <div className="relative md:col-span-3">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            To (Destination)
          </label>
          <div className="mt-1 flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:focus-within:bg-slate-900">
            <MapPin className="h-4 w-4 shrink-0 text-red-500" />
            <input
              type="text"
              value={searchQuery.destination}
              onChange={(e) =>
                setSearchQuery({ ...searchQuery, destination: e.target.value })
              }
              onFocus={() => setShowDestList(true)}
              onBlur={() => setTimeout(() => setShowDestList(false), 200)}
              placeholder="e.g. Goa (Panaji)"
              className="ml-2 w-full bg-transparent text-sm font-semibold text-slate-900 focus:outline-none dark:text-white"
              required
            />
          </div>

          {showDestList && (
            <div className="absolute left-0 top-full z-50 mt-1 max-h-48 w-full overflow-auto rounded-xl border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-700 dark:bg-slate-800">
              {POPULAR_CITIES.filter((c) =>
                c.toLowerCase().includes(searchQuery.destination.toLowerCase())
              ).map((city) => (
                <button
                  type="button"
                  key={city}
                  onMouseDown={() => {
                    setSearchQuery({ ...searchQuery, destination: city });
                    setShowDestList(false);
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-slate-700 hover:bg-blue-50 dark:text-slate-200 dark:hover:bg-slate-700"
                >
                  <MapPin className="h-3 w-3 text-slate-400" />
                  <span>{city}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Date Field */}
        <div className="md:col-span-3">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Travel Date
          </label>
          <div className="mt-1 flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:focus-within:bg-slate-900">
            <Calendar className="h-4 w-4 shrink-0 text-slate-500" />
            <input
              type="date"
              value={searchQuery.travelDate}
              min="2026-01-01"
              onChange={(e) =>
                setSearchQuery({ ...searchQuery, travelDate: e.target.value })
              }
              className="ml-2 w-full bg-transparent text-sm font-semibold text-slate-900 focus:outline-none dark:text-white"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <label className="hidden md:block text-[11px] font-bold uppercase tracking-wider text-transparent">
            Submit
          </label>
          <button
            type="submit"
            className="mt-1 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 font-bold text-white shadow-lg shadow-blue-500/25 transition hover:from-blue-700 hover:to-indigo-700 active:scale-98"
          >
            <Search className="h-4 w-4" />
            <span>Search</span>
          </button>
        </div>
      </div>

      {/* Quick shortcuts */}
      {variant === "hero" && (
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className="font-medium text-slate-400">Trending Routes:</span>
          {[
            { from: "Mumbai", to: "Goa (Panaji)" },
            { from: "Bengaluru", to: "Hyderabad" },
            { from: "Delhi", to: "Jaipur" },
            { from: "Pune", to: "Mumbai" },
          ].map((r, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setSearchQuery({
                  ...searchQuery,
                  origin: r.from,
                  destination: r.to,
                });
              }}
              className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:bg-blue-100 hover:text-blue-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition"
            >
              {r.from} → {r.to}
            </button>
          ))}
        </div>
      )}
    </form>
  );
}
