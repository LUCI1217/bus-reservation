# OmniBus Express — Complete Bus Reservation Website

A modern, high-performance, responsive intercity bus reservation platform with an interactive user-facing booking system and an administrative fleet management console.

Built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Lucide Icons**.

---

## 🌟 Key Features

### Passenger Experience
- **Interactive Search Engine**: Search by Origin, Destination, Travel Date, and Passenger Count with quick 1-click location swapping and city autocomplete.
- **Dynamic Bus Coach Seat Maps**: Driver cabin orientation, Lower Deck (semi-sleeper chairs) and Upper Deck (individual sleeper berths), aisle layouts, and visual status indicators (Available, Selected, Booked, Ladies-only, On Hold).
- **Temporary Seat Hold & Countdown**: Real-time 5-minute seat lock with a live countdown timer (`Seats held for 04:59`) and visual warnings before expiration.
- **Surge Pricing Transparency**: Live fare updates reflecting demand tiers and remaining seat thresholds.
- **Passenger Manifest & Promo Codes**: Passenger details entry (Name, Age, Gender) per seat, plus instant coupon discounts (`EXPLORE20`, `FIRSTBUS`, `FESTIVE10`).
- **Digital E-Ticket with QR Code**: Boarding passes featuring booking references (PNR), cryptographic QR verification barcodes, journey manifests, PDF download simulation, and browser printing.
- **Passenger Account Management**: User profile, booking history tabs (All, Confirmed, Cancelled), cancellation actions with automated refund status.

