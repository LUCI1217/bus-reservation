"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Bus, Route, Trip, Booking, User, PricingRule, Passenger, StopPoint } from "@/types";
import { INITIAL_BUSES, INITIAL_ROUTES, INITIAL_TRIPS, INITIAL_BOOKINGS, INITIAL_USERS, INITIAL_PRICING_RULES } from "./mockData";

interface StoreContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  switchRole: (role: "USER" | "ADMIN") => void;
  
  // Data
  buses: Bus[];
  routes: Route[];
  trips: Trip[];
  bookings: Booking[];
  pricingRules: PricingRule[];

  // User Actions
  selectedTrip: Trip | null;
  setSelectedTrip: (trip: Trip | null) => void;
  selectedSeats: string[];
  toggleSeatSelection: (seatNumber: string) => void;
  clearSeatSelection: () => void;
  passengers: Passenger[];
  setPassengers: React.Dispatch<React.SetStateAction<Passenger[]>>;
  updatePassenger: (index: number, field: keyof Passenger, value: string | number) => void;
  selectedBoardingPoint: StopPoint | null;
  setSelectedBoardingPoint: (point: StopPoint | null) => void;
  selectedDroppingPoint: StopPoint | null;
  setSelectedDroppingPoint: (point: StopPoint | null) => void;
  couponCode: string;
  discountAmount: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  
  // Checkout & Holds
  holdSecondsLeft: number;
  resetHoldTimer: () => void;
  createBooking: (paymentMethod: Booking["paymentMethod"]) => Booking;
  cancelBooking: (pnr: string) => boolean;

  // Admin Actions
  addBus: (bus: Omit<Bus, "id" | "lowerDeckSeats" | "upperDeckSeats">) => Bus;
  updateBus: (id: string, busData: Partial<Bus>) => void;
  deleteBus: (id: string) => void;
  addRoute: (route: Omit<Route, "id">) => Route;
  updateRoute: (id: string, routeData: Partial<Route>) => void;
  deleteRoute: (id: string) => void;
  addTrip: (tripData: Omit<Trip, "id" | "bus" | "route">) => Trip;
  updatePricingRule: (id: string, updated: Partial<PricingRule>) => void;

  // Search state
  searchQuery: {
    origin: string;
    destination: string;
    travelDate: string;
    passengerCount: number;
  };
  setSearchQuery: (query: { origin: string; destination: string; travelDate: string; passengerCount: number }) => void;
  swapSearchLocations: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "omnibus_app_state_v1";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User>(INITIAL_USERS[0]);
  const [buses, setBuses] = useState<Bus[]>(INITIAL_BUSES);
  const [routes, setRoutes] = useState<Route[]>(INITIAL_ROUTES);
  const [trips, setTrips] = useState<Trip[]>(INITIAL_TRIPS);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [pricingRules, setPricingRules] = useState<PricingRule[]>(INITIAL_PRICING_RULES);

  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(INITIAL_TRIPS[0]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [selectedBoardingPoint, setSelectedBoardingPoint] = useState<StopPoint | null>(null);
  const [selectedDroppingPoint, setSelectedDroppingPoint] = useState<StopPoint | null>(null);

  const [couponCode, setCouponCode] = useState<string>("");
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [holdSecondsLeft, setHoldSecondsLeft] = useState<number>(300); // 5 minutes

  const [searchQuery, setSearchQuery] = useState({
    origin: "Mumbai",
    destination: "Goa (Panaji)",
    travelDate: "2026-10-25",
    passengerCount: 1,
  });

  // Load from localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.buses) setBuses(parsed.buses);
        if (parsed.routes) setRoutes(parsed.routes);
        if (parsed.trips) setTrips(parsed.trips);
        if (parsed.bookings) setBookings(parsed.bookings);
        if (parsed.pricingRules) setPricingRules(parsed.pricingRules);
        if (parsed.currentUser) setCurrentUser(parsed.currentUser);
      }
    } catch {
      // ignore
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({ buses, routes, trips, bookings, pricingRules, currentUser })
      );
    } catch {
      // ignore
    }
  }, [buses, routes, trips, bookings, pricingRules, currentUser]);

  // Seat hold countdown timer
  useEffect(() => {
    if (selectedSeats.length === 0) return;
    const interval = setInterval(() => {
      setHoldSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedSeats]);

  const resetHoldTimer = () => {
    setHoldSecondsLeft(300);
  };

  const switchRole = (role: "USER" | "ADMIN") => {
    if (role === "ADMIN") {
      setCurrentUser(INITIAL_USERS[1]);
    } else {
      setCurrentUser(INITIAL_USERS[0]);
    }
  };

  const swapSearchLocations = () => {
    setSearchQuery((prev) => ({
      ...prev,
      origin: prev.destination,
      destination: prev.origin,
    }));
  };

  const toggleSeatSelection = (seatNumber: string) => {
    resetHoldTimer();
    setSelectedSeats((prev) => {
      if (prev.includes(seatNumber)) {
        const updated = prev.filter((s) => s !== seatNumber);
        setPassengers((p) => p.filter((item) => item.seatNumber !== seatNumber));
        return updated;
      } else {
        const updated = [...prev, seatNumber];
        setPassengers((p) => [
          ...p,
          {
            seatNumber,
            name: p.length === 0 ? currentUser.name : `Passenger ${updated.length}`,
            age: 28,
            gender: "MALE",
            fare: selectedTrip?.currentFare || 750,
          },
        ]);
        return updated;
      }
    });
  };

  const clearSeatSelection = () => {
    setSelectedSeats([]);
    setPassengers([]);
  };

  const updatePassenger = (index: number, field: keyof Passenger, value: string | number) => {
    setPassengers((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === "EXPLORE20") {
      const disc = Math.round((selectedTrip?.currentFare || 750) * selectedSeats.length * 0.2);
      setCouponCode(clean);
      setDiscountAmount(disc);
      return { success: true, message: "Coupon EXPLORE20 applied! 20% discount granted." };
    } else if (clean === "FIRSTBUS") {
      setCouponCode(clean);
      setDiscountAmount(150);
      return { success: true, message: "Coupon FIRSTBUS applied! Flat ₹150 off." };
    } else if (clean === "FESTIVE10") {
      const disc = Math.round((selectedTrip?.currentFare || 750) * selectedSeats.length * 0.1);
      setCouponCode(clean);
      setDiscountAmount(disc);
      return { success: true, message: "Coupon FESTIVE10 applied! 10% discount granted." };
    }
    return { success: false, message: "Invalid promo code. Try EXPLORE20 or FIRSTBUS." };
  };

  const removeCoupon = () => {
    setCouponCode("");
    setDiscountAmount(0);
  };

  const createBooking = (paymentMethod: Booking["paymentMethod"]): Booking => {
    if (!selectedTrip) throw new Error("No trip selected");
    const pnr = `PNR-${Math.floor(100000 + Math.random() * 900000)}`;
    const baseTotal = (selectedTrip.currentFare || 750) * selectedSeats.length;
    const taxAmount = Math.round((baseTotal - discountAmount) * 0.05);
    const finalTotal = Math.max(0, baseTotal - discountAmount + taxAmount);

    const newBooking: Booking = {
      id: `bk-${Date.now()}`,
      pnr,
      tripId: selectedTrip.id,
      trip: selectedTrip,
      userId: currentUser.id,
      user: {
        name: currentUser.name,
        email: currentUser.email,
        phone: currentUser.phone,
      },
      passengers: passengers.length > 0 ? passengers : selectedSeats.map((s) => ({
        seatNumber: s,
        name: currentUser.name,
        age: 30,
        gender: "MALE",
        fare: selectedTrip.currentFare,
      })),
      selectedSeats,
      boardingPoint: selectedBoardingPoint || selectedTrip.route.boardingPoints[0],
      droppingPoint: selectedDroppingPoint || selectedTrip.route.droppingPoints[0],
      baseTotal,
      discountAmount,
      couponCode: couponCode || undefined,
      taxAmount,
      finalTotal,
      bookingStatus: "CONFIRMED",
      paymentStatus: "PAID",
      paymentMethod,
      qrCodeData: `OMNIBUS:${pnr}:${selectedTrip.tripCode}:VERIFIED:VALID_PASSENGER`,
      createdAt: new Date().toISOString(),
    };

    setBookings((prev) => [newBooking, ...prev]);

    // Update trip available seats count
    setTrips((prev) =>
      prev.map((t) =>
        t.id === selectedTrip.id
          ? { ...t, availableSeatsCount: Math.max(0, t.availableSeatsCount - selectedSeats.length) }
          : t
      )
    );

    return newBooking;
  };

  const cancelBooking = (pnr: string): boolean => {
    let success = false;
    setBookings((prev) =>
      prev.map((b) => {
        if (b.pnr === pnr && b.bookingStatus === "CONFIRMED") {
          success = true;
          return {
            ...b,
            bookingStatus: "CANCELLED",
            paymentStatus: "REFUNDED",
          };
        }
        return b;
      })
    );
    return success;
  };

  // Admin Bus Actions
  const addBus = (busData: Omit<Bus, "id" | "lowerDeckSeats" | "upperDeckSeats">): Bus => {
    const id = `bus-${Date.now()}`;
    const newBus: Bus = {
      ...busData,
      id,
      lowerDeckSeats: [],
      upperDeckSeats: [],
    };
    setBuses((prev) => [...prev, newBus]);
    return newBus;
  };

  const updateBus = (id: string, busData: Partial<Bus>) => {
    setBuses((prev) => prev.map((b) => (b.id === id ? { ...b, ...busData } : b)));
  };

  const deleteBus = (id: string) => {
    setBuses((prev) => prev.filter((b) => b.id !== id));
  };

  // Admin Route Actions
  const addRoute = (routeData: Omit<Route, "id">): Route => {
    const id = `route-${Date.now()}`;
    const newRoute: Route = { ...routeData, id };
    setRoutes((prev) => [...prev, newRoute]);
    return newRoute;
  };

  const updateRoute = (id: string, routeData: Partial<Route>) => {
    setRoutes((prev) => prev.map((r) => (r.id === id ? { ...r, ...routeData } : r)));
  };

  const deleteRoute = (id: string) => {
    setRoutes((prev) => prev.filter((r) => r.id !== id));
  };

  // Admin Trip Actions
  const addTrip = (tripData: Omit<Trip, "id" | "bus" | "route">): Trip => {
    const id = `trip-${Date.now()}`;
    const bus = buses.find((b) => b.id === tripData.busId) || buses[0];
    const route = routes.find((r) => r.id === tripData.routeId) || routes[0];
    const newTrip: Trip = {
      ...tripData,
      id,
      bus,
      route,
    };
    setTrips((prev) => [newTrip, ...prev]);
    return newTrip;
  };

  // Admin Pricing Rule Actions
  const updatePricingRule = (id: string, updated: Partial<PricingRule>) => {
    setPricingRules((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
  };

  return (
    <StoreContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        switchRole,
        buses,
        routes,
        trips,
        bookings,
        pricingRules,
        selectedTrip,
        setSelectedTrip,
        selectedSeats,
        toggleSeatSelection,
        clearSeatSelection,
        passengers,
        setPassengers,
        updatePassenger,
        selectedBoardingPoint,
        setSelectedBoardingPoint,
        selectedDroppingPoint,
        setSelectedDroppingPoint,
        couponCode,
        discountAmount,
        applyCoupon,
        removeCoupon,
        holdSecondsLeft,
        resetHoldTimer,
        createBooking,
        cancelBooking,
        addBus,
        updateBus,
        deleteBus,
        addRoute,
        updateRoute,
        deleteRoute,
        addTrip,
        updatePricingRule,
        searchQuery,
        setSearchQuery,
        swapSearchLocations,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
