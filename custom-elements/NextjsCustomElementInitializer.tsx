"use client";
import { useState } from "react";
import { registerCameleonCustomElements } from "./index";

export function NextJsCustomElemntInitializer() {
  const _ = useState(registerCameleonCustomElements());

  return <></>;
}
