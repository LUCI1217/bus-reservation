"use client";

import React from "react";
import { Clock, AlertTriangle, ShieldCheck } from "lucide-react";
import { useStore } from "@/lib/store";

export function HoldTimerBanner() {
  const { holdSecondsLeft, selectedSeats } = useStore();

  if (selectedSeats.length === 0) return null;

  const minutes = Math.floor(holdSecondsLeft / 60);
  const seconds = holdSecondsLeft % 60;
  const timeFormatted = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  const isExpiringSoon = holdSecondsLeft <= 60;
  const isExpired = holdSecondsLeft === 0;

  if (isExpired) {
    return (
      <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-red-800 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          <p className="text-sm font-bold">Seat Hold Expired</p>
        </div>
        <p className="mt-1 text-xs">
          Your reservation timer has timed out. Please reselect your preferred seats to continue booking.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`rounded-xl border p-3.5 transition-all ${
        isExpiringSoon
          ? "border-amber-400 bg-amber-50 text-amber-900 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-200 animate-pulse"
          : "border-blue-200 bg-blue-50/80 text-blue-900 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-200"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-lg ${
              isExpiringSoon ? "bg-amber-200 text-amber-800" : "bg-blue-200 text-blue-800"
            }`}
          >
            <Clock className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs font-semibold">
              {isExpiringSoon
                ? "Hurry! Your seat hold is about to expire"
                : "Seats Temporarily Locked"}
            </p>
            <p className="text-[11px] opacity-80">
              Reserved exclusively for you while you complete passenger details & payment.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-sm font-bold sm:justify-end">
          <span className="text-xs font-sans font-normal opacity-80">Hold Timer:</span>
          <span
            className={`rounded-md px-2 py-0.5 text-base tracking-wider ${
              isExpiringSoon
                ? "bg-amber-500 text-white"
                : "bg-blue-600 text-white"
            }`}
          >
            {timeFormatted}
          </span>
        </div>
      </div>
    </div>
  );
}
