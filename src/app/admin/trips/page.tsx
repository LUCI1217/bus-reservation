"use client";

import React, { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useStore } from "@/lib/store";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  CalendarDays,
  Plus,
  Clock,
  Bus as BusIcon,
  MapPin,
  TrendingUp,
  X,
  AlertCircle,
} from "lucide-react";

export default function AdminTripsPage() {
  const { trips, buses, routes, addTrip } = useStore();
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [busId, setBusId] = useState(buses[0]?.id || "");
  const [routeId, setRouteId] = useState(routes[0]?.id || "");
  const [departureTime, setDepartureTime] = useState("21:30");
  const [arrivalTime, setArrivalTime] = useState("07:00");
  const [travelDate, setTravelDate] = useState("2026-10-26");
  const [baseFare, setBaseFare] = useState(850);

  const handleCreateTrip = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedBus = buses.find((b) => b.id === busId) || buses[0];
    const selectedRoute = routes.find((r) => r.id === routeId) || routes[0];

    const tripCode = `${selectedRoute.origin.substring(0, 3).toUpperCase()}-${selectedRoute.destination.substring(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

    addTrip({
      tripCode,
      busId: selectedBus.id,
      routeId: selectedRoute.id,
      departureTime,
      arrivalTime,
      travelDate,
      baseFare: Number(baseFare),
      currentFare: Number(baseFare),
      availableSeatsCount: selectedBus.totalSeats,
      pricingRuleId: "rule-standard",
      status: "SCHEDULED",
    });

    setShowAddModal(false);
  };

  return (
    <AdminLayout
      title="Manage Scheduled Departures & Trips"
      subtitle="Assign registered buses to travel routes, set departure timings, and monitor seat occupancy"
      action={
        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-amber-600 transition"
        >
          <Plus className="h-4 w-4" />
          <span>Schedule New Trip</span>
        </button>
      }
    >
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-500 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-400">
              <tr>
                <th className="p-4">Trip Code</th>
                <th className="p-4">Route & Corridors</th>
                <th className="p-4">Assigned Bus</th>
                <th className="p-4">Date & Timing</th>
                <th className="p-4">Base / Current Fare</th>
                <th className="p-4">Seat Availability</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {trips.map((trip) => (
                <tr key={trip.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="p-4 font-mono font-bold text-blue-600 dark:text-blue-400">
                    {trip.tripCode}
                  </td>
                  <td className="p-4">
                    <p className="font-bold text-slate-900 dark:text-white">
                      {trip.route.origin} → {trip.route.destination}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {trip.route.estimatedDuration}
                    </p>
                  </td>
                  <td className="p-4">
                    <p className="font-bold text-slate-900 dark:text-white">{trip.bus.name}</p>
                    <p className="text-[11px] text-slate-400 font-mono">
                      {trip.bus.registrationNumber}
                    </p>
                  </td>
                  <td className="p-4">
                    <p className="font-mono font-bold text-slate-900 dark:text-white">
                      {trip.departureTime} - {trip.arrivalTime}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {formatDate(trip.travelDate)}
                    </p>
                  </td>
                  <td className="p-4 font-mono">
                    <span className="font-bold text-slate-900 dark:text-white">
                      {formatCurrency(trip.currentFare)}
                    </span>
                    {trip.currentFare > trip.baseFare && (
                      <span className="ml-1 text-[10px] text-amber-600">
                        (Surge active)
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <span
                      className={`font-mono font-bold ${
                        trip.availableSeatsCount <= 10
                          ? "text-red-600"
                          : "text-emerald-600"
                      }`}
                    >
                      {trip.availableSeatsCount} / {trip.bus.totalSeats} seats
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                      {trip.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Schedule Trip Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Schedule New Departure
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTrip} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300">
                  Select Assigned Bus
                </label>
                <select
                  value={busId}
                  onChange={(e) => setBusId(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-300 p-2.5 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  {buses.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} ({b.registrationNumber}) - {b.totalSeats} seats
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300">
                  Select Travel Route
                </label>
                <select
                  value={routeId}
                  onChange={(e) => setRouteId(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-300 p-2.5 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  {routes.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.origin} → {r.destination} ({r.distanceKm} km)
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300">
                    Departure Time
                  </label>
                  <input
                    type="time"
                    required
                    value={departureTime}
                    onChange={(e) => setDepartureTime(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-300 p-2.5 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300">
                    Arrival Time
                  </label>
                  <input
                    type="time"
                    required
                    value={arrivalTime}
                    onChange={(e) => setArrivalTime(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-300 p-2.5 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300">
                    Travel Date
                  </label>
                  <input
                    type="date"
                    required
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-300 p-2.5 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300">
                    Base Fare (₹)
                  </label>
                  <input
                    type="number"
                    required
                    min="300"
                    max="5000"
                    value={baseFare}
                    onChange={(e) => setBaseFare(Number(e.target.value))}
                    className="mt-1 w-full rounded-xl border border-slate-300 p-2.5 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
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
                  Confirm Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
