"use client";

import React, { useState } from "react";
import { Bus, Seat, Trip } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { Zap, Info, Check, ShieldAlert } from "lucide-react";

interface SeatMapProps {
  bus: Bus;
  trip: Trip;
  onContinue?: () => void;
}

export function SeatMap({ bus, trip, onContinue }: SeatMapProps) {
  const { selectedSeats, toggleSeatSelection, clearSeatSelection } = useStore();
  const [activeDeck, setActiveDeck] = useState<"LOWER" | "UPPER">("LOWER");

  const lowerSeats = bus.lowerDeckSeats || [];
  const upperSeats = bus.upperDeckSeats || [];
  const hasUpperDeck = bus.hasUpperDeck && upperSeats.length > 0;

  // Calculate live total for selected seats
  const selectedSeatDetails = [...lowerSeats, ...upperSeats].filter((s) =>
    selectedSeats.includes(s.seatNumber)
  );

  const totalFare = selectedSeatDetails.reduce(
    (sum, s) => sum + (s.currentPrice || trip.currentFare),
    0
  );

  // Group seats by rows for clean bus coach layout
  const currentDeckSeats = activeDeck === "LOWER" ? lowerSeats : upperSeats;
  const rows = Array.from(new Set(currentDeckSeats.map((s) => s.row))).sort(
    (a, b) => a - b
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {/* Header & Deck Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 dark:border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Select Seats</span>
            <span className="text-xs font-normal text-slate-500">
              ({bus.name} • {bus.registrationNumber})
            </span>
          </h3>
          <p className="text-xs text-slate-500">
            Click on available seats to reserve. Holds will be active for 5 minutes.
          </p>
        </div>

        {/* Deck Switcher tabs */}
        {hasUpperDeck && (
          <div className="flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
            <button
              type="button"
              onClick={() => setActiveDeck("LOWER")}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                activeDeck === "LOWER"
                  ? "bg-white text-blue-700 shadow-sm dark:bg-slate-700 dark:text-white"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              Lower Deck ({lowerSeats.length} Seats)
            </button>
            <button
              type="button"
              onClick={() => setActiveDeck("UPPER")}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                activeDeck === "UPPER"
                  ? "bg-white text-blue-700 shadow-sm dark:bg-slate-700 dark:text-white"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              Upper Deck ({upperSeats.length} Berths)
            </button>
          </div>
        )}
      </div>

      {/* Seat Color Legend */}
      <div className="my-4 flex flex-wrap items-center justify-center gap-4 rounded-xl bg-slate-50 p-3 text-xs dark:bg-slate-800/60">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded border border-slate-300 bg-white shadow-xs dark:border-slate-600 dark:bg-slate-800" />
          <span className="text-slate-600 dark:text-slate-300">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-emerald-500 text-white font-bold" />
          <span className="text-slate-600 dark:text-slate-300 font-semibold">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-slate-200 border border-slate-300 opacity-60 dark:bg-slate-700" />
          <span className="text-slate-400">Booked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded border border-pink-300 bg-pink-50 text-pink-700 dark:border-pink-800 dark:bg-pink-950/40" />
          <span className="text-slate-600 dark:text-slate-300">Ladies Only</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded border border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/40" />
          <span className="text-slate-600 dark:text-slate-300">On Hold</span>
        </div>
      </div>

      {/* Coach Layout Body */}
      <div className="flex justify-center py-4">
        <div className="relative w-full max-w-md rounded-3xl border-2 border-slate-300 bg-slate-50/50 p-6 shadow-inner dark:border-slate-700 dark:bg-slate-900/60">
          {/* Driver Cabin Front */}
          <div className="mb-6 flex items-center justify-between border-b-2 border-dashed border-slate-300 pb-3 dark:border-slate-700">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Front / Driver Cabin
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600 shadow-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200">
              {/* Steering wheel svg */}
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="3" />
                <path d="M12 3v6M12 15v6M3 12h6M15 12h6" />
              </svg>
            </div>
          </div>

          {/* Seat Grid by Rows */}
          <div className="space-y-3">
            {rows.map((rowNum) => {
              const rowSeats = currentDeckSeats.filter((s) => s.row === rowNum);
              return (
                <div key={rowNum} className="flex items-center justify-between gap-3">
                  {/* Left seats */}
                  <div className="flex items-center gap-2">
                    {rowSeats
                      .filter((s) => s.col <= 2)
                      .map((seat) => {
                        const isSelected = selectedSeats.includes(seat.seatNumber);
                        const isBooked = seat.status === "BOOKED";
                        const isLadies = seat.status === "LADIES";
                        const isHeld = seat.status === "HELD";
                        const isSleeper = seat.type === "SLEEPER";

                        return (
                          <button
                            key={seat.id}
                            type="button"
                            disabled={isBooked}
                            onClick={() => toggleSeatSelection(seat.seatNumber)}
                            className={`group relative flex items-center justify-center font-mono text-xs font-bold transition-all ${
                              isSleeper ? "h-14 w-11 rounded-lg" : "h-11 w-11 rounded-xl"
                            } ${
                              isSelected
                                ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/30 ring-2 ring-emerald-400 scale-105"
                                : isBooked
                                ? "cursor-not-allowed bg-slate-200 text-slate-400 dark:bg-slate-800 dark:text-slate-600"
                                : isLadies
                                ? "border-2 border-pink-400 bg-pink-50 text-pink-700 hover:bg-pink-100 dark:bg-pink-950/30 dark:text-pink-300"
                                : isHeld
                                ? "border-2 border-amber-400 bg-amber-50 text-amber-700 hover:bg-amber-100"
                                : "border border-slate-300 bg-white text-slate-700 hover:border-blue-500 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-blue-400"
                            }`}
                            title={`Seat ${seat.seatNumber} (${isSleeper ? "Sleeper" : "Seater"}) - ${formatCurrency(seat.currentPrice)}`}
                          >
                            <span>{seat.seatNumber}</span>
                            {/* Berth badge indicator */}
                            {isSleeper && (
                              <span className="absolute bottom-1 text-[8px] font-sans font-normal opacity-70">
                                Bed
                              </span>
                            )}
                          </button>
                        );
                      })}
                  </div>

                  {/* Aisle Space */}
                  <div className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                    Aisle
                  </div>

                  {/* Right seats */}
                  <div className="flex items-center gap-2">
                    {rowSeats
                      .filter((s) => s.col > 2)
                      .map((seat) => {
                        const isSelected = selectedSeats.includes(seat.seatNumber);
                        const isBooked = seat.status === "BOOKED";
                        const isLadies = seat.status === "LADIES";
                        const isHeld = seat.status === "HELD";
                        const isSleeper = seat.type === "SLEEPER";

                        return (
                          <button
                            key={seat.id}
                            type="button"
                            disabled={isBooked}
                            onClick={() => toggleSeatSelection(seat.seatNumber)}
                            className={`group relative flex items-center justify-center font-mono text-xs font-bold transition-all ${
                              isSleeper ? "h-14 w-11 rounded-lg" : "h-11 w-11 rounded-xl"
                            } ${
                              isSelected
                                ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/30 ring-2 ring-emerald-400 scale-105"
                                : isBooked
                                ? "cursor-not-allowed bg-slate-200 text-slate-400 dark:bg-slate-800 dark:text-slate-600"
                                : isLadies
                                ? "border-2 border-pink-400 bg-pink-50 text-pink-700 hover:bg-pink-100 dark:bg-pink-950/30 dark:text-pink-300"
                                : isHeld
                                ? "border-2 border-amber-400 bg-amber-50 text-amber-700 hover:bg-amber-100"
                                : "border border-slate-300 bg-white text-slate-700 hover:border-blue-500 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-blue-400"
                            }`}
                            title={`Seat ${seat.seatNumber} (${isSleeper ? "Sleeper" : "Seater"}) - ${formatCurrency(seat.currentPrice)}`}
                          >
                            <span>{seat.seatNumber}</span>
                            {isSleeper && (
                              <span className="absolute bottom-1 text-[8px] font-sans font-normal opacity-70">
                                Bed
                              </span>
                            )}
                          </button>
                        );
                      })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Coach Rear Indicator */}
          <div className="mt-6 border-t-2 border-dashed border-slate-300 pt-3 text-center text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:border-slate-700">
            Rear of Coach
          </div>
        </div>
      </div>

      {/* Selected Seats Bottom Action Bar */}
      <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50/70 p-4 dark:border-blue-900/50 dark:bg-blue-950/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Selected Seats:
              </span>
              {selectedSeats.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {selectedSeats.map((seatNum) => (
                    <span
                      key={seatNum}
                      className="inline-flex items-center rounded-lg bg-emerald-600 px-2 py-0.5 font-mono text-xs font-bold text-white shadow-xs"
                    >
                      {seatNum}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-xs text-slate-400 italic">None selected yet</span>
              )}
            </div>
            {selectedSeats.length > 0 && (
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                Total Fare: <strong className="text-sm font-bold text-slate-900 dark:text-white">{formatCurrency(totalFare)}</strong> (excl. taxes)
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            {selectedSeats.length > 0 && (
              <button
                type="button"
                onClick={clearSeatSelection}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                Clear
              </button>
            )}
            <button
              type="button"
              disabled={selectedSeats.length === 0}
              onClick={onContinue}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <span>Continue to Passenger Details</span>
              <Check className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
