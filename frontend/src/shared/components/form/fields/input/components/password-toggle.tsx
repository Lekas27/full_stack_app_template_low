import { EyeIcon, EyeOffIcon } from "lucide-react";
import type { FC } from "react";

import { InputSuffix } from "./suffix";

type Props = {
  isVisible: boolean;
  onToggle: () => void;
};

export const PasswordToggle: FC<Props> = ({ isVisible, onToggle }) => {
  const Icon = isVisible ? EyeIcon : EyeOffIcon;

  return (
    <InputSuffix>
      <Icon className="h-5 w-5 shrink-0 hover:cursor-pointer" onClick={onToggle} />
    </InputSuffix>
  );
};
