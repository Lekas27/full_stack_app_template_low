import type { FC, ReactNode } from "react";

import { InputSuffix } from "./suffix";

import { InfoTooltip } from "@/shared/components/form/info-tooltip";

type Props = {
  content: ReactNode;
};

export const InfoTooltipSuffix: FC<Props> = ({ content }) => (
  <InputSuffix>
    <InfoTooltip content={content} />
  </InputSuffix>
);
