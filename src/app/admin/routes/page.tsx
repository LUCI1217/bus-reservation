"use client";

import React, { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useStore } from "@/lib/store";
import { Route } from "@/types";
import {
  Map,
  Plus,
  Trash2,
  MapPin,
  Clock,
  ArrowRight,
  X,
  Navigation,
} from "lucide-react";

export default function AdminRoutesPage() {
  const { routes, addRoute, updateRoute, deleteRoute } = useStore();
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [distanceKm, setDistanceKm] = useState(450);
  const [estimatedDuration, setEstimatedDuration] = useState("7h 30m");
  const [stopsText, setStopsText] = useState("Hubli, Belgaum");

  const handleCreateRoute = (e: React.FormEvent) => {
    e.preventDefault();
    const stops = stopsText.split(",").map((s) => s.trim()).filter(Boolean);

    addRoute({
      origin: origin || "Pune",
      destination: destination || "Bengaluru",
      distanceKm: Number(distanceKm),
      estimatedDuration: estimatedDuration || "8h 00m",
      boardingPoints: [
        { id: `bp-${Date.now()}-1`, name: `${origin || "Main"} Bus Stand`, landmark: "Platform 1", timeOffsetMinutes: 0 },
        { id: `bp-${Date.now()}-2`, name: `${origin || "Express"} Toll Plaza`, landmark: "Highway Exit", timeOffsetMinutes: 30 },
      ],
      droppingPoints: [
        { id: `dp-${Date.now()}-1`, name: `${destination || "City"} Central Stand`, landmark: "Near Metro", timeOffsetMinutes: 480 },
      ],
      intermediateStops: stops,
      isActive: true,
    });

    setShowAddModal(false);
    setOrigin("");
    setDestination("");
  };

  return (
    <AdminLayout
      title="Manage Travel Corridors & Routes"
      subtitle="Define origins, destinations, boarding and dropping points, and intermediate highway stops"
      action={
        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-amber-600 transition"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Route</span>
        </button>
      }
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {routes.map((route) => (
          <div
            key={route.id}
            className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 text-[11px] font-bold text-blue-600 dark:text-blue-400">
                  <Navigation className="h-3.5 w-3.5" />
                  <span>{route.distanceKm} km</span>
                </span>
                <span className="font-mono text-xs font-bold text-slate-500">
                  {route.estimatedDuration}
                </span>
              </div>

              <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>{route.origin}</span>
                <ArrowRight className="h-4 w-4 text-slate-400" />
                <span>{route.destination}</span>
              </h3>

              {/* Boarding and Dropping points count */}
              <div className="mt-4 space-y-2 border-t border-slate-100 pt-3 dark:border-slate-800 text-xs">
                <div>
                  <span className="text-[11px] font-semibold text-slate-400">
                    Boarding Points ({route.boardingPoints.length}):
                  </span>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {route.boardingPoints.map((bp) => (
                      <span
                        key={bp.id}
                        className="rounded bg-blue-50 px-2 py-0.5 text-[10px] text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 font-medium"
                      >
                        {bp.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-slate-400">
                    Dropping Points ({route.droppingPoints.length}):
                  </span>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {route.droppingPoints.map((dp) => (
                      <span
                        key={dp.id}
                        className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 font-medium"
                      >
                        {dp.name}
                      </span>
                    ))}
                  </div>
                </div>

                {route.intermediateStops.length > 0 && (
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400">
                      Stops:
                    </span>{" "}
                    <span className="text-[11px] text-slate-600 dark:text-slate-400">
                      {route.intermediateStops.join(", ")}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span>Active Corridor</span>
              </span>
              <button
                type="button"
                onClick={() => deleteRoute(route.id)}
                className="text-slate-400 hover:text-red-600 p-1 rounded-lg transition"
                title="Remove Route"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Route Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Create Intercity Route
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRoute} className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300">
                    Origin City
                  </label>
                  <input
                    type="text"
                    required
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    placeholder="e.g. Pune"
                    className="mt-1 w-full rounded-xl border border-slate-300 p-2.5 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300">
                    Destination City
                  </label>
                  <input
                    type="text"
                    required
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="e.g. Bengaluru"
                    className="mt-1 w-full rounded-xl border border-slate-300 p-2.5 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300">
                    Distance (Kilometers)
                  </label>
                  <input
                    type="number"
                    required
                    value={distanceKm}
                    onChange={(e) => setDistanceKm(Number(e.target.value))}
                    className="mt-1 w-full rounded-xl border border-slate-300 p-2.5 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300">
                    Estimated Duration
                  </label>
                  <input
                    type="text"
                    required
                    value={estimatedDuration}
                    onChange={(e) => setEstimatedDuration(e.target.value)}
                    placeholder="e.g. 8h 30m"
                    className="mt-1 w-full rounded-xl border border-slate-300 p-2.5 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300">
                  Intermediate Stops (comma-separated)
                </label>
                <input
                  type="text"
                  value={stopsText}
                  onChange={(e) => setStopsText(e.target.value)}
                  placeholder="e.g. Kolhapur, Belagavi"
                  className="mt-1 w-full rounded-xl border border-slate-300 p-2.5 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div className="mt-6 flex justify-end gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-xl border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-amber-500 px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-amber-600 transition"
                >
                  Create Route
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
