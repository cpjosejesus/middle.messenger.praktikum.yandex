import { Block } from "@/utils/block";
import { Input } from "@/components/input/input";
import { Button } from "@/components/button/button";
import { Avatar } from "@/components/avatar/avatar";
import { validatePassword } from "@/utils/validation";
import template from "./change-password.hbs";

export class ChangePasswordPage extends Block {
  private oldPasswordInput!: Input;
  private newPasswordInput!: Input;
  private confirmPasswordInput!: Input;

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

    super({
      avatar,
      oldPasswordInput,
      newPasswordInput,
      confirmPasswordInput,
      saveButton,
    });

    this.oldPasswordInput = oldPasswordInput;
    this.newPasswordInput = newPasswordInput;
    this.confirmPasswordInput = confirmPasswordInput;
  }

  override componentDidMount(): void {
    const form = this.element.querySelector<HTMLFormElement>(
      "#changePasswordForm",
    );
    form?.addEventListener("submit", (e: Event) => {
      e.preventDefault();

      const oldPassword = this.oldPasswordInput.getValue();
      const newPassword = this.newPasswordInput.getValue();
      const confirmPassword = this.confirmPasswordInput.getValue();

      const oldError = validatePassword(oldPassword);
      const newError = validatePassword(newPassword);
      const confirmError =
        !confirmPassword
          ? "Обязательное поле"
          : confirmPassword !== newPassword
            ? "Пароли не совпадают"
            : null;

      if (oldError) this.oldPasswordInput.setError(oldError);
      else this.oldPasswordInput.clearError();

      if (newError) this.newPasswordInput.setError(newError);
      else this.newPasswordInput.clearError();

      if (confirmError) this.confirmPasswordInput.setError(confirmError);
      else this.confirmPasswordInput.clearError();

      if (!oldError && !newError && !confirmError) {
        console.log({ old_password: oldPassword, new_password: newPassword });
      }
    });

    const backButton =
      this.element.querySelector<HTMLButtonElement>("#backButton");
    backButton?.addEventListener("click", () => {
      history.back();
    });
  }

  override render(): string {
    return this.compile(template, this.props);
  }
}
