"use client";

import ReservationCard from "./ReservationCard";
import { Reservation } from "@/app/_types/types";

const ReservationList = ({ bookings }: { bookings: Reservation[] }) => {
  return (
    <ul className="space-y-6">
      {bookings.map((booking) => (
        <ReservationCard booking={booking} key={booking.id} />
      ))}
    </ul>
  );
};

export default ReservationList;
