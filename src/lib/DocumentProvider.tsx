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
} from './db';

function DocumentProvider({
  children,
}: React.PropsWithChildren): JSX.Element | null {
  const [title, setTitle] = useState<string>();
  const [showGrid, setShowGrid] = useState(true);
  const [cells, setCells] = useState<Cell[]>([]);
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
          gridRows: 3,
          gridColumns: 3,
        });
      }

      setDocument(documentDto);
      setTitle(documentDto!.title);
      setCells(documentDto!.cells);
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

  if (!document) {
    return null;
  }

  function setCellShape(cellId: string, shape: Shape) {
    setCells((currentCells) => {
      return currentCells.map((cell) => {
        if (cell.id !== cellId) {
          return cell;
        }

        return {
          ...cell,
          shape: shape,
        };
      });
    });
  }

  function setCellColor(cellId: string, color: string) {
    setCells((currentCells) => {
      return currentCells.map((cell) => {
        if (cell.id !== cellId) {
          return cell;
        }

        return {
          ...cell,
          color: color,
        };
      });
    });
  }

  function setCellBackground(cellId: string, color: string) {
    setCells((currentCells) => {
      return currentCells.map((cell) => {
        if (cell.id !== cellId) {
          return cell;
        }

        return {
          ...cell,
          background: color,
        };
      });
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
        setCells: setCells,
        gridColumns: document?.gridColumns || 0,
        gridRows: document?.gridRows || 0,
        selectedCellId: selectedCellId,
        setSelectedCellId: setSelectedCellId,
        setCellShape: setCellShape,
        setCellColor: setCellColor,
        setCellBackground: setCellBackground,
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
