import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Document from '../contexts/Document';
import Cell from './Cell';
import Shape from './Shape';
import {
  getDocument,
  DocumentDto,
  updateTitleOfDocument,
  updateCellsForDocument,
  addNewDocument,
  updateCellSizeOfDocument,
} from './db';

function DocumentProvider({
  children,
}: React.PropsWithChildren): JSX.Element | null {
  const [title, setTitle] = useState<string>();
  const [showGrid, setShowGrid] = useState(true);
  const [cells, setCells] = useState<Cell[]>([]);
  const [cellSize, setCellSize] = useState<number>();
  const [selectedCellId, setSelectedCellId] = useState<string>();
  const [document, setDocument] = useState<DocumentDto>();

  const { id } = useParams();

  useEffect(() => {
    async function initDocument() {
      const documentDto = await getDocument(id!);

      if (!documentDto) {
        // throw new Error(`Document not found for id: ${id}`);
        addNewDocument(id!, {
          title: id!,
          gridRows: 4,
          gridColumns: 4,
        });
      }

      setDocument(documentDto);
      setTitle(documentDto!.title);
      setCells(documentDto!.cells);
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
    if (cells.length === 0) {
      return;
    }
    updateCellsForDocument(id!, cells);
  }, [cells]);

  useEffect(() => {
    if (!cellSize) {
      return;
    }
    updateCellSizeOfDocument(id!, cellSize);
  }, [cellSize]);

  if (!document) {
    return null;
  }

  function updateCell(cellId: string, updateCell: (cell: Cell) => Cell) {
    setCells((currentCells) => {
      return currentCells.map((cell) => {
        if (cell.id !== cellId) {
          return cell;
        }

        return updateCell(cell);
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
        title: title || '',
        setTitle: setTitle,
        showGrid: showGrid,
        setShowGrid: setShowGrid,
        cells: cells,
        cellSize: cellSize || 0,
        setCellSize: setCellSize,
        setCells: setCells,
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
