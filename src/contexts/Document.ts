import { createContext } from 'react';
import Cell from '../lib/Cell';
import Shape from '../lib/Shape';

export interface DocumentProps {
  title: string;
  setTitle: (value: string) => void;
  showGrid: boolean;
  setShowGrid: (value: boolean) => void;
  gridRows: number;
  gridColumns: number;
  cells: Cell[];
  setCells: (value: Cell[]) => void;
  selectedCellId?: string;
  setSelectedCellId: (id: string) => void;
  setCellShape: (cellId: string, shape: Shape) => void;
  setCellColor: (cellId: string, color: string) => void;
  setCellBackground: (cellId: string, color: string) => void;
}

const Document = createContext<DocumentProps>({
  title: '',
  setTitle: () => {},
  showGrid: true,
  setShowGrid: () => {},
  gridRows: 0,
  gridColumns: 0,
  cells: [],
  setCells: () => {},
  setSelectedCellId: () => {},
  setCellShape: () => {},
  setCellColor: () => {},
  setCellBackground: () => {},
});

export default Document;
