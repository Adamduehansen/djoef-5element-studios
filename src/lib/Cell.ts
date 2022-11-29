import Shape from './Shape';

export const rotation = [0, 90, 180, 270] as const;
export type Rotation = typeof rotation[number];

interface Cell {
  id: string;
  color?: string;
  shape?: Shape;
  background?: string;
  rotation: Rotation;
}

export default Cell;
