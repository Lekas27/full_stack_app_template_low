import { type Header } from "@tanstack/react-table";

export type Props<T> = {
  header: Header<T, unknown>;
};

export const TableColumnResizer = <T,>({ header }: Props<T>) => {
  const { column, getResizeHandler } = header;
  const { resetSize } = column;

  return (
    <div
      className="z-[1] w-1 bg-blue-500 opacity-0 transition duration-200 group-hover:opacity-100"
      onDoubleClick={() => resetSize()}
      onMouseDown={getResizeHandler()}
      onTouchStart={getResizeHandler()}
      style={{
        position: "absolute",
        top: 0,
        height: "100%",
        cursor: "col-resize",
        userSelect: "none",
        touchAction: "none",
        right: 0,
        transform: "",
      }}
    />
  );
};
