import { differenceInDays } from "date-fns";

export function generateNumOfNights(from: string, to: string) {
  return differenceInDays(to, from) + 1;
}