import { Command as CommandPrimitive } from "cmdk";
import type { ComponentProps, FC } from "react";

const { Empty } = CommandPrimitive;

type Props = ComponentProps<typeof Empty>;

export const CommandEmpty: FC<Props> = (props) => {
  return <Empty data-slot="command-empty" className="py-6 text-center text-sm" {...props} />;
};
