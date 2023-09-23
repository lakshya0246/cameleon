import { ComponentProps } from "react";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { Check } from "react-feather";
import classNames from "classnames";

export type CheckboxProps = ComponentProps<"input"> & {
  label: string;
  checked?: boolean;
  onCheckedChange?: (value: boolean) => void;
};

export function Checkbox(props: ComponentProps<"input"> & CheckboxProps) {
  return (
    <div className="checkbox-container">
      <RadixCheckbox.Root
        onCheckedChange={props.onCheckedChange}
        checked={props.checked}
        className={classNames("checkbox-root button icon", {
          primary: props.checked,
        })}
        defaultChecked
        id={props.id}
      >
        <RadixCheckbox.Indicator className="checkbox-indicator">
          {props.checked && <Check />}
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      <label className="checkbox-label display-body-1" htmlFor={props.id}>
        {props.label}
      </label>
    </div>
  );
}
