import Shape from './Shape';

interface Cell {
  id: string;
  color: string;
  shape?: Shape;
  selected?: boolean;
  x: number;
  y: number;
}

export default Cell;
