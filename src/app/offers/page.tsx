"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Tag, Copy, Check, Percent, Sparkles, ArrowRight } from "lucide-react";

export default function OffersPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const offers = [
    {
      code: "EXPLORE20",
      discount: "20% OFF",
      title: "First Ride Explorer",
      desc: "Save 20% on any intercity journey across all Volvo and Scania coaches. Max discount ₹300.",
      validity: "Valid until Nov 30, 2026",
      tag: "FEATURED",
    },
    {
      code: "FIRSTBUS",
      discount: "FLAT ₹150 OFF",
      title: "New Passenger Welcome",
      desc: "Get an instant flat ₹150 deduction on your very first bus reservation with OmniBus.",
      validity: "Valid for new signups",
      tag: "NEW USER",
    },
    {
      code: "FESTIVE10",
      discount: "10% OFF",
      title: "Festive Holiday Getaway",
      desc: "Enjoy 10% discount on round-trip and long-weekend weekend departures.",
      validity: "Valid on all routes",
      tag: "LIMITED TIME",
    },
  ];

  const handleCopy = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">
          <Tag className="h-3.5 w-3.5" />
          <span>Exclusive Promotions</span>
        </span>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Travel Offers & Discount Coupons
        </h1>
        <p className="mt-2 text-xs text-slate-500 max-w-md mx-auto">
          Apply these verified promotional codes during checkout to maximize your savings on intercity routes
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {offers.map((offer) => (
          <div
            key={offer.code}
            className="flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 transition hover:shadow-lg hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-black text-amber-800 dark:bg-amber-900/60 dark:text-amber-300">
                  {offer.tag}
                </span>
                <span className="font-mono text-xs text-slate-400">
                  {offer.validity}
                </span>
              </div>

              <p className="mt-4 font-mono text-2xl font-black text-blue-600 dark:text-blue-400">
                {offer.discount}
              </p>
              <h3 className="mt-1 text-base font-bold text-slate-900 dark:text-white">
                {offer.title}
              </h3>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                {offer.desc}
              </p>
            </div>

            <div className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-800">
              <div className="flex items-center justify-between rounded-xl border border-dashed border-slate-300 bg-slate-50 p-2 dark:border-slate-700 dark:bg-slate-800">
                <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200">
                  {offer.code}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(offer.code)}
                  className="flex items-center gap-1 rounded-lg bg-white px-2.5 py-1 text-[11px] font-bold text-blue-600 shadow-xs hover:bg-blue-50 dark:bg-slate-700 dark:text-blue-300"
                >
                  {copiedCode === offer.code ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-600" />
                      <span className="text-emerald-600">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <Link
                href="/search"
                className="mt-3 flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 py-2.5 text-xs font-bold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 transition"
              >
                <span>Book With This Code</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
