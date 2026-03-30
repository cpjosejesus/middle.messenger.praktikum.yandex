import { Block } from "@/utils/block";
import template from "./home.hbs";

export class HomePage extends Block {
  constructor() {
    super({});
  }

  override render(): string {
    return this.compile(template, this.props);
  }
}
