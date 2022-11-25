import Shape from './Shape';

interface Cell {
  id: string;
  color?: string;
  shape?: Shape;
  background?: string;
  rotation: 0 | 90 | 180 | 270;
}

export default Cell;
