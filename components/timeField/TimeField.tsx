import { InputHTMLAttributes } from "react";
import { NumberField } from "../numberField";
import { TimeValue } from "./types";

type Props = {
  value?: TimeValue;
  onChange?: (value: TimeValue) => void;
};

export function TimeField(
  props: Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> &
    Props
) {
  function onChange(value: number, type: keyof TimeValue) {
    if (type === "hours" && value > 24) {
      value = 24;
    }
    if (type === "minutes" && value > 60) {
      value = 60;
    }
    const newValue = { minutes: 0, hours: 0, ...props.value, [type]: value };
    props.onChange?.(newValue);
  }

  return (
    <div style={{ display: "flex" }}>
      <NumberField
        minValue={0}
        maxValue={24}
        onChange={(value) => onChange(value, "hours")}
        value={props.value?.hours ?? 0}
        id={props.id + "_hours"}
      />
      <NumberField
        minValue={0}
        maxValue={60}
        onChange={(value) => onChange(value, "minutes")}
        value={props.value?.minutes ?? 0}
        id={props.id + "_minutes"}
      />
    </div>
  );
}