### Administrative Control Suite
- **Operations Dashboard**: Real-time KPIs covering gross revenue, scheduled departures, fleet capacity, and recent passenger bookings.
- **Fleet & Bus Management**: Register coaches, assign custom names (*Royal Express*, *Night Rider*, *City Cruiser*, *Golden Chariot*, *Apex Voyager*), customize registration numbers, coach categories, seat layouts, and amenities.
- **Travel Corridors & Routes**: Configure origins, destinations, distance in km, intermediate highway stops, boarding points, and dropping points.
- **Departure Scheduler**: Schedule trips on multiple dates, assign registered buses to routes, set departure/arrival times, and monitor seat occupancy.
- **Dynamic Surge Rules & Interactive Simulator**: Configure floor/ceiling fares, surge multipliers by seat remaining thresholds, and test pricing depletion using an interactive slider.
- **Manifests & Booking Control**: Search bookings by PNR or passenger name, filter by status, cancel reservations with refund tracking, and export manifests to CSV.
- **1-Click Role Switcher**: Instant role toggle between Passenger (`USER`) and Administrator (`ADMIN`) accessible from any page.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (Turbopack, App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 |
| **Icons** | Lucide React |
| **State Management** | React Context (`StoreContext`) with persistent LocalStorage |
| **Validation** | Zod |
| **Typography** | Geist Sans & Geist Mono |

---

## 📂 Project Directory Structure

```text
bus-reservation/
├── .env.example                  # Environment variable template
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript compiler options
├── README.md                     # Documentation and setup guide
├── PROJECT_PROGRESS.md           # Phase-by-phase tracker
└── src/
    ├── app/
    │   ├── layout.tsx            # Global app layout with StoreProvider
    │   ├── globals.css           # Tailwind CSS directives
    │   ├── page.tsx              # Homepage (Hero, Search, Featured fleet)
    │   ├── search/page.tsx       # Bus search results with filters & sorting
    │   ├── bus/[id]/page.tsx     # Detailed coach specifications & routes
    │   ├── seat-selection/       # Interactive seat layout & hold timer
    │   ├── checkout/page.tsx     # Passenger forms, hold countdown & payment
    │   ├── confirmation/[pnr]/   # Boarding pass & digital QR ticket
    │   ├── login/page.tsx        # Authentication & 1-click demo toggles
    │   ├── register/page.tsx     # New traveler registration
    │   ├── profile/page.tsx      # User profile & reward stats
    │   ├── my-bookings/page.tsx  # Booking history & cancellation
    │   ├── my-tickets/page.tsx   # Digital ticket collection & QR viewer
    │   ├── offers/page.tsx       # Discount coupons & promo codes
    │   ├── help/page.tsx         # Help center & customer support form
    │   ├── terms/page.tsx        # Cancellation & refund policy terms
    │   └── admin/
    │       ├── page.tsx          # Admin overview analytics dashboard
    │       ├── buses/page.tsx    # Manage buses, names, capacities
    │       ├── routes/page.tsx   # Manage routes, stops, boarding points
    │       ├── trips/page.tsx    # Schedule departures & trip availability
    │       ├── pricing/page.tsx  # Dynamic pricing rules & live simulator
    │       └── bookings/page.tsx # Manage manifests, search PNR, export CSV
    ├── components/
    │   ├── layout/
    │   │   ├── Navbar.tsx        # Responsive navigation with role switcher
    │   │   ├── Footer.tsx        # Comprehensive travel footer
    │   │   └── AppShell.tsx      # Conditional admin layout wrapper
    │   ├── search/
    │   │   └── SearchForm.tsx    # Origin, destination, date & swap controls
    │   ├── bus/
    │   │   ├── BusCard.tsx       # Search result card with expandable seats
    │   │   ├── SeatMap.tsx       # Lower & Upper deck interactive coach map
    │   │   └── HoldTimerBanner.tsx # 5-minute countdown hold banner
    │   ├── ticket/
    │   │   └── DigitalTicket.tsx # Printable boarding pass with QR code
    │   └── admin/
    │       └── AdminLayout.tsx   # Collapsible sidebar admin layout
    ├── lib/
    │   ├── mockData.ts           # 8 featured buses, routes, trips, bookings
    │   ├── store.tsx             # Interactive application state engine
    │   └── utils.ts              # Currency, date, and styling helpers
    └── types/
        └── index.ts              # TypeScript interfaces and domain models
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js LTS (v20+ or v24+)
- npm or pnpm or yarn

### Installation

1. Navigate to the project root:
   ```bash
   cd bus-reservation
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧭 Page Routes Index

| Route | Description |
|---|---|
| `/` | Homepage with hero section, search form, trending routes, and fleet cards |
| `/search` | Live bus search results with category filters, price slider, and sorting |
| `/bus/[id]` | Bus specifications, deck layouts, amenities, and scheduled routes |
| `/seat-selection/[tripId]` | Interactive coach seat selector with Lower and Upper deck views |
| `/checkout` | Passenger details form, 5-minute hold timer, promo code, and demo pay |
| `/confirmation/[pnr]` | Confirmed reservation with digital QR boarding pass and PDF actions |
| `/login` | Sign-in page with 1-click Demo Passenger and Demo Admin options |
| `/register` | Traveler registration form |
| `/profile` | User profile, travel stats, and editable personal info |
| `/my-bookings` | Passenger booking history with ticket links and cancellation refund flow |
| `/my-tickets` | Dedicated digital tickets dashboard with scannable QR passes |
| `/offers` | Available promo codes with 1-click clipboard copy (`EXPLORE20`, etc.) |
| `/help` | Searchable FAQs and 24/7 customer support contact form |
| `/terms` | Official terms of carriage, cancellation slabs, and refund schedule |
| `/admin` | Fleet administrator dashboard with revenue, trips, and recent bookings |
| `/admin/buses` | Fleet manager: add, edit, activate/deactivate, and configure buses |
| `/admin/routes` | Route manager: origin, destination, distance, intermediate stops |
| `/admin/trips` | Trip scheduler: assign buses, dates, departure/arrival times |
| `/admin/pricing` | Dynamic pricing manager with interactive real-time surge simulator |
| `/admin/bookings` | Manifest manager: search PNR, filter status, cancel bookings, export CSV |

---

## 🗺️ Six Development Phases Roadmap

- [x] **PHASE 1 — Frontend and UI** *(Current)*
  - Modern, responsive travel website with Tailwind CSS
  - Complete user booking journey (Search, Seat selection, Checkout, QR Tickets)
  - Full admin management dashboard (Buses, Routes, Trips, Pricing Simulator, Bookings)
  - Isolated sample data store with 8 unique flagship buses
  - Application builds and renders cleanly without errors
- [ ] **PHASE 2 — Database, Authentication, and Admin Controls**
  - PostgreSQL schema and Prisma ORM migrations
  - Secure authentication with session management and role-based guards
  - Admin CRUD operations connected to real database models
- [ ] **PHASE 3 — Seat Selection, Live Availability, and Dynamic Pricing**
  - Database transactions and pessimistic locking for seat holds
  - Server-enforced hold expiration engine
  - Dynamic pricing calculation service with audit logging
- [ ] **PHASE 4 — Booking, Payment, and Digital Tickets**
  - Idempotent payment verification and sandbox integration
  - Server-side PDF generation and cryptographic QR code signing
- [ ] **PHASE 5 — Admin Dashboard, Analytics, and Remaining Features**
  - Database-driven analytics aggregation and charts
  - Audit logging and CSV export pipeline
- [ ] **PHASE 6 — Testing, Security, and Final Delivery**
  - Automated integration tests, penetration testing, and production optimization
