import { Block } from "@/utils/block";
import { Input } from "@/components/input/input";
import { Button } from "@/components/button/button";
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
    const passwordAgainInput = new Input({
      name: "password_again",
      label: "Пароль (ещё раз)",
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
      passwordAgainInput,
      submitButton,
    });
  }

  override render(): string {
    return this.compile(template, this.props);
  }
}
