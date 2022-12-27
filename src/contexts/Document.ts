import { createContext } from 'react';
import { Grid } from '../lib/Cell';
import { DocumentDto } from '../lib/db';
import Shape from '../lib/Shape';

export interface DocumentProps extends DocumentDto {
  setTitle: (value: string) => void;
  showGrid: boolean;
  setShowGrid: (value: boolean) => void;
  setGrid: (value: Grid) => void;
  setCellSize: (value: number) => void;
  selectedCellId?: string;
  setSelectedCellId: (id?: string) => void;
  setCellShape: (cellId: string, shape: Shape) => void;
  setCellColor: (cellId: string, color: string) => void;
  setCellBackground: (cellId: string, color: string) => void;
  rotateCellLeft: (cellId: string) => void;
  rotateCellRight: (cellId: string) => void;
}

const Document = createContext<DocumentProps>({
  id: '',
  title: '',
  setTitle: () => {},
  showGrid: true,
  setShowGrid: () => {},
  gridRows: 0,
  gridColumns: 0,
  grid: [],
  setGrid: () => {},
  cellSize: 100,
  setCellSize: () => {},
  setSelectedCellId: () => {},
  setCellShape: () => {},
  setCellColor: () => {},
  setCellBackground: () => {},
  rotateCellLeft: () => {},
  rotateCellRight: () => {},
});

export default Document;
