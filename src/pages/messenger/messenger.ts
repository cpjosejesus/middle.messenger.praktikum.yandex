import { Block } from "@/utils/block";
import { validateMessage } from "@/utils/validation";
import template from "./messenger.hbs";

const mockChats = [
  {
    name: "Андрей",
    initials: "АН",
    lastMessage: "Привет! Как дела?",
    time: "10:30",
    unreadCount: 2,
    active: true,
  },
  {
    name: "Командный чат",
    initials: "КЧ",
    lastMessage: "Встреча завтра в 10:00",
    time: "09:15",
    unreadCount: 0,
  },
  {
    name: "Михаил",
    initials: "МИ",
    lastMessage: "Окей, понял",
    time: "Вчера",
    unreadCount: 0,
  },
  {
    name: "Наташа",
    initials: "НА",
    lastMessage: "Спасибо!",
    time: "Вт",
    unreadCount: 5,
  },
  {
    name: "Дизайн команда",
    initials: "ДК",
    lastMessage: "Макеты готовы",
    time: "Пн",
    unreadCount: 0,
  },
];

const mockActiveChat = {
  name: "Андрей",
  initials: "АН",
  messages: [
    { text: "Привет! Как дела?", time: "10:30", isOutgoing: false },
    {
      text: "Привет! Всё хорошо, спасибо. А у тебя?",
      time: "10:31",
      isOutgoing: true,
    },
    {
      text: "Тоже отлично! Ты будешь на встрече завтра?",
      time: "10:32",
      isOutgoing: false,
    },
    { text: "Да, буду. В 10:00?", time: "10:33", isOutgoing: true },
    { text: "Да, всё верно. До встречи!", time: "10:34", isOutgoing: false },
  ],
};

export class MessengerPage extends Block {
  constructor() {
    super({
      chats: mockChats,
      activeChat: mockActiveChat,
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const input = form.querySelector<HTMLInputElement>('[name="message"]');
          if (!input) return;

          const message = input.value;
          const error = validateMessage(message);

          if (error) {
            input.classList.add("chat-window__input--error");
            return;
          }

          input.classList.remove("chat-window__input--error");
          console.log({ message });
          input.value = "";
        },
        focusout: (e: Event) => {
          const target = e.target as HTMLInputElement;
          if (target.name !== "message") return;
          const error = validateMessage(target.value);
          target.classList.toggle("chat-window__input--error", error !== null);
        },
      },
    });
  }

  override render(): string {
    return this.compile(template, this.props);
  }
}
