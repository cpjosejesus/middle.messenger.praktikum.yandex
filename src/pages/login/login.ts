import { Block } from "@/utils/block";
import { Input } from "@/components/input/input";
import { Button } from "@/components/button/button";
import template from "./login.hbs";

export class LoginPage extends Block {
  constructor() {
    super({
      emailInput: new Input({
        name: "login",
        label: "Логин",
        placeholder: "ivanivanov",
      }),
      passwordInput: new Input({
        name: "password",
        label: "Пароль",
        type: "password",
        placeholder: "Пароль",
      }),
      submitButton: new Button({ label: "Авторизоваться", type: "submit" }),
    });
  }

  override render(): string {
    return this.compile(template, this.props);
  }
}
