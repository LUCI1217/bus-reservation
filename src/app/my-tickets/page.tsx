"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { DigitalTicket } from "@/components/ticket/DigitalTicket";
import { Ticket, AlertCircle, ChevronRight } from "lucide-react";

export default function MyTicketsPage() {
  const { bookings, currentUser } = useStore();
  const confirmedBookings = bookings.filter(
    (b) => b.userId === currentUser.id && b.bookingStatus === "CONFIRMED"
  );

  const [activeTicketPnr, setActiveTicketPnr] = useState<string>(
    confirmedBookings[0]?.pnr || ""
  );

  const activeBooking = confirmedBookings.find((b) => b.pnr === activeTicketPnr) || confirmedBookings[0];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
          Digital E-Tickets & Boarding Passes
        </h1>
        <p className="mt-1 text-xs text-slate-500">
          Official boarding passes with secure QR verification for upcoming journeys
        </p>
      </div>

      {confirmedBookings.length > 0 ? (
        <div className="space-y-6">
          {/* Multiple Ticket Selector Tabs if more than 1 ticket */}
          {confirmedBookings.length > 1 && (
            <div className="flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
              <span className="text-xs font-bold text-slate-400 self-center mr-2">
                Select Ticket:
              </span>
              {confirmedBookings.map((b) => (
                <button
                  key={b.pnr}
                  type="button"
                  onClick={() => setActiveTicketPnr(b.pnr)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                    activeBooking?.pnr === b.pnr
                      ? "bg-blue-600 text-white shadow-xs"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                  }`}
                >
                  {b.pnr} ({b.trip.route.origin} → {b.trip.route.destination})
                </button>
              ))}
            </div>
          )}

          {/* Active Ticket Card */}
          {activeBooking && <DigitalTicket booking={activeBooking} />}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
          <Ticket className="mx-auto h-12 w-12 text-slate-400" />
          <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-white">
            No Active Boarding Passes
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            You do not currently have any confirmed boarding tickets.
          </p>
          <Link
            href="/search"
            className="mt-5 inline-block rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm"
          >
            Find a Bus & Book
          </Link>
        </div>
      )}
    </div>
  );
}
