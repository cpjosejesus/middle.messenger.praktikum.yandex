import { Block } from "@/utils/block";
import { Input } from "@/components/input/input";
import { Button } from "@/components/button/button";
import { Avatar } from "@/components/avatar/avatar";
import { BackButton } from "@/components/back-button/back-button";
import {
  validateEmail,
  validateLogin,
  validateName,
  validatePhone,
  validateRequired,
} from "@/utils/validation";
import template from "./edit-profile.hbs";

export class EditProfilePage extends Block {
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

    const backButton = new BackButton({
      events: {
        click: () => history.back(),
      },
    });

    super({
      avatar,
      backButton,
      emailInput,
      loginInput,
      firstNameInput,
      secondNameInput,
      displayNameInput,
      phoneInput,
      saveButton,
      events: {
        submit: (e: Event) => {
          e.preventDefault();

          const values = {
            email: emailInput.getValue(),
            login: loginInput.getValue(),
            first_name: firstNameInput.getValue(),
            second_name: secondNameInput.getValue(),
            display_name: displayNameInput.getValue(),
            phone: phoneInput.getValue(),
          };

          const errors = {
            email: validateEmail(values.email),
            login: validateLogin(values.login),
            first_name: validateName(values.first_name),
            second_name: validateName(values.second_name),
            display_name: validateRequired(values.display_name),
            phone: validatePhone(values.phone),
          };

          if (errors.email) emailInput.setError(errors.email);
          else emailInput.clearError();

          if (errors.login) loginInput.setError(errors.login);
          else loginInput.clearError();

          if (errors.first_name) firstNameInput.setError(errors.first_name);
          else firstNameInput.clearError();

          if (errors.second_name) secondNameInput.setError(errors.second_name);
          else secondNameInput.clearError();

          if (errors.display_name) displayNameInput.setError(errors.display_name);
          else displayNameInput.clearError();

          if (errors.phone) phoneInput.setError(errors.phone);
          else phoneInput.clearError();

          const hasErrors = Object.values(errors).some((err) => err !== null);
          if (!hasErrors) {
            console.log(values);
          }
        },
      },
    });

  }

  override render(): string {
    return this.compile(template, this.props);
  }
}
