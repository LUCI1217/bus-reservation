"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { formatCurrency, formatDate } from "@/lib/utils";
import { HoldTimerBanner } from "@/components/bus/HoldTimerBanner";
import {
  ShieldCheck,
  CreditCard,
  Smartphone,
  Building,
  CheckCircle2,
  Tag,
  MapPin,
  Clock,
  Calendar,
  AlertCircle,
  Lock,
} from "lucide-react";
import { Booking } from "@/types";

export default function CheckoutPage() {
  const router = useRouter();
  const {
    currentUser,
    selectedTrip,
    selectedSeats,
    passengers,
    updatePassenger,
    selectedBoardingPoint,
    setSelectedBoardingPoint,
    selectedDroppingPoint,
    setSelectedDroppingPoint,
    couponCode,
    discountAmount,
    applyCoupon,
    removeCoupon,
    createBooking,
    holdSecondsLeft,
  } = useStore();

  const [inputCoupon, setInputCoupon] = useState("");
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<Booking["paymentMethod"]>("DEMO_PAY");
  const [agreedTerms, setAgreedTerms] = useState(true);
  const [contactEmail, setContactEmail] = useState(currentUser.email);
  const [contactPhone, setContactPhone] = useState(currentUser.phone);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If no trip or no seats selected, show warning
  if (!selectedTrip || selectedSeats.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 dark:bg-amber-950/40">
          <AlertCircle className="h-8 w-8" />
        </div>
        <h2 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">
          No Seats Selected
        </h2>
        <p className="mt-2 text-xs text-slate-500">
          Please select your seats on an active route before proceeding to checkout.
        </p>
        <Link
          href="/search"
          className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-blue-700"
        >
          Browse Available Buses
        </Link>
      </div>
    );
  }

  const trip = selectedTrip;
  const boardingPoints = trip.route.boardingPoints;
  const droppingPoints = trip.route.droppingPoints;

  const currentBoarding = selectedBoardingPoint || boardingPoints[0];
  const currentDropping = selectedDroppingPoint || droppingPoints[0];

  const baseFareTotal = trip.currentFare * selectedSeats.length;
  const taxAmount = Math.round((baseFareTotal - discountAmount) * 0.05);
  const finalTotal = Math.max(0, baseFareTotal - discountAmount + taxAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon) return;
    const res = applyCoupon(inputCoupon);
    setCouponFeedback(res);
  };

  const handleConfirmAndPay = (e: React.FormEvent) => {
    e.preventDefault();
    if (holdSecondsLeft === 0) {
      alert("Your hold has expired. Please reselect your seats.");
      router.push(`/seat-selection/${trip.id}`);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newBooking = createBooking(paymentMethod);
      setIsSubmitting(false);
      router.push(`/confirmation/${newBooking.pnr}`);
    }, 600);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Hold Banner */}
      <div className="mb-6">
        <HoldTimerBanner />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Passenger Info & Payment Method (Col 7) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Passenger Information Cards */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center justify-between">
              <span>Passenger Information</span>
              <span className="text-xs font-mono font-semibold text-blue-600">
                {selectedSeats.length} {selectedSeats.length === 1 ? "Passenger" : "Passengers"}
              </span>
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Names must match official photo IDs presented at boarding.
            </p>

            <div className="mt-5 space-y-4">
              {selectedSeats.map((seatNum, idx) => {
                const passenger = passengers[idx] || {
                  seatNumber: seatNum,
                  name: currentUser.name,
                  age: 28,
                  gender: "MALE",
                  fare: trip.currentFare,
                };

                return (
                  <div
                    key={seatNum}
                    className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-800/40"
                  >
                    <div className="flex items-center justify-between border-b border-slate-200/60 pb-2 dark:border-slate-700/60">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                        Passenger #{idx + 1}
                      </span>
                      <span className="rounded-md bg-blue-100 px-2 py-0.5 font-mono text-xs font-black text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        Seat: {seatNum}
                      </span>
                    </div>

                    <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-12">
                      <div className="sm:col-span-6">
                        <label className="block text-[11px] font-semibold text-slate-500">
                          Full Legal Name
                        </label>
                        <input
                          type="text"
                          required
                          value={passenger.name}
                          onChange={(e) =>
                            updatePassenger(idx, "name", e.target.value)
                          }
                          placeholder="e.g. Alex Johnson"
                          className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label className="block text-[11px] font-semibold text-slate-500">
                          Age (Years)
                        </label>
                        <input
                          type="number"
                          required
                          min="1"
                          max="110"
                          value={passenger.age}
                          onChange={(e) =>
                            updatePassenger(idx, "age", Number(e.target.value))
                          }
                          className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label className="block text-[11px] font-semibold text-slate-500">
                          Gender
                        </label>
                        <select
                          value={passenger.gender}
                          onChange={(e) =>
                            updatePassenger(idx, "gender", e.target.value as any)
                          }
                          className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-xs font-semibold text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        >
                          <option value="MALE">Male</option>
                          <option value="FEMALE">Female</option>
                          <option value="OTHER">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Boarding and Dropping Points Selector */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Boarding & Dropping Points
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Select where you wish to board and alight from the coach.
            </p>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Boarding Point ({trip.route.origin})
                </label>
                <select
                  value={currentBoarding.id}
                  onChange={(e) => {
                    const bp = boardingPoints.find((p) => p.id === e.target.value);
                    if (bp) setSelectedBoardingPoint(bp);
                  }}
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 p-2.5 text-xs font-semibold text-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  {boardingPoints.map((bp) => (
                    <option key={bp.id} value={bp.id}>
                      {bp.name} (+{bp.timeOffsetMinutes}m) - {bp.landmark}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Dropping Point ({trip.route.destination})
                </label>
                <select
                  value={currentDropping.id}
                  onChange={(e) => {
                    const dp = droppingPoints.find((p) => p.id === e.target.value);
                    if (dp) setSelectedDroppingPoint(dp);
                  }}
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 p-2.5 text-xs font-semibold text-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  {droppingPoints.map((dp) => (
                    <option key={dp.id} value={dp.id}>
                      {dp.name} - {dp.landmark}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Ticket Delivery & Contact
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              E-tickets and SMS travel alerts will be sent here.
            </p>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  required
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Payment Method (Demo Mode)
              </h3>
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                Sandbox Environment Active
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Select your simulated payment option. No real cards will be charged.
            </p>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                {
                  id: "DEMO_PAY",
                  label: "Demo One-Click Pay",
                  desc: "Instant sandbox verification",
                  icon: ShieldCheck,
                },
                {
                  id: "UPI",
                  label: "UPI / QR Simulation",
                  desc: "GPay, PhonePe, Paytm sandbox",
                  icon: Smartphone,
                },
                {
                  id: "CREDIT_CARD",
                  label: "Credit / Debit Card",
                  desc: "Visa / Mastercard sandbox",
                  icon: CreditCard,
                },
                {
                  id: "NET_BANKING",
                  label: "Net Banking",
                  desc: "Major banks sandbox",
                  icon: Building,
                },
              ].map((m) => {
                const Icon = m.icon;
                const isSelected = paymentMethod === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id as any)}
                    className={`flex items-start gap-3 rounded-xl border p-3.5 text-left transition ${
                      isSelected
                        ? "border-blue-600 bg-blue-50/70 dark:border-blue-500 dark:bg-blue-950/40"
                        : "border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800"
                    }`}
                  >
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                        isSelected
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">
                        {m.label}
                      </p>
                      <p className="text-[11px] text-slate-500">{m.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary & Coupon (Col 5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Trip Booking Summary
            </h3>

            {/* Coach & Route info */}
            <div className="mt-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white">
                  {trip.bus.name}
                </span>
                <span className="font-mono text-xs text-blue-600 dark:text-blue-400 font-bold">
                  {trip.tripCode}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {trip.route.origin} → {trip.route.destination}
              </p>

              <div className="mt-3 flex items-center justify-between border-t border-slate-200/60 pt-2 text-xs text-slate-600 dark:border-slate-700/60 dark:text-slate-300">
                <span>Date: {formatDate(trip.travelDate)}</span>
                <span className="font-mono font-bold">{trip.departureTime}</span>
              </div>
            </div>

            {/* Selected Seats Pills */}
            <div className="mt-4">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Assigned Seats ({selectedSeats.length})
              </span>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {selectedSeats.map((s) => (
                  <span
                    key={s}
                    className="rounded-md bg-blue-100 px-2 py-0.5 font-mono text-xs font-bold text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Promo Code Form */}
            <div className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-800">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Have a Promo Code?
              </label>
              {couponCode ? (
                <div className="mt-2 flex items-center justify-between rounded-xl bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  <span>Code Applied: {couponCode} (-{formatCurrency(discountAmount)})</span>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="text-[11px] underline hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="mt-2 flex gap-2">
                  <input
                    type="text"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    placeholder="e.g. EXPLORE20"
                    className="w-full rounded-xl border border-slate-300 px-3 py-1.5 font-mono text-xs uppercase focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                  <button
                    type="submit"
                    className="rounded-xl bg-slate-900 px-4 py-1.5 text-xs font-bold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 transition"
                  >
                    Apply
                  </button>
                </form>
              )}

              {couponFeedback && !couponCode && (
                <p className="mt-1.5 text-[11px] text-red-600 font-medium">
                  {couponFeedback.message}
                </p>
              )}
            </div>

            {/* Fare Breakdown */}
            <div className="mt-6 space-y-2.5 border-t border-slate-100 pt-4 text-xs dark:border-slate-800">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Base Fare ({selectedSeats.length} × {formatCurrency(trip.currentFare)}):</span>
                <span className="font-mono">{formatCurrency(baseFareTotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between font-semibold text-emerald-600">
                  <span>Coupon Discount ({couponCode}):</span>
                  <span className="font-mono">-{formatCurrency(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>GST & Tolls (5%):</span>
                <span className="font-mono">{formatCurrency(taxAmount)}</span>
              </div>

              <div className="flex items-center justify-between border-t border-slate-200 pt-3 text-sm font-bold text-slate-900 dark:text-white">
                <span>Final Payable Amount:</span>
                <span className="font-mono text-xl text-blue-600 dark:text-blue-400 font-black">
                  {formatCurrency(finalTotal)}
                </span>
              </div>
            </div>

            {/* Terms Agreement Checkbox */}
            <div className="mt-6">
              <label className="flex items-start gap-2 cursor-pointer text-xs text-slate-600 dark:text-slate-400">
                <input
                  type="checkbox"
                  checked={agreedTerms}
                  onChange={(e) => setAgreedTerms(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span>
                  I agree to the{" "}
                  <Link href="/terms" className="text-blue-600 underline">
                    Terms of Carriage
                  </Link>{" "}
                  and{" "}
                  <Link href="/terms" className="text-blue-600 underline">
                    Cancellation Policy
                  </Link>
                  .
                </span>
              </label>
            </div>

            {/* Final Submit CTA */}
            <button
              type="button"
              disabled={!agreedTerms || isSubmitting}
              onClick={handleConfirmAndPay}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 text-sm font-black text-white shadow-lg shadow-blue-500/25 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 transition active:scale-98"
            >
              <Lock className="h-4 w-4" />
              <span>
                {isSubmitting
                  ? "Processing Confirmation..."
                  : `Pay & Confirm ${formatCurrency(finalTotal)}`}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
