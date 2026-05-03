import { type Row, type Table } from "@tanstack/react-table";

import { IndeterminateCheckbox } from "@/shared/components/ui/checkbox/indeterminate";
import { SelectableRowColumn } from "@/shared/components/ui/table/enums/columns";

export const generateSelectableColumn = <Data,>() => ({
  id: SelectableRowColumn.SELECT,
  name: "",
  header: ({
    table: {
      getIsAllRowsSelected,
      getIsSomeRowsSelected,
      getToggleAllRowsSelectedHandler,
    },
  }: {
    table: Table<Data>;
  }) => (
    <IndeterminateCheckbox
      checked={getIsAllRowsSelected()}
      indeterminate={getIsSomeRowsSelected()}
      onChange={getToggleAllRowsSelectedHandler()}
    />
  ),
  cell: ({
    row: {
      original,
      getIsSelected,
      getCanSelect,
      getIsSomeSelected,
      getToggleSelectedHandler,
    },
  }: {
    row: Row<Data>;
  }) =>
    (original as Data & { isTotal: boolean })?.isTotal ? (
      <div />
    ) : (
      <IndeterminateCheckbox
        checked={getIsSelected()}
        disabled={!getCanSelect()}
        indeterminate={getIsSomeSelected()}
        onChange={getToggleSelectedHandler()}
      />
    ),
  size: 48,
});
