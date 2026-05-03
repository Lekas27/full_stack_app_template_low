import { LoaderCircle } from "lucide-react";
import type { FC } from "react";

import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

type Props = {
  className?: string;
};

export const Spinner: FC<Props> = ({
  className = "text-primary-1 dark:text-primary-5 h-5 w-5",
}) => (
  <div className="grid items-center justify-center">
    <LoaderCircle className={joinClasses("animate-spin", className)} />
  </div>
);
