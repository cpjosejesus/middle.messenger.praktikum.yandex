import { Block } from "@/utils/block";
import template from "./chat-item.hbs";

interface ChatItemProps {
  [key: string]: unknown;
  name: string;
  initials: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
  active?: boolean;
  events?: {
    click?: EventListener;
  };
}

export class ChatItem extends Block<ChatItemProps> {
  constructor(props: ChatItemProps) {
    super(props);
  }

  override render(): string {
    return this.compile(template, this.props);
  }
}
