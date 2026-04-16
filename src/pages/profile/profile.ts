import { Block } from "@/utils/block";
import { Avatar } from "@/components/avatar/avatar";
import { BackButton } from "@/components/back-button/back-button";
import { Button } from "@/components/button/button";
import router from "@/utils/router";
import template from "./profile.hbs";

export class ProfilePage extends Block {
  constructor() {
    const avatar = new Avatar({ initials: "ИИ", size: "lg", withUpload: true });

    const backButton = new BackButton({
      events: {
        click: () => router.go("/messenger"),
      },
    });

    const editProfileBtn = new Button({
      label: "Изменить данные",
      type: "button",
      className: "profile__actions-item profile__actions-item--link",
      events: {
        click: () => router.go("/settings/edit"),
      },
    });

    const changePasswordBtn = new Button({
      label: "Изменить пароль",
      type: "button",
      className: "profile__actions-item profile__actions-item--link",
      events: {
        click: () => router.go("/settings/password"),
      },
    });

    const logoutBtn = new Button({
      label: "Выйти",
      type: "button",
      className: "profile__actions-item profile__actions-item--danger",
      events: {
        click: () => router.go("/login"),
      },
    });

    super({
      avatar,
      backButton,
      editProfileBtn,
      changePasswordBtn,
      logoutBtn,
      displayName: "Иван Иванов",
      email: "ivan@mail.ru",
      login: "ivanivanov",
      first_name: "Иван",
      second_name: "Иванов",
      display_name: "Ivan",
      phone: "+7 (900) 123-45-67",
    });
  }

  override render(): string {
    return this.compile(template, this.props);
  }
}
