import { createContext } from 'react';
import Cell from '../lib/Cell';
import { DocumentDto } from '../lib/db';
import Shape from '../lib/Shape';

export interface DocumentProps extends DocumentDto {
  setTitle: (value: string) => void;
  showGrid: boolean;
  setShowGrid: (value: boolean) => void;
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
