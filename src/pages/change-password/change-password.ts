import { Block } from "@/utils/block";
import { Input } from "@/components/input/input";
import { Button } from "@/components/button/button";
import { Avatar } from "@/components/avatar/avatar";
import template from "./change-password.hbs";

export class ChangePasswordPage extends Block {
  constructor() {
    super({
      avatar: new Avatar({ initials: "ИИ", size: "lg" }),
      oldPasswordInput: new Input({
        name: "oldPassword",
        label: "Старый пароль",
        type: "password",
      }),
      newPasswordInput: new Input({
        name: "newPassword",
        label: "Новый пароль",
        type: "password",
      }),
      confirmPasswordInput: new Input({
        name: "confirmPassword",
        label: "Повторите новый пароль",
        type: "password",
      }),
      saveButton: new Button({ label: "Сохранить", type: "submit" }),
    });
  }

  override render(): string {
    return this.compile(template, this.props);
  }
}
