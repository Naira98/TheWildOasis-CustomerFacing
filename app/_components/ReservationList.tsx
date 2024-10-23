"use client";

import { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { deleteBooking } from "@/app/_lib/actions";
import { Booking } from "@/app/_types/types";

const ReservationList = ({ bookings }: { bookings: Booking[] }) => {
  const [optimisticBookings, OptimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id !== bookingId);
    }
  );

  const handleDelete = async (bookingId: number) => {
    OptimisticDelete(bookingId);
    await deleteBooking(bookingId);
  };
  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
};

export default ReservationList;
