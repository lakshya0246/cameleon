import { format, parse } from "date-fns";
import { ChangeEventHandler, InputHTMLAttributes } from "react";

type Props = {
  value?: Date;
  onChange?: (value: Date) => void;
};

export function DateField(
  props: Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> &
    Props
) {
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const parsed = parse(e.target.value, "yyyy-MM-dd", new Date());
    props.onChange?.(parsed);
  };
  return (
    <input
      value={format(props.value ?? new Date(), "yyyy-MM-dd")}
      onChange={onChange}
      type="date"
      id="date"
    />
  );
}
