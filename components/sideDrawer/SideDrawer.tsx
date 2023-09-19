import * as Dialog from "@radix-ui/react-dialog";
import React, { ReactNode } from "react";

type Props = {
  children?: ReactNode | ReactNode[];
  title?: string;
  onSubmit?: () => void;
};
export function SideDrawer(props: Props & Dialog.DialogProps) {
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
        <Dialog.Overlay className="sidedrawer-overlay" />
        <Dialog.Content className="sidedrawer-content">
          <div className="sidedrawer-header">
            {props.title && (
              <Dialog.Title className="display-heading-1">
                {props.title}
              </Dialog.Title>
            )}
          </div>
          <div className="sidedrawer-body">{Body ?? ""}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
