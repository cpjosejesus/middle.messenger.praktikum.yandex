import { Block } from "@/utils/block";
import template from "./back-button.hbs";

interface BackButtonProps {
  [key: string]: unknown;
  events?: { click?: EventListener };
}

export class BackButton extends Block<BackButtonProps> {
  constructor(props: BackButtonProps = {}) {
    super(props);
  }

  override render(): string {
    return this.compile(template, this.props);
  }
}
