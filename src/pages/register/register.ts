import { Block } from "@/utils/block";
import { Input } from "@/components/input/input";
import { Button } from "@/components/button/button";
import {
  validateEmail,
  validateLogin,
  validateName,
  validatePhone,
  validatePassword,
} from "@/utils/validation";
import template from "./register.hbs";

export class RegisterPage extends Block {
  private emailInput!: Input;
  private loginInput!: Input;
  private firstNameInput!: Input;
  private secondNameInput!: Input;
  private phoneInput!: Input;
  private passwordInput!: Input;
  private passwordAgainInput!: Input;

  constructor() {
    const emailInput = new Input({
      name: "email",
      label: "Почта",
      type: "email",
      placeholder: "example@mail.ru",
      events: {
        focusout: () => {
          const error = validateEmail(emailInput.getValue());
          if (error) emailInput.setError(error);
          else emailInput.clearError();
        },
      },
    });

    const loginInput = new Input({
      name: "login",
      label: "Логин",
      placeholder: "ivanivanov",
      events: {
        focusout: () => {
          const error = validateLogin(loginInput.getValue());
          if (error) loginInput.setError(error);
          else loginInput.clearError();
        },
      },
    });

    const firstNameInput = new Input({
      name: "first_name",
      label: "Имя",
      placeholder: "Иван",
      events: {
        focusout: () => {
          const error = validateName(firstNameInput.getValue());
          if (error) firstNameInput.setError(error);
          else firstNameInput.clearError();
        },
      },
    });

    const secondNameInput = new Input({
      name: "second_name",
      label: "Фамилия",
      placeholder: "Иванов",
      events: {
        focusout: () => {
          const error = validateName(secondNameInput.getValue());
          if (error) secondNameInput.setError(error);
          else secondNameInput.clearError();
        },
      },
    });

    const phoneInput = new Input({
      name: "phone",
      label: "Телефон",
      type: "tel",
      placeholder: "+79001234567",
      events: {
        focusout: () => {
          const error = validatePhone(phoneInput.getValue());
          if (error) phoneInput.setError(error);
          else phoneInput.clearError();
        },
      },
    });

    const passwordInput = new Input({
      name: "password",
      label: "Пароль",
      type: "password",
      placeholder: "Пароль",
      events: {
        focusout: () => {
          const error = validatePassword(passwordInput.getValue());
          if (error) passwordInput.setError(error);
          else passwordInput.clearError();
        },
      },
    });

    const passwordAgainInput = new Input({
      name: "password_again",
      label: "Пароль (ещё раз)",
      type: "password",
      placeholder: "Пароль",
      events: {
        focusout: () => {
          const value = passwordAgainInput.getValue();
          if (!value) {
            passwordAgainInput.setError("Обязательное поле");
          } else if (value !== passwordInput.getValue()) {
            passwordAgainInput.setError("Пароли не совпадают");
          } else {
            passwordAgainInput.clearError();
          }
        },
      },
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

    this.emailInput = emailInput;
    this.loginInput = loginInput;
    this.firstNameInput = firstNameInput;
    this.secondNameInput = secondNameInput;
    this.phoneInput = phoneInput;
    this.passwordInput = passwordInput;
    this.passwordAgainInput = passwordAgainInput;
  }

  override componentDidMount(): void {
    const form = this.element.querySelector<HTMLFormElement>("#registerForm");
    form?.addEventListener("submit", (e: Event) => {
      e.preventDefault();

      const values = {
        email: this.emailInput.getValue(),
        login: this.loginInput.getValue(),
        first_name: this.firstNameInput.getValue(),
        second_name: this.secondNameInput.getValue(),
        phone: this.phoneInput.getValue(),
        password: this.passwordInput.getValue(),
        password_again: this.passwordAgainInput.getValue(),
      };

      const errors = {
        email: validateEmail(values.email),
        login: validateLogin(values.login),
        first_name: validateName(values.first_name),
        second_name: validateName(values.second_name),
        phone: validatePhone(values.phone),
        password: validatePassword(values.password),
        password_again:
          !values.password_again
            ? "Обязательное поле"
            : values.password_again !== values.password
              ? "Пароли не совпадают"
              : null,
      };

      if (errors.email) this.emailInput.setError(errors.email);
      else this.emailInput.clearError();

      if (errors.login) this.loginInput.setError(errors.login);
      else this.loginInput.clearError();

      if (errors.first_name) this.firstNameInput.setError(errors.first_name);
      else this.firstNameInput.clearError();

      if (errors.second_name) this.secondNameInput.setError(errors.second_name);
      else this.secondNameInput.clearError();

      if (errors.phone) this.phoneInput.setError(errors.phone);
      else this.phoneInput.clearError();

      if (errors.password) this.passwordInput.setError(errors.password);
      else this.passwordInput.clearError();

      if (errors.password_again)
        this.passwordAgainInput.setError(errors.password_again);
      else this.passwordAgainInput.clearError();

      const hasErrors = Object.values(errors).some((e) => e !== null);
      if (!hasErrors) {
        console.log(values);
      }
    });
  }

  override render(): string {
    return this.compile(template, this.props);
  }
}
