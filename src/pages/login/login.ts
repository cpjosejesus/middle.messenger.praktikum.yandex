import { Block } from "@/utils/block";
import { Input } from "@/components/input/input";
import { Button } from "@/components/button/button";
import { Router } from "@/utils/router";
import { validateEmail, validatePassword } from "@/utils/validation";
import template from "./login.hbs";

export class LoginPage extends Block {
  constructor() {
    const emailInput = new Input({
      name: "email",
      label: "Почта",
      type: "email",
      placeholder: "example@mail.ru",
    });

    const passwordInput = new Input({
      name: "password",
      label: "Пароль",
      type: "password",
      placeholder: "Пароль",
    });

    const submitButton = new Button({
      label: "Авторизоваться",
      type: "submit",
    });

    super({
      emailInput,
      passwordInput,
      submitButton,
    });

    this._addFormValidation(emailInput, passwordInput);
  }

  private _addFormValidation(emailInput: Input, passwordInput: Input): void {
    const form = this.element.querySelector("#loginForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = emailInput.getValue();
      const password = passwordInput.getValue();

      let valid = true;
      const emailError = validateEmail(email);
      if (emailError) {
        emailInput.setError(emailError);
        valid = false;
      } else {
        emailInput.clearError();
      }

      const passError = validatePassword(password);
      if (passError) {
        passwordInput.setError(passError);
        valid = false;
      } else {
        passwordInput.clearError();
      }

      if (valid) {
        console.log("Login form data:", { email, password });
        Router.getInstance().go("/messenger");
      }
    });
  }

  override render(): string {
    return this.compile(template, this.props);
  }
}
