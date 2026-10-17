export type UserRole = "USER" | "ADMIN";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
}

export type BusType = "AC_SLEEPER" | "NON_AC_SLEEPER" | "AC_SEATER" | "VOLVO_MULTI_AXLE" | "LUXURY_SCANIA";

export interface Seat {
  id: string;
  seatNumber: string;
  deck: "LOWER" | "UPPER";
  type: "SEATER" | "SLEEPER";
  row: number;
  col: number;
  status: "AVAILABLE" | "SELECTED" | "HELD" | "BOOKED" | "LADIES";
  basePrice: number;
  currentPrice: number;
}

export interface Bus {
  id: string;
  name: string;
  registrationNumber: string;
  busType: BusType;
  totalSeats: number;
  amenities: string[];
  rating: number;
  reviewsCount: number;
  operatorName: string;
  lowerDeckSeats: Seat[];
  upperDeckSeats?: Seat[];
  hasUpperDeck: boolean;
  isActive: boolean;
}

export interface StopPoint {
  id: string;
  name: string;
  landmark: string;
  timeOffsetMinutes: number; // relative to departure/arrival
}

export interface Route {
  id: string;
  origin: string;
  destination: string;
  distanceKm: number;
  estimatedDuration: string; // e.g. "6h 30m"
  boardingPoints: StopPoint[];
  droppingPoints: StopPoint[];
  intermediateStops: string[];
  isActive: boolean;
}

export interface DynamicPricingTier {
  minSeatsRemaining: number;
  maxSeatsRemaining: number;
  multiplier: number;
}

export interface PricingRule {
  id: string;
  name: string;
  baseFare: number;
  minFare: number;
  maxFare: number;
  weekendMultiplier: number;
  tiers: DynamicPricingTier[];
}

export interface Trip {
  id: string;
  tripCode: string;
  busId: string;
  bus: Bus;
  routeId: string;
  route: Route;
  departureTime: string; // "20:30"
  arrivalTime: string;   // "05:00"
  travelDate: string;    // "2026-10-25"
  baseFare: number;
  currentFare: number;
  availableSeatsCount: number;
  pricingRuleId?: string;
  status: "SCHEDULED" | "BOARDING" | "DEPARTED" | "COMPLETED" | "CANCELLED";
}

export interface Passenger {
  id?: string;
  seatNumber: string;
  name: string;
  age: number;
  gender: "MALE" | "FEMALE" | "OTHER";
  fare: number;
}

export type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "REFUNDED" | "EXPIRED";
export type PaymentStatus = "UNPAID" | "PAID" | "FAILED" | "REFUNDED";

export interface Booking {
  id: string;
  pnr: string;
  tripId: string;
  trip: Trip;
  userId: string;
  user: {
    name: string;
    email: string;
    phone: string;
  };
  passengers: Passenger[];
  selectedSeats: string[];
  boardingPoint: StopPoint;
  droppingPoint: StopPoint;
  baseTotal: number;
  discountAmount: number;
  couponCode?: string;
  taxAmount: number;
  finalTotal: number;
  bookingStatus: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: "DEMO_PAY" | "CREDIT_CARD" | "UPI" | "NET_BANKING";
  qrCodeData: string;
  holdExpiresAt?: string;
  createdAt: string;
}

export interface SearchFilters {
  origin: string;
  destination: string;
  travelDate: string;
  passengerCount: number;
  busTypes?: BusType[];
  departureTimes?: ("MORNING" | "AFTERNOON" | "EVENING" | "NIGHT")[];
  minPrice?: number;
  maxPrice?: number;
  amenities?: string[];
  sortBy?: "price_asc" | "price_desc" | "departure_asc" | "duration_asc" | "rating_desc";
}
