import { ArchiveIcon } from "lucide-react";
import { type FC } from "react";

import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

type Props = {
  className?: string;
  iconClassName?: string;
  text?: string;
};

export const EmptyData: FC<Props> = ({
  className = "w-full",
  iconClassName = "",
  text = "No data available",
}) => (
  <div className={className}>
    <ArchiveIcon
      className={joinClasses(
        iconClassName,
        "theme-transition mx-auto dark:text-gray-300"
      )}
    />
    <div className="theme-transition mt-2 text-center dark:text-gray-300">
      {text}
    </div>
  </div>
);
