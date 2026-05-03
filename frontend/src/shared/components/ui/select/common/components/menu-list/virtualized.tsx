import { type FC, type ReactNode } from "react";
import { type MenuListProps } from "react-select";
import { Virtuoso } from "react-virtuoso";

import {
  type SelectGroup,
  type SelectOption,
} from "@/shared/components/ui/select/common/types/options";

const totalCount = 50;

type RowProps = {
  index: number;
  children: ReactNode;
};

const Row: FC<RowProps> = ({ index, children }) => {
  const content = Array.isArray(children) ? children[index] : <></>;

  return <div>{content}</div>;
};

export const SelectVirtualizedMenuList: FC<
  MenuListProps<SelectOption, boolean, SelectGroup<SelectOption>>
> = (props) => {
  // We need to use children, not options fom props in order for this to work
  const { children } = props;
  const options = children as SelectOption[];

  return options?.length ? (
    <Virtuoso<SelectOption>
      data={options}
      style={{ height: 200, width: "100%" }}
      totalCount={totalCount}
      initialTopMostItemIndex={0}
      itemContent={(index) => <Row index={index}>{children}</Row>}
    />
  ) : (
    <p className="!text-gray-1 w-full px-2 py-3 text-center">No options</p>
  );
};
