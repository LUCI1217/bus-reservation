"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useStore } from "@/lib/store";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  BookmarkCheck,
  Search,
  Download,
  Filter,
  CheckCircle2,
  XCircle,
  Eye,
  Trash2,
  Ticket,
} from "lucide-react";

export default function AdminBookingsPage() {
  const { bookings, cancelBooking } = useStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedBookingForModal, setSelectedBookingForModal] = useState<(typeof bookings)[0] | null>(null);

  const filtered = bookings.filter((b) => {
    const matchesSearch =
      b.pnr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.trip.route.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.trip.route.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.trip.bus.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || b.bookingStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const exportToCsv = () => {
    const headers = "PNR,PassengerName,Email,Route,Date,Seats,Amount,BookingStatus,PaymentStatus\n";
    const rows = filtered
      .map(
        (b) =>
          `"${b.pnr}","${b.user.name}","${b.user.email}","${b.trip.route.origin} - ${b.trip.route.destination}","${b.trip.travelDate}","${b.selectedSeats.join(" ")}",${b.finalTotal},"${b.bookingStatus}","${b.paymentStatus}"`
      )
      .join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `OmniBus_Bookings_Manifest_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AdminLayout
      title="Bookings & Manifest Control"
      subtitle="Search passenger reservations by PNR, monitor payment status, cancel bookings, and export manifests to CSV"
      action={
        <button
          type="button"
          onClick={exportToCsv}
          className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition"
        >
          <Download className="h-4 w-4" />
          <span>Export CSV</span>
        </button>
      }
    >
      {/* Search and Filter Controls */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by PNR, passenger name, route, or bus..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 focus:outline-none"
          >
            <option value="ALL">All Statuses ({bookings.length})</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-500 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-400">
              <tr>
                <th className="p-4">PNR / Ref</th>
                <th className="p-4">Passenger Details</th>
                <th className="p-4">Assigned Coach & Route</th>
                <th className="p-4">Seats Reserved</th>
                <th className="p-4">Gross Fare</th>
                <th className="p-4">Booking Status</th>
                <th className="p-4">Payment</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="p-4 font-mono font-bold text-slate-900 dark:text-white">
                    {b.pnr}
                  </td>
                  <td className="p-4">
                    <p className="font-bold text-slate-900 dark:text-white">{b.user.name}</p>
                    <p className="text-[11px] text-slate-400">{b.user.email}</p>
                  </td>
                  <td className="p-4">
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {b.trip.bus.name}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {b.trip.route.origin} → {b.trip.route.destination}
                    </p>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {b.selectedSeats.map((s) => (
                        <span
                          key={s}
                          className="rounded bg-blue-100 px-1.5 py-0.2 font-mono text-[10px] font-bold text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 font-mono font-bold text-slate-900 dark:text-white">
                    {formatCurrency(b.finalTotal)}
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        b.bookingStatus === "CONFIRMED"
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                          : "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300"
                      }`}
                    >
                      {b.bookingStatus}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`rounded px-1.5 py-0.5 text-[10px] font-mono font-bold ${
                        b.paymentStatus === "PAID"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {b.paymentStatus}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/confirmation/${b.pnr}`}
                        className="rounded-lg p-1.5 text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition"
                        title="View Public Digital Boarding Pass"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>

                      {b.bookingStatus === "CONFIRMED" && (
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Cancel booking ${b.pnr} and refund payment?`)) {
                              cancelBooking(b.pnr);
                            }
                          }}
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 transition"
                          title="Cancel Booking & Refund"
                        >
                          <XCircle className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
