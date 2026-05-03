import type { FC } from "react";

import { InputSuffix } from "./suffix";

type Props = {
  currentLength: number;
  maxLength?: number;
};

export const CharacterCounter: FC<Props> = ({ currentLength, maxLength }) => {
  if (!maxLength) return null;

  return (
    <InputSuffix>
      {currentLength}/{maxLength}
    </InputSuffix>
  );
};
