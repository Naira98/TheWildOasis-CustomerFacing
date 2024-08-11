"use client";

import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Cabin, ContextValues, Settings } from "../_types/types";
import { useReservation } from "./ReservationContext";
import { useEffect, useMemo } from "react";

interface Props {
  cabin: Cabin;
  settings: Settings;
  bookedDates: Date[];
}

function isAlreadyBooked(range: DateRange, datesArr: Date[]) {
  return datesArr.some(
    (date) =>
      range.from &&
      range.to &&
      isWithinInterval(date, { start: range.from, end: range.to })
  );
}

function DateSelector({ cabin, settings, bookedDates }: Props) {
  const { range, setRange, resetRange }: ContextValues = useReservation()!;

  const { regularPrice, discount } = cabin;
  const numNights =
    range.from && range.to ? differenceInDays(range.to, range.from) : 0;
  const cabinPrice = numNights * (regularPrice - discount);
  const { minBookingLength, maxBookingLength } = settings;

  const displayRange = isAlreadyBooked(range, bookedDates) ? undefined : range;

  useEffect(() => {
    if (displayRange == undefined) resetRange();
  }, [displayRange, resetRange]);

  return (
    <div className="flex flex-col justify-between">
      <div className="flex-1 px-3 flex items-center justify-center">
        <DayPicker
          className="pt-12 place-self-center"
          mode="range"
          onSelect={(range) =>
            setRange(range || { from: undefined, to: undefined })
          }
          selected={displayRange}
          min={minBookingLength + 1}
          max={maxBookingLength}
          fromDate={new Date()}
          toYear={new Date().getFullYear() + 5}
          captionLayout="dropdown"
          numberOfMonths={2}
          disabled={(curDate) => {
            return (
              isPast(curDate) ||
              bookedDates.some((date) => isSameDay(date, curDate))
            );
          }}
        />
      </div>

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={() => resetRange()}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
