import * as Dialog from "@radix-ui/react-dialog";
import styles from "./SideDrawer.module.scss";
import { ReactNode } from "react";
import { X } from "react-feather";
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
        <Dialog.Overlay className={styles.sideDrawerOverlay} />
        <Dialog.Content className={styles.sideDrawer}>
          {props.title && (
            <Dialog.Title className="DialogTitle">{props.title}</Dialog.Title>
          )}
          {Body ?? ""}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
