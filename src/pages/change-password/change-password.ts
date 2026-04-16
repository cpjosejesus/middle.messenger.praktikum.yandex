import { Block } from "@/utils/block";
import { Input } from "@/components/input/input";
import { Button } from "@/components/button/button";
import { Avatar } from "@/components/avatar/avatar";
import { BackButton } from "@/components/back-button/back-button";
import { validatePassword } from "@/utils/validation";
import template from "./change-password.hbs";

export class ChangePasswordPage extends Block {
  constructor() {
    const oldPasswordInput = new Input({
      name: "old_password",
      label: "Старый пароль",
      type: "password",
      events: {
        focusout: () => {
          const error = validatePassword(oldPasswordInput.getValue());
          if (error) oldPasswordInput.setError(error);
          else oldPasswordInput.clearError();
        },
      },
    });

    const newPasswordInput = new Input({
      name: "new_password",
      label: "Новый пароль",
      type: "password",
      events: {
        focusout: () => {
          const error = validatePassword(newPasswordInput.getValue());
          if (error) newPasswordInput.setError(error);
          else newPasswordInput.clearError();
        },
      },
    });

    const confirmPasswordInput = new Input({
      name: "new_password_again",
      label: "Повторите новый пароль",
      type: "password",
      events: {
        focusout: () => {
          const value = confirmPasswordInput.getValue();
          if (!value) {
            confirmPasswordInput.setError("Обязательное поле");
          } else if (value !== newPasswordInput.getValue()) {
            confirmPasswordInput.setError("Пароли не совпадают");
          } else {
            confirmPasswordInput.clearError();
          }
        },
      },
    });

    const saveButton = new Button({ label: "Сохранить", type: "submit" });
    const avatar = new Avatar({ initials: "ИИ", size: "lg" });

    const backButton = new BackButton({
      events: {
        click: () => history.back(),
      },
    });

    super({
      avatar,
      backButton,
      oldPasswordInput,
      newPasswordInput,
      confirmPasswordInput,
      saveButton,
      events: {
        submit: (e: Event) => {
          e.preventDefault();

          const oldPassword = oldPasswordInput.getValue();
          const newPassword = newPasswordInput.getValue();
          const confirmPassword = confirmPasswordInput.getValue();

          const oldError = validatePassword(oldPassword);
          const newError = validatePassword(newPassword);
          const confirmError =
            !confirmPassword
              ? "Обязательное поле"
              : confirmPassword !== newPassword
                ? "Пароли не совпадают"
                : null;

          if (oldError) oldPasswordInput.setError(oldError);
          else oldPasswordInput.clearError();

          if (newError) newPasswordInput.setError(newError);
          else newPasswordInput.clearError();

          if (confirmError) confirmPasswordInput.setError(confirmError);
          else confirmPasswordInput.clearError();

          if (!oldError && !newError && !confirmError) {
            console.log({ old_password: oldPassword, new_password: newPassword });
          }
        },
      },
    });

  }

  override render(): string {
    return this.compile(template, this.props);
  }
}
