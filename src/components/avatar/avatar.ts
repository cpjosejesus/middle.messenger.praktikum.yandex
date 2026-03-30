import { Block } from "@/utils/block";
import template from "./avatar.hbs";

interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: "sm" | "md" | "lg";
}

export class Avatar extends Block<AvatarProps> {
  constructor(props: AvatarProps) {
    super(props);
  }

  override render(): string {
    return this.compile(template, this.props);
  }
}
