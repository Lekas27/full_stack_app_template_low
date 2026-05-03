import { Image } from "@radix-ui/react-avatar";
import type { ComponentProps, FC } from "react";

import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

type Props = ComponentProps<typeof Image>;

export const AvatarImage: FC<Props> = ({ className, ...props }) => {
  return (
    <Image
      data-slot="avatar-image"
      className={joinClasses("aspect-square h-full w-full", className || "")}
      {...props}
    />
  );
};
