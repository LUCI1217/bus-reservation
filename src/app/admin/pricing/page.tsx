"use client";

import React, { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import {
  BadgePercent,
  Sliders,
  TrendingUp,
  DollarSign,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";

export default function AdminPricingPage() {
  const { pricingRules, updatePricingRule } = useStore();
  const [activeRuleId, setActiveRuleId] = useState(pricingRules[0]?.id || "rule-standard");

  const currentRule = pricingRules.find((r) => r.id === activeRuleId) || pricingRules[0];

  // Simulator State
  const [simSeatsRemaining, setSimSeatsRemaining] = useState<number>(12);
  const [simBaseFare, setSimBaseFare] = useState<number>(currentRule.baseFare);
  const [simIsWeekend, setSimIsWeekend] = useState<boolean>(false);

  // Dynamic Simulator Fare Calculation
  const calculateSimulatedFare = () => {
    let multiplier = 1.0;
    for (const tier of currentRule.tiers) {
      if (
        simSeatsRemaining >= tier.minSeatsRemaining &&
        simSeatsRemaining <= tier.maxSeatsRemaining
      ) {
        multiplier = tier.multiplier;
        break;
      }
    }

    if (simIsWeekend) {
      multiplier *= currentRule.weekendMultiplier;
    }

    let calculated = Math.round(simBaseFare * multiplier);
    // Enforce bounds
    calculated = Math.max(currentRule.minFare, Math.min(currentRule.maxFare, calculated));
    return { fare: calculated, multiplier };
  };

  const simResult = calculateSimulatedFare();

  return (
    <AdminLayout
      title="Dynamic Surge Pricing Rules & Simulator"
      subtitle="Configure dynamic multipliers based on remaining seat thresholds, weekend premiums, and simulate price surges"
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Rule Configuration (Col 7) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            {/* Rule Selector */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Active Pricing Profile: {currentRule.name}
                </h3>
                <p className="text-xs text-slate-500">
                  Defines surge thresholds for passenger booking requests
                </p>
              </div>

              <select
                value={activeRuleId}
                onChange={(e) => {
                  setActiveRuleId(e.target.value);
                  const r = pricingRules.find((rule) => rule.id === e.target.value);
                  if (r) setSimBaseFare(r.baseFare);
                }}
                className="rounded-xl border border-slate-300 bg-slate-50 p-2 text-xs font-bold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                {pricingRules.map((rule) => (
                  <option key={rule.id} value={rule.id}>
                    {rule.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Threshold Multipliers Table */}
            <div className="mt-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Surge Tier Multipliers by Remaining Seats
              </h4>

              <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                    <tr>
                      <th className="p-3">Seat Availability Threshold</th>
                      <th className="p-3 font-mono">Surge Multiplier</th>
                      <th className="p-3 font-mono">Sample Fare (@ ₹{currentRule.baseFare})</th>
                      <th className="p-3">Demand State</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                    {currentRule.tiers.map((tier, idx) => {
                      const sampleFare = Math.round(currentRule.baseFare * tier.multiplier);
                      return (
                        <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                          <td className="p-3 font-sans font-semibold text-slate-800 dark:text-slate-200">
                            {tier.maxSeatsRemaining >= 900
                              ? `More than ${tier.minSeatsRemaining - 1} seats`
                              : `${tier.minSeatsRemaining} to ${tier.maxSeatsRemaining} seats remaining`}
                          </td>
                          <td className="p-3 font-bold text-blue-600 dark:text-blue-400">
                            {tier.multiplier.toFixed(2)}×
                          </td>
                          <td className="p-3 font-bold text-slate-900 dark:text-white">
                            {formatCurrency(sampleFare)}
                          </td>
                          <td className="p-3 font-sans">
                            <span
                              className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                                tier.multiplier >= 1.4
                                  ? "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300"
                                  : tier.multiplier > 1.0
                                  ? "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
                                  : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                              }`}
                            >
                              {tier.multiplier >= 1.4
                                ? "Critical Surge"
                                : tier.multiplier > 1.0
                                ? "Moderate Demand"
                                : "Standard Price"}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bounds and Limits */}
            <div className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Floor and Ceiling Limits (Guardrails)
              </h4>
              <div className="mt-3 grid grid-cols-3 gap-3 text-xs">
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/50">
                  <span className="text-slate-400">Minimum Floor</span>
                  <p className="mt-1 font-mono text-base font-bold text-slate-900 dark:text-white">
                    {formatCurrency(currentRule.minFare)}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/50">
                  <span className="text-slate-400">Base Standard</span>
                  <p className="mt-1 font-mono text-base font-bold text-blue-600 dark:text-blue-400">
                    {formatCurrency(currentRule.baseFare)}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/50">
                  <span className="text-slate-400">Ceiling Cap (Max)</span>
                  <p className="mt-1 font-mono text-base font-bold text-slate-900 dark:text-white">
                    {formatCurrency(currentRule.maxFare)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Pricing Simulator (Col 5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border-2 border-blue-500/20 bg-white p-5 sm:p-6 shadow-lg dark:border-blue-900/40 dark:bg-slate-900">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                <Sliders className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Dynamic Fare Simulator
                </h3>
                <p className="text-xs text-slate-500">
                  Test remaining seat depletion in real-time
                </p>
              </div>
            </div>

            {/* Slider: Remaining Seats */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  Simulated Remaining Seats:
                </span>
                <span className="font-mono text-base font-black text-blue-600 dark:text-blue-400">
                  {simSeatsRemaining} Seats Left
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="40"
                value={simSeatsRemaining}
                onChange={(e) => setSimSeatsRemaining(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>1 seat (Critical Surge)</span>
                <span>20 seats</span>
                <span>40 seats (Base fare)</span>
              </div>
            </div>

            {/* Base Fare Input */}
            <div className="mt-4">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Base Fare Input (₹)
              </label>
              <input
                type="number"
                min="300"
                max="3000"
                value={simBaseFare}
                onChange={(e) => setSimBaseFare(Number(e.target.value))}
                className="mt-1 w-full rounded-xl border border-slate-300 p-2 font-mono text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            {/* Weekend Toggle */}
            <div className="mt-4">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={simIsWeekend}
                  onChange={(e) => setSimIsWeekend(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                />
                <span>Apply Weekend Surcharge (+{Math.round((currentRule.weekendMultiplier - 1) * 100)}%)</span>
              </label>
            </div>

            {/* Output Display Card */}
            <div className="mt-6 rounded-2xl bg-gradient-to-tr from-slate-900 to-blue-950 p-5 text-white">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300">
                Simulated Output Fare
              </span>

              <div className="mt-2 flex items-baseline justify-between">
                <span className="font-mono text-3xl font-black">
                  {formatCurrency(simResult.fare)}
                </span>
                <span className="rounded-full bg-white/20 px-2.5 py-0.5 font-mono text-xs font-bold text-amber-300">
                  {simResult.multiplier.toFixed(2)}× Multiplier
                </span>
              </div>

              <div className="mt-3 border-t border-white/10 pt-2 text-[11px] text-blue-200 space-y-1">
                <div className="flex justify-between">
                  <span>Base: {formatCurrency(simBaseFare)}</span>
                  <span>Surge: +{formatCurrency(Math.max(0, simResult.fare - simBaseFare))}</span>
                </div>
                <p className="text-[10px] text-slate-400">
                  Guaranteed locked price for user during 5-minute checkout hold.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
