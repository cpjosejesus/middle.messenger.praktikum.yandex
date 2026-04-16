import { Block } from "@/utils/block";
import { Input } from "@/components/input/input";
import { Button } from "@/components/button/button";
import { validateLogin, validatePassword } from "@/utils/validation";
import template from "./login.hbs";

export class LoginPage extends Block {
  constructor() {
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

    const submitButton = new Button({ label: "Авторизоваться", type: "submit" });

    super({
      loginInput,
      passwordInput,
      submitButton,
      events: {
        submit: (e: Event) => {
          e.preventDefault();

          const loginValue = loginInput.getValue();
          const passwordValue = passwordInput.getValue();

          const loginError = validateLogin(loginValue);
          const passwordError = validatePassword(passwordValue);

          if (loginError) loginInput.setError(loginError);
          else loginInput.clearError();

          if (passwordError) passwordInput.setError(passwordError);
          else passwordInput.clearError();

          if (!loginError && !passwordError) {
            console.log({ login: loginValue, password: passwordValue });
          }
        },
      },
    });

  }

  override render(): string {
    return this.compile(template, this.props);
  }
}
