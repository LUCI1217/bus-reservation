import React from "react";
import Link from "next/link";
import { Bus, ShieldCheck, Clock, Headphones, Award, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300 transition-colors">
      {/* Feature Highlights Bar */}
      <div className="border-b border-slate-800 bg-slate-950/60 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">100% Safe Travel</h4>
                <p className="text-xs text-slate-400">Sanitized & verified buses</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">On-Time Guarantee</h4>
                <p className="text-xs text-slate-400">98.5% punctual departures</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                <Headphones className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">24/7 Live Support</h4>
                <p className="text-xs text-slate-400">Quick assistance anytime</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Best Fare Promise</h4>
                <p className="text-xs text-slate-400">Zero hidden booking fees</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
                <Bus className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Omni<span className="text-blue-400">Bus</span>
              </span>
            </Link>
            <p className="mt-4 text-xs leading-relaxed text-slate-400 max-w-sm">
              OmniBus is a premier intercity bus reservation platform delivering seamless booking,
              real-time seat layouts, dynamic surge transparency, and secure QR-coded boarding passes across the country.
            </p>
            <div className="mt-6 flex items-center gap-3 text-xs text-slate-400">
              <span className="inline-flex items-center rounded-full bg-slate-800 px-3 py-1 font-mono text-[11px] text-emerald-400 border border-slate-700">
                ● Fleet Status: All Normal
              </span>
              <span className="text-slate-500">v1.0.0-phase1</span>
            </div>
          </div>

          {/* Popular Routes */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Popular Routes
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs">
              <li>
                <Link href="/search?origin=Mumbai&destination=Goa+(Panaji)" className="hover:text-white transition">
                  Mumbai → Goa (Panaji)
                </Link>
              </li>
              <li>
                <Link href="/search?origin=Bengaluru&destination=Hyderabad" className="hover:text-white transition">
                  Bengaluru → Hyderabad
                </Link>
              </li>
              <li>
                <Link href="/search?origin=Delhi&destination=Jaipur" className="hover:text-white transition">
                  Delhi → Jaipur
                </Link>
              </li>
              <li>
                <Link href="/search?origin=Chennai&destination=Bengaluru" className="hover:text-white transition">
                  Chennai → Bengaluru
                </Link>
              </li>
              <li>
                <Link href="/search?origin=Pune&destination=Mumbai" className="hover:text-white transition">
                  Pune → Mumbai
                </Link>
              </li>
            </ul>
          </div>

          {/* Featured Fleet */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Featured Fleet
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs">
              <li>
                <span className="text-slate-400">Royal Express (Volvo Multi-Axle)</span>
              </li>
              <li>
                <span className="text-slate-400">Night Rider (AC Sleeper)</span>
              </li>
              <li>
                <span className="text-slate-400">Golden Chariot (Luxury Scania)</span>
              </li>
              <li>
                <span className="text-slate-400">City Cruiser (Executive Seater)</span>
              </li>
              <li>
                <span className="text-slate-400">Apex Voyager (VIP Sleeper)</span>
              </li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Customer Support
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs">
              <li>
                <Link href="/help" className="hover:text-white transition">
                  Help Center & FAQs
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition">
                  Cancellation & Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-amber-400 hover:text-amber-300 transition">
                  Operator / Admin Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>© 2026 OmniBus Technologies. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Built with Next.js, TypeScript & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
