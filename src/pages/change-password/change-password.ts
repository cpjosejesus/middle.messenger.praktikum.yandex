import { Block } from "@/utils/block";
import { Input } from "@/components/input/input";
import { Button } from "@/components/button/button";
import { Avatar } from "@/components/avatar/avatar";
import { Router } from "@/utils/router";
import { validatePassword } from "@/utils/validation";
import template from "./change-password.hbs";

export class ChangePasswordPage extends Block {
  constructor() {
    const avatar = new Avatar({ initials: "ИИ", size: "lg" });
    const oldPasswordInput = new Input({ name: "oldPassword", label: "Старый пароль", type: "password" });
    const newPasswordInput = new Input({ name: "newPassword", label: "Новый пароль", type: "password" });
    const confirmPasswordInput = new Input({ name: "confirmPassword", label: "Повторите новый пароль", type: "password" });
    const saveButton = new Button({ label: "Сохранить", type: "submit" });

    super({ avatar, oldPasswordInput, newPasswordInput, confirmPasswordInput, saveButton });

    this._addFormValidation(oldPasswordInput, newPasswordInput, confirmPasswordInput);
    this.element.querySelector("#backButton")?.addEventListener("click", () => Router.getInstance().go("/settings"));
  }

  private _addFormValidation(
    oldPasswordInput: Input, newPasswordInput: Input, confirmPasswordInput: Input
  ): void {
    const form = this.element.querySelector("#changePasswordForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;

      const oldErr = validatePassword(oldPasswordInput.getValue());
      if (oldErr) { oldPasswordInput.setError(oldErr); valid = false; }
      else oldPasswordInput.clearError();

      const newErr = validatePassword(newPasswordInput.getValue());
      if (newErr) { newPasswordInput.setError(newErr); valid = false; }
      else newPasswordInput.clearError();

      if (newPasswordInput.getValue() !== confirmPasswordInput.getValue()) {
        confirmPasswordInput.setError("Пароли не совпадают");
        valid = false;
      } else {
        confirmPasswordInput.clearError();
      }

      if (valid) {
        console.log("Password changed");
        Router.getInstance().go("/settings");
      }
    });
  }

  override render(): string {
    return this.compile(template, this.props);
  }
}
