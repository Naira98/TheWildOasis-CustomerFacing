import { Metadata } from "next";
import Link from "next/link";

import ReservationList from "@/app/_components/ReservationList";
import { auth } from "@/app/_lib/auth";
import { getBookings } from "@/app/_lib/data-service";
import { Booking, Session } from "@/app/_types/types";

export const metadata: Metadata = {
  title: "Reservations",
};

export default async function Page() {
  const session: Session | null = await auth();
  const bookings: Booking[] = await getBookings(session?.user?.guestId);
  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <Link className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </Link>
        </p>
      ) : (
        <ReservationList bookings={bookings}/>
      )}
    </div>
  );
}