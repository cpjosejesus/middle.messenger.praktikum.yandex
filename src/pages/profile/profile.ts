import { Block } from "@/utils/block";
import { Avatar } from "@/components/avatar/avatar";
import template from "./profile.hbs";

export class ProfilePage extends Block {
  constructor() {
    const avatar = new Avatar({ initials: "ИИ", size: "lg" });

    super({
      avatar,
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
