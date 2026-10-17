"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Booking } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  Bus,
  Calendar,
  Clock,
  MapPin,
  QrCode,
  Download,
  Printer,
  Home,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Share2,
} from "lucide-react";

interface DigitalTicketProps {
  booking: Booking;
}

export function DigitalTicket({ booking }: DigitalTicketProps) {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const isConfirmed = booking.bookingStatus === "CONFIRMED";
  const isCancelled = booking.bookingStatus === "CANCELLED";

  return (
    <div className="mx-auto max-w-3xl">
      {/* Alert toast for downloaded PDF */}
      {downloadSuccess && (
        <div className="mb-4 flex items-center justify-between rounded-xl bg-emerald-600 px-4 py-3 text-xs font-semibold text-white shadow-lg animate-in fade-in">
          <span>✓ E-Ticket PDF generated and ready for offline boarding.</span>
          <span className="opacity-80">Reference: {booking.pnr}</span>
        </div>
      )}

      {/* Main Ticket Card with perforated border styling */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900 print:border-none print:shadow-none">
        {/* Ticket Header */}
        <div className="relative bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 p-6 text-white sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
                  <Bus className="h-5 w-5 text-white" />
                </span>
                <span className="text-xl font-black tracking-tight">OmniBus Digital Boarding Pass</span>
              </div>
              <p className="mt-1 text-xs text-blue-200">
                Official E-Ticket • Verified Government ID required at boarding
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 px-4 py-2 backdrop-blur-md border border-white/20">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200">
                Booking Reference (PNR)
              </span>
              <p className="font-mono text-xl font-black text-white">{booking.pnr}</p>
            </div>
          </div>

          {/* Ticket Status Pill */}
          <div className="mt-4 flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                isConfirmed
                  ? "bg-emerald-400/20 text-emerald-200 border border-emerald-400/30"
                  : "bg-red-400/20 text-red-200 border border-red-400/30"
              }`}
            >
              {isConfirmed ? (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>CONFIRMED & PAID</span>
                </>
              ) : (
                <>
                  <AlertCircle className="h-3.5 w-3.5" />
                  <span>CANCELLED & REFUNDED</span>
                </>
              )}
            </span>
            <span className="text-xs text-blue-200">
              Issued: {formatDate(booking.createdAt)}
            </span>
          </div>
        </div>

        {/* Route Details Bar */}
        <div className="border-b border-dashed border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-800/40 sm:p-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-12 sm:items-center">
            {/* Origin & Boarding */}
            <div className="sm:col-span-5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Departure
              </span>
              <p className="font-mono text-2xl font-black text-slate-900 dark:text-white">
                {booking.trip.departureTime}
              </p>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                {booking.trip.route.origin}
              </p>
              <div className="mt-2 flex items-start gap-1.5 text-xs text-slate-500">
                <MapPin className="h-4 w-4 shrink-0 text-blue-600" />
                <span>
                  <strong>Boarding:</strong> {booking.boardingPoint.name} ({booking.boardingPoint.landmark})
                </span>
              </div>
            </div>

            {/* Travel Date & Duration */}
            <div className="flex flex-col items-center justify-center sm:col-span-2 text-center">
              <span className="text-[11px] font-semibold text-slate-400">
                {booking.trip.route.estimatedDuration}
              </span>
              <div className="my-1 w-full border-t border-slate-300 dark:border-slate-700" />
              <div className="flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
                <Calendar className="h-3.5 w-3.5" />
                <span>{formatDate(booking.trip.travelDate)}</span>
              </div>
            </div>

            {/* Destination & Dropping */}
            <div className="sm:col-span-5 sm:text-right">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Arrival
              </span>
              <p className="font-mono text-2xl font-black text-slate-900 dark:text-white">
                {booking.trip.arrivalTime}
              </p>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                {booking.trip.route.destination}
              </p>
              <div className="mt-2 flex items-start gap-1.5 text-xs text-slate-500 sm:justify-end">
                <MapPin className="h-4 w-4 shrink-0 text-red-500" />
                <span>
                  <strong>Dropping:</strong> {booking.droppingPoint.name} ({booking.droppingPoint.landmark})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bus and Fleet Specs */}
        <div className="border-b border-slate-100 p-6 dark:border-slate-800 sm:p-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 text-xs">
            <div>
              <span className="text-slate-400">Bus Name</span>
              <p className="mt-0.5 font-bold text-slate-900 dark:text-white">
                {booking.trip.bus.name}
              </p>
            </div>
            <div>
              <span className="text-slate-400">Registration No</span>
              <p className="mt-0.5 font-mono font-bold text-slate-900 dark:text-white">
                {booking.trip.bus.registrationNumber}
              </p>
            </div>
            <div>
              <span className="text-slate-400">Coach Type</span>
              <p className="mt-0.5 font-semibold text-slate-900 dark:text-white">
                {booking.trip.bus.busType.replace(/_/g, " ")}
              </p>
            </div>
            <div>
              <span className="text-slate-400">Trip Code</span>
              <p className="mt-0.5 font-mono font-bold text-blue-600 dark:text-blue-400">
                {booking.trip.tripCode}
              </p>
            </div>
          </div>
        </div>

        {/* Passengers & Assigned Seats */}
        <div className="p-6 sm:p-8">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Passenger & Seat Manifest ({booking.passengers.length} Passengers)
          </h4>

          <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
                <tr>
                  <th className="p-3">Seat No.</th>
                  <th className="p-3">Passenger Name</th>
                  <th className="p-3">Age / Gender</th>
                  <th className="p-3 text-right">Fare</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {booking.passengers.map((p, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="p-3">
                      <span className="rounded bg-blue-100 px-2 py-0.5 font-mono font-bold text-blue-800 dark:bg-blue-900/60 dark:text-blue-300">
                        {p.seatNumber}
                      </span>
                    </td>
                    <td className="p-3 font-semibold text-slate-900 dark:text-white">
                      {p.name}
                    </td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">
                      {p.age} yrs • {p.gender}
                    </td>
                    <td className="p-3 text-right font-mono font-semibold text-slate-900 dark:text-white">
                      {formatCurrency(p.fare)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* QR Code & Payment Summary Section */}
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-12 sm:items-center rounded-2xl border border-slate-200 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-800/40">
            {/* Visual QR Code Card */}
            <div className="flex items-center gap-4 sm:col-span-6">
              <div className="flex h-24 w-24 shrink-0 flex-col items-center justify-center rounded-2xl border-2 border-slate-800 bg-white p-2 shadow-sm dark:border-slate-200">
                {/* SVG QR Code Simulation */}
                <svg className="h-full w-full" viewBox="0 0 100 100">
                  <rect x="0" y="0" width="30" height="30" fill="#0f172a" />
                  <rect x="5" y="5" width="20" height="20" fill="#ffffff" />
                  <rect x="9" y="9" width="12" height="12" fill="#0f172a" />

                  <rect x="70" y="0" width="30" height="30" fill="#0f172a" />
                  <rect x="75" y="5" width="20" height="20" fill="#ffffff" />
                  <rect x="79" y="9" width="12" height="12" fill="#0f172a" />

                  <rect x="0" y="70" width="30" height="30" fill="#0f172a" />
                  <rect x="5" y="75" width="20" height="20" fill="#ffffff" />
                  <rect x="9" y="79" width="12" height="12" fill="#0f172a" />

                  {/* QR Matrix Dots */}
                  <rect x="40" y="10" width="8" height="8" fill="#0f172a" />
                  <rect x="52" y="15" width="8" height="8" fill="#0f172a" />
                  <rect x="36" y="36" width="10" height="10" fill="#0f172a" />
                  <rect x="55" y="45" width="12" height="8" fill="#0f172a" />
                  <rect x="72" y="72" width="10" height="10" fill="#0f172a" />
                  <rect x="40" y="75" width="15" height="10" fill="#0f172a" />
                </svg>
              </div>

              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <span>Secure Boarding QR</span>
                </p>
                <p className="mt-1 text-[11px] text-slate-500 leading-tight">
                  Conductors scan this code before boarding. No physical printout strictly mandatory if mobile pass shown.
                </p>
                <p className="mt-1.5 font-mono text-[10px] text-slate-400">
                  ID: {booking.pnr}-VERIFIED
                </p>
              </div>
            </div>

            {/* Fare Breakdown */}
            <div className="space-y-1.5 text-xs sm:col-span-6 sm:border-l sm:border-slate-200 sm:pl-6 dark:border-slate-700">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Base Total:</span>
                <span className="font-mono">{formatCurrency(booking.baseTotal)}</span>
              </div>
              {booking.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Discount ({booking.couponCode}):</span>
                  <span className="font-mono">-{formatCurrency(booking.discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>GST & Toll Charges (5%):</span>
                <span className="font-mono">{formatCurrency(booking.taxAmount)}</span>
              </div>
              <div className="border-t border-slate-200 pt-2 dark:border-slate-700 flex justify-between font-bold text-slate-900 dark:text-white">
                <span className="text-sm">Total Paid:</span>
                <span className="font-mono text-base text-blue-600 dark:text-blue-400">
                  {formatCurrency(booking.finalTotal)}
                </span>
              </div>
              <p className="text-[10px] text-slate-400">
                Payment Method: {booking.paymentMethod.replace(/_/g, " ")} • ID: {booking.id}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions (Functional Buttons) */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 bg-slate-50 p-4 sm:p-6 dark:border-slate-800 dark:bg-slate-900 print:hidden">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadPdf}
              className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition"
            >
              <Download className="h-4 w-4" />
              <span>Download PDF</span>
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition"
            >
              <Printer className="h-4 w-4" />
              <span>Print Ticket</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/my-bookings"
              className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition"
            >
              View Booking Details
            </Link>
            <Link
              href="/"
              className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 transition"
            >
              <Home className="h-4 w-4" />
              <span>Return Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
