import { CustomElementDefinition } from "./custom-elements.types";

export class ButtonWithLoader extends HTMLButtonElement {
  static observedAttributes = ["loading"];
  public loading = false;
  private defaultInnerHtml: string | undefined = undefined;
  constructor() {
    super();
  }

  toggleIsLoading(newValue?: boolean) {
    this.loading = newValue ?? !this.loading;

    if (this.loading === true) {
      this.defaultInnerHtml = this.innerHTML;
      this.disabled = true;
      this.innerHTML = "loading...";
    }
    if (this.loading === false) {
      this.disabled = false;
      this.innerHTML = this.defaultInnerHtml ?? "Click";
    }
  }
}

export default {
  class: ButtonWithLoader,
  name: "button-loader",
  extends: "button",
} as CustomElementDefinition;
