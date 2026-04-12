import { Block } from "@/utils/block";
import { Input } from "@/components/input/input";
import { Button } from "@/components/button/button";
import { Avatar } from "@/components/avatar/avatar";
import {
  validateEmail,
  validateLogin,
  validateName,
  validatePhone,
  validateRequired,
} from "@/utils/validation";
import template from "./edit-profile.hbs";

export class EditProfilePage extends Block {
  private emailInput!: Input;
  private loginInput!: Input;
  private firstNameInput!: Input;
  private secondNameInput!: Input;
  private displayNameInput!: Input;
  private phoneInput!: Input;

  constructor() {
    const emailInput = new Input({
      name: "email",
      label: "Почта",
      type: "email",
      value: "ivan@mail.ru",
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
      value: "ivanivanov",
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
      value: "Иван",
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
      value: "Иванов",
      events: {
        focusout: () => {
          const error = validateName(secondNameInput.getValue());
          if (error) secondNameInput.setError(error);
          else secondNameInput.clearError();
        },
      },
    });

    const displayNameInput = new Input({
      name: "display_name",
      label: "Имя в чате",
      value: "Ivan",
      events: {
        focusout: () => {
          const error = validateRequired(displayNameInput.getValue());
          if (error) displayNameInput.setError(error);
          else displayNameInput.clearError();
        },
      },
    });

    const phoneInput = new Input({
      name: "phone",
      label: "Телефон",
      type: "tel",
      value: "+79001234567",
      events: {
        focusout: () => {
          const error = validatePhone(phoneInput.getValue());
          if (error) phoneInput.setError(error);
          else phoneInput.clearError();
        },
      },
    });

    const saveButton = new Button({ label: "Сохранить", type: "submit" });
    const avatar = new Avatar({ initials: "ИИ", size: "lg", withUpload: true });

    super({
      avatar,
      emailInput,
      loginInput,
      firstNameInput,
      secondNameInput,
      displayNameInput,
      phoneInput,
      saveButton,
    });

    this.emailInput = emailInput;
    this.loginInput = loginInput;
    this.firstNameInput = firstNameInput;
    this.secondNameInput = secondNameInput;
    this.displayNameInput = displayNameInput;
    this.phoneInput = phoneInput;
  }

  override componentDidMount(): void {
    const form =
      this.element.querySelector<HTMLFormElement>("#editProfileForm");
    form?.addEventListener("submit", (e: Event) => {
      e.preventDefault();

      const values = {
        email: this.emailInput.getValue(),
        login: this.loginInput.getValue(),
        first_name: this.firstNameInput.getValue(),
        second_name: this.secondNameInput.getValue(),
        display_name: this.displayNameInput.getValue(),
        phone: this.phoneInput.getValue(),
      };

      const errors = {
        email: validateEmail(values.email),
        login: validateLogin(values.login),
        first_name: validateName(values.first_name),
        second_name: validateName(values.second_name),
        display_name: validateRequired(values.display_name),
        phone: validatePhone(values.phone),
      };

      if (errors.email) this.emailInput.setError(errors.email);
      else this.emailInput.clearError();

      if (errors.login) this.loginInput.setError(errors.login);
      else this.loginInput.clearError();

      if (errors.first_name) this.firstNameInput.setError(errors.first_name);
      else this.firstNameInput.clearError();

      if (errors.second_name)
        this.secondNameInput.setError(errors.second_name);
      else this.secondNameInput.clearError();

      if (errors.display_name)
        this.displayNameInput.setError(errors.display_name);
      else this.displayNameInput.clearError();

      if (errors.phone) this.phoneInput.setError(errors.phone);
      else this.phoneInput.clearError();

      const hasErrors = Object.values(errors).some((e) => e !== null);
      if (!hasErrors) {
        console.log(values);
      }
    });

    const backButton = this.element.querySelector<HTMLButtonElement>("#backButton");
    backButton?.addEventListener("click", () => {
      history.back();
    });
  }

  override render(): string {
    return this.compile(template, this.props);
  }
}
