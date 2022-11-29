import Shape from './Shape';

interface Cell {
  id: string;
  color?: string;
  shape?: Shape;
  background?: string;
  rotation: number;
}

export default Cell;
