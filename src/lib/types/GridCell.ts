import Cell from './Cell';

export interface GridCell extends Cell {
  x: number;
  y: number;
  selected: boolean;
}
