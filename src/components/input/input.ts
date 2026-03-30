import { Block } from "@/utils/block";
import template from "./input.hbs";

interface InputProps {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  error?: string;
  events?: {
    blur?: EventListener;
    focus?: EventListener;
    input?: EventListener;
  };
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
    this.setProps({ error } as Partial<InputProps>);
  }

  clearError(): void {
    this.setProps({ error: "" } as Partial<InputProps>);
  }
}
