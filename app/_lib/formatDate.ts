import { formatDistance, parseISO } from "date-fns";

export function formatDate(date: Date) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    23,
    59,
    59
  ).toLocaleString("en-US", { timeZone: "Europe/Rome" });
}

export const formatDistanceFromNow = (dateStr: string) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");
