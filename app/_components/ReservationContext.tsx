"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";
import { DateRange } from "react-day-picker";
import { ContextValues } from "@/app/_types/types";

const initialState = { to: undefined, from: undefined };
const ReservationContext = createContext<ContextValues | null>(null);

export default function ReservationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [range, setRange] = useState<DateRange>(initialState);
  
  const resetRange = () => setRange(initialState);

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservation() {
  const context = useContext(ReservationContext);
  if (context == undefined)
    throw new Error("Context was used outside the provider");
  return context;
}
