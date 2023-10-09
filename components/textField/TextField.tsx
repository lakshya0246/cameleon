import { ChangeEventHandler, ComponentProps } from "react";

type Props = {
  value?: string;
  onChange?: (value: string) => void;
};
export function TextField(
  props: Omit<ComponentProps<"input">, "onChange"> & Props
) {
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    props.onChange?.(e.target.value);
  };
  return (
    <input type="text" {...props} onChange={onChange} value={props.value} />
  );
}
