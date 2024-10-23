import { differenceInDays } from "date-fns";

export function generateNumOfNights(from?: Date, to?: Date) {
  return from && to ? differenceInDays(to, from) + 1 : 0;
}
