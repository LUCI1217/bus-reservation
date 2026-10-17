"use client";

import React, { useState } from "react";
import {
  HelpCircle,
  Search,
  ChevronDown,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle2,
  Clock,
  ShieldCheck,
} from "lucide-react";

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const faqs = [
    {
      q: "How does the 5-minute temporary seat hold work?",
      a: "When you select seats on the bus map and proceed to checkout, our server locks those seats exclusively for you for 5 minutes. A visible countdown timer shows the remaining time. If the timer reaches 00:00 before payment confirmation, the hold expires automatically so other passengers can book.",
    },
    {
      q: "How is dynamic pricing calculated on OmniBus?",
      a: "Prices automatically adjust based on remaining seat thresholds and route demand. For example, when more than 20 seats remain, standard base fare applies. When 10 or fewer seats remain, a transparent dynamic surge multiplier applies to encourage early booking. The final quoted fare remains locked during your active 5-minute hold.",
    },
    {
      q: "Do I need a physical printout of my ticket to board?",
      a: "No! All OmniBus reservations include an encrypted digital QR code boarding pass. You can display the digital pass on your phone or mobile browser. Bus conductors scan the QR code to verify your booking instantly.",
    },
    {
      q: "What is the cancellation and refund policy?",
      a: "Cancellations made 24+ hours prior to departure receive a 90% refund. Cancellations made between 12 and 24 hours prior receive a 50% refund. Within 12 hours of departure, no refund is available. Refunds are automatically processed to the original payment source.",
    },
    {
      q: "Can I choose between sleeper berths and seater chairs?",
      a: "Yes! On multi-deck buses like our Volvo Multi-Axle and Luxury Scania coaches, the Lower Deck offers ergonomic semi-sleeper seats, while the Upper Deck offers individual sleeper berths.",
    },
  ];

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => setContactSubmitted(false), 5000);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">
          <HelpCircle className="h-3.5 w-3.5" />
          <span>Support Center</span>
        </span>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Frequently Asked Questions & Support
        </h1>
        <p className="mt-2 text-xs text-slate-500 max-w-md mx-auto">
          Find answers regarding seat holds, boarding pass verification, cancellations, and fleet safety
        </p>
      </div>

      {/* FAQ Search Bar */}
      <div className="mx-auto mt-6 max-w-lg">
        <div className="flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs (e.g. holds, refund, QR ticket)..."
            className="ml-2 w-full bg-transparent text-xs text-slate-900 focus:outline-none dark:text-white"
          />
        </div>
      </div>

      {/* FAQ Accordion List */}
      <div className="mt-8 space-y-3">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openFaq === idx;
          return (
            <div
              key={idx}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(isOpen ? null : idx)}
                className="flex w-full items-center justify-between p-4 sm:p-5 text-left text-xs font-bold text-slate-900 dark:text-white"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`h-4 w-4 text-slate-400 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="border-t border-slate-100 bg-slate-50/50 p-4 sm:p-5 text-xs text-slate-600 leading-relaxed dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-300">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Contact Form Section */}
      <div className="mt-14 rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Still Need Assistance?
            </h3>
            <p className="mt-2 text-xs text-slate-500 leading-relaxed">
              Our travel specialists and fleet operations team are available 24/7 to assist with ticket re-issuance, lost items, or emergency bus tracking.
            </p>

            <div className="mt-6 space-y-3 text-xs">
              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <Phone className="h-4 w-4 text-blue-600" />
                <span>24/7 Helpline: +91 1800-419-7000 (Toll Free)</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <Mail className="h-4 w-4 text-emerald-600" />
                <span>Support Email: helpdesk@omnibus.dev</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <Clock className="h-4 w-4 text-amber-500" />
                <span>Average Response Time: Under 15 Minutes</span>
              </div>
            </div>
          </div>

          <div>
            {contactSubmitted ? (
              <div className="rounded-2xl bg-emerald-50 p-6 text-center text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200">
                <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-600" />
                <h4 className="mt-2 font-bold text-sm">Message Sent Successfully</h4>
                <p className="mt-1 text-xs">
                  A support ticket has been created. A representative will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Alex Johnson"
                    className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@example.com"
                    className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500">
                    Your Message
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Explain your inquiry or PNR number..."
                    className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-blue-600 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition"
                >
                  Send Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
