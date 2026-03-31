import { Block } from "@/utils/block";
import { Input } from "@/components/input/input";
import { Button } from "@/components/button/button";
import { Avatar } from "@/components/avatar/avatar";
import template from "./edit-profile.hbs";

export class EditProfilePage extends Block {
  constructor() {
    super({
      avatar: new Avatar({ initials: "ИИ", size: "lg", withUpload: true }),
      emailInput: new Input({
        name: "email",
        label: "Почта",
        type: "email",
        value: "ivan@mail.ru",
      }),
      loginInput: new Input({
        name: "login",
        label: "Логин",
        value: "ivanivanov",
      }),
      firstNameInput: new Input({
        name: "first_name",
        label: "Имя",
        value: "Иван",
      }),
      secondNameInput: new Input({
        name: "second_name",
        label: "Фамилия",
        value: "Иванов",
      }),
      displayNameInput: new Input({
        name: "display_name",
        label: "Имя в чате",
        value: "Ivan",
      }),
      phoneInput: new Input({
        name: "phone",
        label: "Телефон",
        type: "tel",
        value: "+79001234567",
      }),
      saveButton: new Button({ label: "Сохранить", type: "submit" }),
    });
  }

  override render(): string {
    return this.compile(template, this.props);
  }
}
