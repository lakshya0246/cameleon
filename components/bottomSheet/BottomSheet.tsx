import * as Dialog from "@radix-ui/react-dialog";
import React, { ReactNode } from "react";
import { X } from "react-feather";

type Props = {
  children?: ReactNode | ReactNode[];
  title?: string;
};
export function BottomSheet(props: Props & Dialog.DialogProps) {
  const Trigger = Array.isArray(props.children)
    ? props.children[0]
    : props.children;

  const Body = Array.isArray(props.children) ? props.children[1] : null;

  return (
    <Dialog.Root {...props}>
      <Dialog.Trigger asChild>
        {Trigger ?? "Trigger not provided"}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bottomsheet-overlay" />
        <Dialog.Content className="bottomsheet-content">
          <div className="bottomsheet-body">{Body ?? ""}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
