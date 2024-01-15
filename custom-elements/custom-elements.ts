"use client";
import { CustomElementDefinition } from "./custom-elements.types";
import button from "./button";
const ELEMENTS: CustomElementDefinition[] = [button];

export function registerCameleonCustomElements() {
  ELEMENTS.forEach((element) => {
    if (customElements.get(element.name)) {
      return;
    }
    customElements.define(element.name, element.class, {
      extends: element.extends,
    });
  });
}
