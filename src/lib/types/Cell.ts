import ShapeName from './Shape';

interface Cell {
  id: string;
  color?: string;
  shape?: ShapeName;
  background?: string;
  rotation: number;
}

export type Grid = Cell[][];

export default Cell;
