import * as Dialog from "@radix-ui/react-dialog";
import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { Checkbox } from "../checkbox";
import { TextField } from "../textField";

type SelectType<T extends {}> = {
  value?: string;
  label: string;
  context?: T;
};
type SelectProps<T extends {} = {}> = {
  options: SelectType<T>[];
  value?: SelectType<T>;
  onChange?: (id: string, option: SelectType<T>) => void;
  isMultiSelect?: boolean;
};
export function Select<T extends {} = {}>(
  props: PropsWithChildren<SelectProps<T>>
) {
  const [search, setSearch] = useState("");
  const filteredOptions = useMemo(() => {
    return props.options.filter((item) =>
      item.label.toLowerCase().includes(search.toLowerCase())
    );
  }, [props.options, search]);
  const [checkedItems, setCheckedItems] = useState<
    Partial<Record<string, boolean>>
  >({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setCheckedItems({ [props.value?.value ?? ""]: true });
  }, [props.value]);

  function onItemClick(id?: string) {
    if (!id) {
      return;
    }
    if (props.isMultiSelect) {
      setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
    } else {
      setCheckedItems((prev) => ({ [id]: !prev[id] }));
      props.onChange?.(
        id,
        props.options.find((option) => option.value === id)!
      );
      setOpen(false);
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{props.children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="menu-overlay" />
        <Dialog.Content className="menu-container">
          <div className="menu-search-container">
            <TextField
              value={search}
              onChange={setSearch}
              placeholder="Search"
              type="search"
            />
          </div>
          <div className="menu-items">
            {filteredOptions.map((option) => {
              return (
                <Checkbox
                  checked={checkedItems[option.value ?? ""]}
                  onClick={() => onItemClick(option.value)}
                  key={option.value}
                  label={option.label}
                  className="menu-item"
                />
              );
            })}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
