import { Block } from "@/utils/block";
import template from "./not-found.hbs";

export class NotFoundPage extends Block {
  constructor() {
    super({});
  }

  override render(): string {
    return this.compile(template, this.props);
  }
}
