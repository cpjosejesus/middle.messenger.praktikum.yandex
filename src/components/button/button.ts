import { Block } from "@/utils/block";
import template from "./button.hbs";

interface ButtonProps {
  [key: string]: unknown;
  label: string;
  type?: string;
  modifier?: string;
  className?: string;
  events?: {
    click?: EventListener;
  };
}

export class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super(props);
  }

  override render(): string {
    return this.compile(template, this.props);
  }
}
