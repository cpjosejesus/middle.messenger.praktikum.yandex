import { Block } from "@/utils/block";
import template from "./server-error.hbs";

export class ServerErrorPage extends Block {
  constructor() {
    super({});
  }

  override render(): string {
    return this.compile(template, this.props);
  }
}
