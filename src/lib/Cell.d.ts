type Shape = 'circle';

export default interface Cell {
  id: string;
  color: string;
  shape?: Shape;
  selected?: boolean;
  x: number;
  y: number;
}
