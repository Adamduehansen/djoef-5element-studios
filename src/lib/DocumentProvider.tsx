import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Document from '../contexts/Document';
import Cell, { Grid } from './Cell';
import Shape from './Shape';
import {
  getDocument,
  DocumentDto,
  updateTitleOfDocument,
  updateCellsForDocument,
  updateCellSizeOfDocument,
} from './db';

function DocumentProvider({
  children,
}: React.PropsWithChildren): JSX.Element | null {
  const [title, setTitle] = useState<string>();
  const [showGrid, setShowGrid] = useState(true);
  const [grid, setGrid] = useState<Grid>([]);
  const [cellSize, setCellSize] = useState<number>();
  const [selectedCellId, setSelectedCellId] = useState<string>();
  const [document, setDocument] = useState<DocumentDto>();

  const { id } = useParams();

  useEffect(() => {
    async function initDocument() {
      const documentDto = await getDocument(id!);

      if (!documentDto) {
        throw new Error(`Document not found for id: ${id}`);
      }

      setDocument(documentDto);
      setTitle(documentDto!.title);
      setGrid(documentDto!.grid);
      setCellSize(documentDto!.cellSize);
    }
    initDocument();
  }, []);

  useEffect(() => {
    if (!title) {
      return;
    }
    updateTitleOfDocument(id!, title);
  }, [title]);

  useEffect(() => {
    if (grid.length === 0) {
      return;
    }
    updateCellsForDocument(id!, grid);
  }, [grid]);

  useEffect(() => {
    if (!cellSize) {
      return;
    }
    updateCellSizeOfDocument(id!, cellSize);
  }, [cellSize]);

  if (!document) {
    return null;
  }

  function updateCell(
    cellId: string,
    updateCellHandler: (cell: Cell) => Cell
  ): void {
    setGrid((currentGrid) => {
      return currentGrid.map((row) => {
        return row.map((col) => {
          if (col.id !== cellId) {
            return col;
          }

          return updateCellHandler(col);
        });
      });
    });
  }

  function setCellShape(cellId: string, shape: Shape) {
    updateCell(cellId, (cell) => {
      return {
        ...cell,
        shape: shape,
      };
    });
  }

  function setCellColor(cellId: string, color: string) {
    updateCell(cellId, (cell) => {
      return {
        ...cell,
        color: color,
      };
    });
  }

  function setCellBackground(cellId: string, color: string) {
    updateCell(cellId, (cell) => {
      return {
        ...cell,
        background: color,
      };
    });
  }

  function rotateCellLeft(cellId: string) {
    updateCell(cellId, (cell) => {
      return {
        ...cell,
        rotation: cell.rotation - 90,
      };
    });
  }

  function rotateCellRight(cellId: string) {
    updateCell(cellId, (cell) => {
      return {
        ...cell,
        rotation: cell.rotation + 90,
      };
    });
  }

  return (
    <Document.Provider
      value={{
        id: document?.id || '',
        title: title || '',
        setTitle: setTitle,
        showGrid: showGrid,
        setShowGrid: setShowGrid,
        grid: grid,
        cellSize: cellSize || 0,
        setCellSize: setCellSize,
        setGrid: setGrid,
        gridColumns: document?.gridColumns || 0,
        gridRows: document?.gridRows || 0,
        selectedCellId: selectedCellId,
        setSelectedCellId: setSelectedCellId,
        setCellShape: setCellShape,
        setCellColor: setCellColor,
        setCellBackground: setCellBackground,
        rotateCellLeft: rotateCellLeft,
        rotateCellRight: rotateCellRight,
      }}
    >
      {children}
    </Document.Provider>
  );
}

export function useDocument() {
  return useContext(Document);
}

export default DocumentProvider;
