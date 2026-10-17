"use client";

import React, { use } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { DigitalTicket } from "@/components/ticket/DigitalTicket";
import { CheckCircle2, ArrowLeft, Home, Calendar, AlertCircle } from "lucide-react";

export default function ConfirmationPage({
  params,
}: {
  params: Promise<{ pnr: string }>;
}) {
  const resolvedParams = use(params);
  const { bookings } = useStore();

  const booking = bookings.find((b) => b.pnr === resolvedParams.pnr);

  if (!booking) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
          <AlertCircle className="h-8 w-8" />
        </div>
        <h2 className="mt-4 text-2xl font-bold">Booking Not Found</h2>
        <p className="mt-1 text-xs text-slate-500">
          No confirmed reservation could be found for reference #{resolvedParams.pnr}.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Celebration Header */}
      <div className="mb-8 text-center print:hidden">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 shadow-md shadow-emerald-500/10">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          Booking Confirmed!
        </h1>
        <p className="mt-1 text-xs text-slate-500">
          Your reservation is verified. We have sent the digital ticket & boarding pass to{" "}
          <strong className="text-slate-700 dark:text-slate-300">{booking.user.email}</strong>.
        </p>
      </div>

      {/* Digital Ticket Boarding Pass */}
      <DigitalTicket booking={booking} />
    </div>
  );
}
