import { TimeValue } from "./types";

export function parseDateAsTimeValue(date: Date): TimeValue {
  return {
    hours: date?.getHours() ?? 0,
    minutes: date?.getMinutes() ?? 0,
  };
}
