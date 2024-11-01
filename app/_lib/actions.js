"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";

export async function updateGuest(formData) {
  const session = await auth();
  if (!session.user) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,15}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updatedData = { nationalID, nationality, countryFlag };

  const { data, error } = await supabase
    .from("guests")
    .update(updatedData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile");
}

export async function createBooking(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const newBooking = {
    ...bookingData,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations"),
    totalPrice: bookingData.cabinPrice,
    hasBreakfast: false,
    extrasPrice: 0,
    isPaid: false,
    status: "unconfirmed",
    guestId: session.user.guestId,
  };
  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) throw new Error("Booking could not be created");

  revalidatePath(`/cabin/${bookingData.cabinId}`);
  redirect("/cabins/thankyou");
}

export async function updateBooking(bookingId, formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const bookings = await getBookings(session.user.guestId);
  const IDs = bookings.map((booking) => booking.id);
  if (!IDs.includes(bookingId))
    throw new Error("You are not allowed to update this reservation");

  const numGuests = formData.get("numGuests");
  if (numGuests === "") throw new Error("You must choose num of guests");
  const observations = formData.get("observations");

  const { error } = await supabase
    .from("bookings")
    .update({ numGuests, observations: observations.slice(0, 1000) })
    .eq("id", bookingId);

  if (error) {
    throw new Error("Booking could not be updated");
  }

  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingId}`);

  redirect("/account/reservations");
}

export async function deleteBooking(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const bookings = await getBookings(session.user.guestId);
  const IDs = bookings.map((booking) => booking.id);

  if (!IDs.includes(bookingId))
    throw new Error("You are not allowed to delete this reservation");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    throw new Error("Booking could not be deleted");
  }

  revalidatePath("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
