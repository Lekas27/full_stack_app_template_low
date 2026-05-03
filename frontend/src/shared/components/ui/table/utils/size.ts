export type CellPaddingsRecord = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

export const tableCellPaddings: CellPaddingsRecord = {
  top: 16,
  bottom: 16,
  left: 16,
  right: 12,
};

/**
 * Adds cell's padding to the calculation of accurate width
 */
export const getTableCellWidth = (
  size: number,
  cellPaddings: CellPaddingsRecord = tableCellPaddings
): number => size + cellPaddings.left + cellPaddings.right;
