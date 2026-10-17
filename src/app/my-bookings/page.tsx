"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  Calendar,
  Clock,
  MapPin,
  Ticket,
  AlertCircle,
  CheckCircle2,
  XCircle,
  ChevronRight,
  RotateCcw,
} from "lucide-react";

export default function MyBookingsPage() {
  const { bookings, cancelBooking, currentUser } = useStore();
  const [activeTab, setActiveTab] = useState<"ALL" | "CONFIRMED" | "CANCELLED">("ALL");
  const [cancellingPnr, setCancellingPnr] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const userBookings = bookings.filter((b) => b.userId === currentUser.id);

  const displayedBookings = userBookings.filter((b) => {
    if (activeTab === "CONFIRMED") return b.bookingStatus === "CONFIRMED";
    if (activeTab === "CANCELLED") return b.bookingStatus === "CANCELLED";
    return true;
  });

  const handleConfirmCancel = (pnr: string) => {
    const success = cancelBooking(pnr);
    if (success) {
      setSuccessToast(`Booking #${pnr} cancelled. Refund of fare initiated.`);
      setTimeout(() => setSuccessToast(null), 4000);
    }
    setCancellingPnr(null);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            My Bookings
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            View booking records, download boarding passes, or manage cancellations
          </p>
        </div>

        {/* Status Tabs */}
        <div className="flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
          {(["ALL", "CONFIRMED", "CANCELLED"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                activeTab === tab
                  ? "bg-white text-blue-700 shadow-xs dark:bg-slate-700 dark:text-white"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              {tab === "ALL" ? "All Bookings" : tab.charAt(0) + tab.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {successToast && (
        <div className="mt-4 flex items-center justify-between rounded-xl bg-emerald-600 p-3 text-xs font-semibold text-white shadow-sm">
          <span>{successToast}</span>
          <button onClick={() => setSuccessToast(null)}>✕</button>
        </div>
      )}

      {/* Bookings List */}
      <div className="mt-6 space-y-4">
        {displayedBookings.length > 0 ? (
          displayedBookings.map((booking) => {
            const isConfirmed = booking.bookingStatus === "CONFIRMED";
            const isCancelled = booking.bookingStatus === "CANCELLED";

            return (
              <div
                key={booking.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900 transition hover:shadow-md"
              >
                <div className="p-5 sm:p-6">
                  {/* Top Row: PNR & Status */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-base font-black text-slate-900 dark:text-white">
                        {booking.pnr}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                          isConfirmed
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                            : "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400"
                        }`}
                      >
                        {isConfirmed ? (
                          <>
                            <CheckCircle2 className="h-3 w-3" />
                            <span>CONFIRMED</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="h-3 w-3" />
                            <span>CANCELLED</span>
                          </>
                        )}
                      </span>
                    </div>

                    <span className="text-xs text-slate-400">
                      Booked on: {formatDate(booking.createdAt)}
                    </span>
                  </div>

                  {/* Trip Details Row */}
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-12 sm:items-center">
                    <div className="sm:col-span-4">
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        {booking.trip.bus.name}
                      </p>
                      <p className="text-xs text-slate-500 font-mono">
                        {booking.trip.bus.registrationNumber} • {booking.trip.bus.busType.replace(/_/g, " ")}
                      </p>
                    </div>

                    <div className="sm:col-span-5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800 dark:text-slate-200 text-xs">
                          {booking.trip.route.origin}
                        </span>
                        <span className="text-slate-400 text-xs">→</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200 text-xs">
                          {booking.trip.route.destination}
                        </span>
                      </div>
                      <p className="mt-0.5 text-[11px] text-slate-500">
                        Date: {formatDate(booking.trip.travelDate)} • Departs: {booking.trip.departureTime}
                      </p>
                      <div className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-500">
                        <span>Seats:</span>
                        <div className="flex gap-1">
                          {booking.selectedSeats.map((s) => (
                            <span
                              key={s}
                              className="rounded bg-blue-100 px-1.5 py-0.2 font-mono text-[10px] font-bold text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="sm:col-span-3 sm:text-right">
                      <span className="text-[11px] text-slate-400">Amount Paid</span>
                      <p className="font-mono text-lg font-black text-slate-900 dark:text-white">
                        {formatCurrency(booking.finalTotal)}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/confirmation/${booking.pnr}`}
                        className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition"
                      >
                        <Ticket className="h-3.5 w-3.5" />
                        <span>View Boarding Ticket</span>
                      </Link>
                    </div>

                    {isConfirmed && (
                      <div>
                        {cancellingPnr === booking.pnr ? (
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-red-600 font-semibold">
                              Confirm Cancel?
                            </span>
                            <button
                              type="button"
                              onClick={() => handleConfirmCancel(booking.pnr)}
                              className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-red-700"
                            >
                              Yes, Cancel
                            </button>
                            <button
                              type="button"
                              onClick={() => setCancellingPnr(null)}
                              className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs text-slate-600"
                            >
                              Keep
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setCancellingPnr(booking.pnr)}
                            className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-700 hover:bg-red-100 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300 transition"
                          >
                            Cancel Ticket
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
            <Ticket className="mx-auto h-12 w-12 text-slate-400" />
            <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-white">
              No Bookings Found
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              You haven&apos;t booked any bus trips under this filter yet.
            </p>
            <Link
              href="/search"
              className="mt-4 inline-block rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white"
            >
              Search Buses & Book
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
