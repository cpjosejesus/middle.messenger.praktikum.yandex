import { Block } from "@/utils/block";
import { Input } from "@/components/input/input";
import { Button } from "@/components/button/button";
import { Router } from "@/utils/router";
import {
  validateEmail,
  validateLogin,
  validateName,
  validatePhone,
  validatePassword,
} from "@/utils/validation";
import template from "./register.hbs";

export class RegisterPage extends Block {
  constructor() {
    const emailInput = new Input({
      name: "email",
      label: "Почта",
      type: "email",
      placeholder: "example@mail.ru",
    });
    const loginInput = new Input({
      name: "login",
      label: "Логин",
      placeholder: "ivanivanov",
    });
    const firstNameInput = new Input({
      name: "first_name",
      label: "Имя",
      placeholder: "Иван",
    });
    const secondNameInput = new Input({
      name: "second_name",
      label: "Фамилия",
      placeholder: "Иванов",
    });
    const phoneInput = new Input({
      name: "phone",
      label: "Телефон",
      type: "tel",
      placeholder: "+79001234567",
    });
    const passwordInput = new Input({
      name: "password",
      label: "Пароль",
      type: "password",
      placeholder: "Пароль",
    });
    const submitButton = new Button({
      label: "Зарегистрироваться",
      type: "submit",
    });

    super({
      emailInput,
      loginInput,
      firstNameInput,
      secondNameInput,
      phoneInput,
      passwordInput,
      submitButton,
    });

    this._addFormValidation(
      emailInput,
      loginInput,
      firstNameInput,
      secondNameInput,
      phoneInput,
      passwordInput,
    );
  }

  private _addFormValidation(
    emailInput: Input,
    loginInput: Input,
    firstNameInput: Input,
    secondNameInput: Input,
    phoneInput: Input,
    passwordInput: Input,
  ): void {
    const form = this.element.querySelector("#registerForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;
      const fields: Array<[Input, string, (v: string) => string | null]> = [
        [emailInput, emailInput.getValue(), validateEmail],
        [loginInput, loginInput.getValue(), validateLogin],
        [firstNameInput, firstNameInput.getValue(), validateName],
        [secondNameInput, secondNameInput.getValue(), validateName],
        [phoneInput, phoneInput.getValue(), validatePhone],
        [passwordInput, passwordInput.getValue(), validatePassword],
      ];

      fields.forEach(([input, value, validator]) => {
        const error = validator(value);
        if (error) {
          input.setError(error);
          valid = false;
        } else {
          input.clearError();
        }
      });

      if (valid) {
        const data = {
          email: emailInput.getValue(),
          login: loginInput.getValue(),
          first_name: firstNameInput.getValue(),
          second_name: secondNameInput.getValue(),
          phone: phoneInput.getValue(),
          password: passwordInput.getValue(),
        };
        console.log("Register form data:", data);
        Router.getInstance().go("/login");
      }
    });
  }

  override render(): string {
    return this.compile(template, this.props);
  }
}
