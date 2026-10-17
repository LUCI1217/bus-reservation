"use client";

import React, { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useStore } from "@/lib/store";
import { Bus, BusType } from "@/types";
import {
  Plus,
  Bus as BusIcon,
  Trash2,
  Edit,
  Check,
  X,
  Star,
  CheckCircle2,
  Layers,
} from "lucide-react";

export default function AdminBusesPage() {
  const { buses, addBus, updateBus, deleteBus } = useStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingBusId, setEditingBusId] = useState<string | null>(null);

  // New Bus form state
  const [name, setName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [busType, setBusType] = useState<BusType>("VOLVO_MULTI_AXLE");
  const [totalSeats, setTotalSeats] = useState(40);
  const [operatorName, setOperatorName] = useState("OmniBus Premier");
  const [hasUpperDeck, setHasUpperDeck] = useState(true);
  const [amenities, setAmenities] = useState<string[]>([
    "WiFi",
    "AC",
    "Charging Point",
    "Water Bottle",
  ]);

  const allAmenitiesOptions = [
    "WiFi",
    "AC",
    "Charging Point",
    "Water Bottle",
    "Blankets",
    "Pillow",
    "Reading Light",
    "Snacks",
    "Live Tracking",
  ];

  const handleToggleAmenity = (a: string) => {
    setAmenities((prev) =>
      prev.includes(a) ? prev.filter((item) => item !== a) : [...prev, a]
    );
  };

  const handleCreateBus = (e: React.FormEvent) => {
    e.preventDefault();
    addBus({
      name: name || "Express Cruiser",
      registrationNumber: registrationNumber || `MH-04-EX-${Math.floor(1000 + Math.random() * 9000)}`,
      busType,
      totalSeats: Number(totalSeats),
      amenities,
      rating: 4.8,
      reviewsCount: 1,
      operatorName,
      hasUpperDeck,
      isActive: true,
    });
    setShowAddModal(false);
    // Reset
    setName("");
    setRegistrationNumber("");
  };

  return (
    <AdminLayout
      title="Manage Fleet & Buses"
      subtitle="Register coaches, configure seat capacities, sleeper decks, and onboard amenities"
      action={
        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-amber-600 transition"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Bus</span>
        </button>
      }
    >
      {/* Buses Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-500 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-400">
              <tr>
                <th className="p-4">Bus / Custom Name</th>
                <th className="p-4">Registration</th>
                <th className="p-4">Coach Type</th>
                <th className="p-4">Capacity</th>
                <th className="p-4">Layout Structure</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {buses.map((bus) => (
                <tr key={bus.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="p-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/40">
                        <BusIcon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{bus.name}</p>
                        <p className="text-[11px] text-slate-400">{bus.operatorName}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-mono font-bold text-slate-700 dark:text-slate-300">
                    {bus.registrationNumber}
                  </td>
                  <td className="p-4">
                    <span className="rounded bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
                      {bus.busType.replace(/_/g, " ")}
                    </span>
                  </td>
                  <td className="p-4 font-mono font-bold text-slate-900 dark:text-white">
                    {bus.totalSeats} seats
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">
                    {bus.hasUpperDeck ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                        <Layers className="h-3.5 w-3.5" />
                        <span>Lower (Seater) + Upper (Sleeper)</span>
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-500">
                        Single Deck (2+2 Seater)
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <button
                      type="button"
                      onClick={() => updateBus(bus.id, { isActive: !bus.isActive })}
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold transition ${
                        bus.isActive
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                          : "bg-slate-100 text-slate-500 dark:bg-slate-800"
                      }`}
                    >
                      <div className={`h-1.5 w-1.5 rounded-full ${bus.isActive ? "bg-emerald-500" : "bg-slate-400"}`} />
                      <span>{bus.isActive ? "Active" : "Deactivated"}</span>
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      type="button"
                      onClick={() => deleteBus(bus.id)}
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 transition"
                      title="Decommission Bus"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Bus Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Add New Bus to Fleet
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateBus} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300">
                  Custom Bus Name (e.g. Royal Express, Night Rider)
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Pacific Voyager"
                  className="mt-1 w-full rounded-xl border border-slate-300 p-2.5 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300">
                    Registration Number
                  </label>
                  <input
                    type="text"
                    required
                    value={registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                    placeholder="MH-12-AB-9900"
                    className="mt-1 w-full rounded-xl border border-slate-300 p-2.5 font-mono dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300">
                    Coach Category
                  </label>
                  <select
                    value={busType}
                    onChange={(e) => setBusType(e.target.value as BusType)}
                    className="mt-1 w-full rounded-xl border border-slate-300 p-2.5 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  >
                    <option value="VOLVO_MULTI_AXLE">Volvo Multi-Axle</option>
                    <option value="LUXURY_SCANIA">Luxury Scania</option>
                    <option value="AC_SLEEPER">AC Sleeper</option>
                    <option value="AC_SEATER">AC Seater</option>
                    <option value="NON_AC_SLEEPER">Non-AC Sleeper</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300">
                    Total Passenger Capacity
                  </label>
                  <input
                    type="number"
                    min="15"
                    max="60"
                    value={totalSeats}
                    onChange={(e) => setTotalSeats(Number(e.target.value))}
                    className="mt-1 w-full rounded-xl border border-slate-300 p-2.5 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300">
                    Deck Configuration
                  </label>
                  <select
                    value={hasUpperDeck ? "yes" : "no"}
                    onChange={(e) => setHasUpperDeck(e.target.value === "yes")}
                    className="mt-1 w-full rounded-xl border border-slate-300 p-2.5 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  >
                    <option value="yes">Double Deck (Lower + Upper)</option>
                    <option value="no">Single Deck Only</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300">
                  Amenities & Facilities
                </label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {allAmenitiesOptions.map((amenity) => (
                    <label
                      key={amenity}
                      className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300"
                    >
                      <input
                        type="checkbox"
                        checked={amenities.includes(amenity)}
                        onChange={() => handleToggleAmenity(amenity)}
                        className="rounded border-slate-300 text-blue-600"
                      />
                      <span>{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-xl border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-amber-500 px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-amber-600 transition"
                >
                  Save Bus to Fleet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
