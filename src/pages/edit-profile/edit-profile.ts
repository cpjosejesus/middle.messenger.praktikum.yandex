import { Block } from "@/utils/block";
import { Input } from "@/components/input/input";
import { Button } from "@/components/button/button";
import { Avatar } from "@/components/avatar/avatar";
import { Router } from "@/utils/router";
import { validateEmail, validateLogin, validateName, validatePhone } from "@/utils/validation";
import template from "./edit-profile.hbs";

export class EditProfilePage extends Block {
  constructor() {
    const avatar = new Avatar({ initials: "ИИ", size: "lg" });
    const emailInput = new Input({ name: "email", label: "Почта", type: "email", value: "ivan@mail.ru" });
    const loginInput = new Input({ name: "login", label: "Логин", value: "ivanivanov" });
    const firstNameInput = new Input({ name: "first_name", label: "Имя", value: "Иван" });
    const secondNameInput = new Input({ name: "second_name", label: "Фамилия", value: "Иванов" });
    const displayNameInput = new Input({ name: "display_name", label: "Имя в чате", value: "Ivan" });
    const phoneInput = new Input({ name: "phone", label: "Телефон", type: "tel", value: "+79001234567" });
    const saveButton = new Button({ label: "Сохранить", type: "submit" });

    super({ avatar, emailInput, loginInput, firstNameInput, secondNameInput, displayNameInput, phoneInput, saveButton });

    this._addFormValidation(emailInput, loginInput, firstNameInput, secondNameInput, phoneInput);
    this.element.querySelector("#backButton")?.addEventListener("click", () => Router.getInstance().go("/settings"));
  }

  private _addFormValidation(
    emailInput: Input, loginInput: Input, firstNameInput: Input, secondNameInput: Input, phoneInput: Input
  ): void {
    const form = this.element.querySelector("#editProfileForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;
      const checks: Array<[Input, (v: string) => string | null]> = [
        [emailInput, validateEmail],
        [loginInput, validateLogin],
        [firstNameInput, validateName],
        [secondNameInput, validateName],
        [phoneInput, validatePhone],
      ];
      checks.forEach(([input, fn]) => {
        const err = fn(input.getValue());
        if (err) { input.setError(err); valid = false; }
        else input.clearError();
      });
      if (valid) {
        console.log("Profile updated");
        Router.getInstance().go("/settings");
      }
    });
  }

  override render(): string {
    return this.compile(template, this.props);
  }
}
