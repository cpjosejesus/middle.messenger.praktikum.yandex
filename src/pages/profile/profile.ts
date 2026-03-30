import { Block } from "@/utils/block";
import { Avatar } from "@/components/avatar/avatar";
import { Router } from "@/utils/router";
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

    this._addNavigation();
  }

  private _addNavigation(): void {
    const router = Router.getInstance();
    this.element.querySelector("#backButton")?.addEventListener("click", () => router.go("/messenger"));
    this.element.querySelector("#editProfile")?.addEventListener("click", () => router.go("/settings/edit"));
    this.element.querySelector("#changePassword")?.addEventListener("click", () => router.go("/settings/password"));
    this.element.querySelector("#logout")?.addEventListener("click", () => router.go("/"));
  }

  override render(): string {
    return this.compile(template, this.props);
  }
}
