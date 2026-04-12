import { Block } from "@/utils/block";
import template from "./input.hbs";

interface InputProps {
  [key: string]: unknown;
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  error?: string;
  events?: Record<string, EventListener>;
}

export class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super(props);
  }

  override render(): string {
    return this.compile(template, this.props);
  }

  getValue(): string {
    const input = this.element.querySelector("input");
    return input?.value ?? "";
  }

  setError(error: string): void {
    const currentValue = this.getValue();
    this.setProps({ error, value: currentValue });
  }

  clearError(): void {
    const currentValue = this.getValue();
    this.setProps({ error: "", value: currentValue });
  }
}
