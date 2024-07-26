import { User as NextAuthUser, Session as NextAuthSession } from "next-auth";
import { DateRange } from "react-day-picker";

interface User extends NextAuthUser {
  guestId?: number;
}

export interface Session extends NextAuthSession {
  user?: User;
}

export interface Cabin {
  id: number;
  created_at?: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
  description?: string;
}

export interface Booking {
  id: number;
  guestId: number;
  startDate: string;
  endDate: string;
  numNights: number;
  cabinPrice: number;
  totalPrice: number;
  numGuests: number;
  status: string;
  created_at: string;
  cabins: { name: string; image: string };
  hasBreakfast: boolean;
  isPaid: boolean;
  cabinId: number;
  extrasPrice: number;
  observations: string;
}
export interface Guest {
  id: number;
  created_at: string;
  fullName: string;
  email: string;
  nationalID: number;
  nationality: string;
  countryFlag: string;
}
export interface Settings {
  id: number;
  created_at: string;
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
}

export interface ContextValues {
  range: DateRange;
  setRange: (value: DateRange) => void;
  resetRange: () => void;
}
export interface ParamsCabinId {
  cabinId: number;
}
// export type DateRange = {
//   from?: Date | undefined;
//   to?: Date | undefined;
// };
