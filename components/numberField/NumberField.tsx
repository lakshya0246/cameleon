import { AriaNumberFieldProps, useNumberField } from "@react-aria/numberfield";
import { useNumberFieldState } from "@react-stately/numberfield";
import { useRef } from "react";

export function NumberField(props: AriaNumberFieldProps) {
  let state = useNumberFieldState({ ...props, locale: "en-US" });
  let inputRef = useRef(null);
  let { inputProps } = useNumberField(props, state, inputRef);

  return (
    <>
      <input {...inputProps} ref={inputRef} />
    </>
  );
}
