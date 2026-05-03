import { useDraggable } from "@dnd-kit/core";
import { type Row } from "@tanstack/react-table";
import { useEffect, useRef, type CSSProperties } from "react";

export type Props<T> = {
  row: Row<T>;
  onResize: (rowId: string, newHeight: number) => void;
  initialHeight: number;
  style?: CSSProperties;
};

export const TableRowResizer = <T,>({ row, onResize, initialHeight, style }: Props<T>) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `row-resizer-${row.id}`,
  });

  const startHeightRef = useRef(initialHeight);

  useEffect(() => {
    if (transform?.y != null) {
      const newHeight = Math.max(24, startHeightRef.current + transform.y);
      onResize(row.id, newHeight);
    }
  }, [transform?.y, onResize, row.id]);

  useEffect(() => {
    if (!isDragging) {
      startHeightRef.current = initialHeight;
    }
  }, [isDragging, initialHeight]);

  return (
    <td>
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "2px",
          width: "100%",
          cursor: "row-resize",
          zIndex: 10,
          backgroundColor: isDragging ? "rgb(59, 130, 246)" : "transparent",
          transition: "background-color 0.2s ease-in-out",
          touchAction: "none",
          userSelect: "none",
          ...style,
        }}
      />
    </td>
  );
};
