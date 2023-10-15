import { addDays, format } from "date-fns";
import { ComponentProps, useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "../../styles/datepicker.scss";
import React from "react";

export function DatePicker(props: ComponentProps<typeof DayPicker>) {
  const defaultSelected: DateRange = {
    from: new Date(),
    to: addDays(new Date(), 4),
  };
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);

  let footer = <p>Please pick the first day.</p>;
  if (range?.from) {
    if (!range.to) {
      footer = <p>{format(range.from, "PPP")}</p>;
    } else if (range.to) {
      footer = (
        <p>
          {format(range.from, "PPP")}–{format(range.to, "PPP")}
        </p>
      );
    }
  }

  return (
    <DayPicker
      {...props}
      mode="range"
      defaultMonth={new Date()}
      selected={range}
      onSelect={setRange}
    />
  );
}
