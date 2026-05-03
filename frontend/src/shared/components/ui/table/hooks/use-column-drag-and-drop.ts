import {
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useCallback, type Dispatch, type SetStateAction } from "react";

type Props = {
  setColumnOrder?: Dispatch<SetStateAction<string[]>>;
};

/**
 * Hook for enabling drag-and-drop column reordering in a table.
 */
export const useColumnDragAndDrop = ({ setColumnOrder }: Props) => {
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (setColumnOrder && active && over && active.id !== over.id) {
        setColumnOrder((columnOrder) => {
          const oldIndex = columnOrder.indexOf(String(active.id));
          const newIndex = columnOrder.indexOf(String(over.id));

          // Just a splice util
          return arrayMove(columnOrder, oldIndex, newIndex);
        });
      }
    },
    [setColumnOrder]
  );
  return { handleDragEnd, sensors };
};
