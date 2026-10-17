import React from "react";
import Link from "next/link";
import { ShieldCheck, FileText, ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Home</span>
        </Link>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          Terms of Service & Cancellation Policy
        </h1>
        <p className="mt-1 text-xs text-slate-500">
          Last revised: October 2026 • OmniBus Technologies Inc.
        </p>
      </div>

      <div className="space-y-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xs dark:border-slate-800 dark:bg-slate-900 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
        {/* Section 1: Cancellation Slabs */}
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            1. Official Cancellation & Refund Policy
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            OmniBus operates an automated refund system governed by departure departure cut-offs:
          </p>

          <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 dark:bg-slate-800">
                <tr>
                  <th className="p-3">Time Window Before Departure</th>
                  <th className="p-3">Refund Eligibility</th>
                  <th className="p-3">Deduction</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                <tr>
                  <td className="p-3 font-sans font-medium">More than 24 hours prior</td>
                  <td className="p-3 text-emerald-600 font-bold">90% of base fare</td>
                  <td className="p-3 text-slate-400">10% cancellation charge</td>
                </tr>
                <tr>
                  <td className="p-3 font-sans font-medium">Between 12 to 24 hours prior</td>
                  <td className="p-3 text-amber-600 font-bold">50% of base fare</td>
                  <td className="p-3 text-slate-400">50% cancellation charge</td>
                </tr>
                <tr>
                  <td className="p-3 font-sans font-medium">Less than 12 hours prior</td>
                  <td className="p-3 text-red-600 font-bold">0% (Non-refundable)</td>
                  <td className="p-3 text-slate-400">100% cancellation charge</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 2: Seat Holds */}
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            2. Real-Time Seat Holds & Fair Inventory Access
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            To prevent double-booking while ensuring equitable access to seats, users receive a strict 5-minute temporary reservation upon proceeding to checkout. If the transaction is not completed within 300 seconds, the held inventory is released back into the public availability pool automatically.
          </p>
        </div>

        {/* Section 3: Dynamic Pricing */}
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            3. Dynamic Pricing & Multiplier Transparency
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Fares are dynamically determined by coach operator rules based on remaining seat thresholds and booking demand. All applied surge multipliers are computed by trusted server algorithms. Once a seat is locked during active checkout, the quoted price is guaranteed not to change for the duration of the 5-minute hold.
          </p>
        </div>

        {/* Section 4: Boarding Pass & QR Security */}
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            4. Boarding Passes and QR Verification
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Boarding requires presenting an authentic OmniBus digital boarding pass with a readable QR code along with an official government-issued photo identity card. Cancelled or refunded tickets are automatically invalidated on our verification system and cannot be used for coach entry.
          </p>
        </div>
      </div>
    </div>
  );
}
