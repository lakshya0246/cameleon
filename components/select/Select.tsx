import * as Dialog from "@radix-ui/react-dialog";
import { ComponentPropsWithoutRef, PropsWithChildren, forwardRef } from "react";
import { Checkbox } from "../checkbox";
import { TextField } from "../textField";

type Props = {};
export function Select(props: PropsWithChildren<Props>) {
  const children = Array.isArray(props.children)
    ? props.children
    : [props.children];

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children?.[0]}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="menu-overlay" />
        <Dialog.Content className="menu-container">
          <div className="menu-search-container">
            <TextField placeholder="Search" type="search" />
          </div>
          <div className="menu-items">{children.slice(1)}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export const SelectItem = forwardRef<
  HTMLDivElement,
  Omit<ComponentPropsWithoutRef<"div">, "children"> & {
    value?: string;
    disabled?: boolean;
    children?: string;
  }
>(function SelectItem({ children, className, value, disabled, ...props }, ref) {
  return (
    <Checkbox hideIndicator className="menu-item" label={children ?? ""} />
  );
});
