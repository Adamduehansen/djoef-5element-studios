import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import Document, { DocumentProps } from '../contexts/Document';
import Cell from './Cell';
import Shape from './Shape';

type DocumentDto = Pick<
  DocumentProps,
  'title' | 'cells' | 'gridRows' | 'gridColumns'
>;

function getDocument(id?: string): DocumentDto {
  return {
    title: 'Hello, World!',
    cells: [
      {
        id: '1',
        shape: 'arc',
        color: 'red',
        rotation: 0,
      },
      {
        id: '2',
        rotation: 0,
      },
      {
        id: '3',
        rotation: 0,
      },
      {
        id: '4',
        rotation: 0,
      },
      {
        id: '5',
        rotation: 0,
      },
      {
        id: '6',
        rotation: 0,
      },
      {
        id: '7',
        rotation: 0,
      },
      {
        id: '8',
        rotation: 0,
      },
      {
        id: '9',
        rotation: 0,
      },
    ],
    gridColumns: 3,
    gridRows: 3,
  };
}

function DocumentProvider({ children }: React.PropsWithChildren): JSX.Element {
  const { id } = useParams();

  const document = getDocument(id);

  const [title, setTitle] = useState(document.title);
  const [showGrid, setShowGrid] = useState(true);
  const [cells, setCells] = useState<Cell[]>(document.cells);
  const [selectedCellId, setSelectedCellId] = useState<string>();

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
        title: title,
        setTitle: setTitle,
        showGrid: showGrid,
        setShowGrid: setShowGrid,
        cells: cells,
        setCells: setCells,
        gridColumns: document.gridColumns,
        gridRows: document.gridRows,
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
