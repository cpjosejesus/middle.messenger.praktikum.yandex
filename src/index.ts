import "@/styles/global.css";
import "@/styles/auth.css";
import "@/styles/error-page.css";
import "@/styles/profile.css";
import "@/components/button/button.css";
import "@/components/input/input.css";
import "@/components/avatar/avatar.css";
import "@/components/chat-item/chat-item.css";
import "@/pages/profile/profile.css";
import "@/pages/messenger/messenger.css";
import "@/pages/home/home.css";

import { registerHelpers } from "@/utils/helpers";
import router from "@/utils/router";

import { HomePage } from "@/pages/home/home";
import { LoginPage } from "@/pages/login/login";
import { RegisterPage } from "@/pages/register/register";
import { MessengerPage } from "@/pages/messenger/messenger";
import { ProfilePage } from "@/pages/profile/profile";
import { EditProfilePage } from "@/pages/edit-profile/edit-profile";
import { ChangePasswordPage } from "@/pages/change-password/change-password";
import { NotFoundPage } from "@/pages/not-found/not-found";
import { ServerErrorPage } from "@/pages/server-error/server-error";

registerHelpers();

router
  .use("/", HomePage)
  .use("/login", LoginPage)
  .use("/sign-up", RegisterPage)
  .use("/messenger", MessengerPage)
  .use("/settings", ProfilePage)
  .use("/settings/edit", EditProfilePage)
  .use("/settings/password", ChangePasswordPage)
  .use("/404", NotFoundPage)
  .use("/500", ServerErrorPage)
  .start();
