import Shape from './Shape';

interface Cell {
  id: string;
  x: number;
  y: number;
  selected?: boolean;
  color?: string;
  shape?: Shape;
  background?: string;
}

export default Cell;
