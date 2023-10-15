import React, { ComponentProps } from "react";
import { DayPicker } from "react-day-picker";
import "../../styles/datepicker.scss";

export function DatePicker(props: ComponentProps<typeof DayPicker>) {
  return <DayPicker {...props} />;
}
