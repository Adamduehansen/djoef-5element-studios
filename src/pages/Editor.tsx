import Konva from 'konva';
import { useEffect, useRef, useState } from 'react';
import Grid from '../components/Grid';
import SelectedCell from '../components/SelectedCell';
import type Cell from '../lib/Cell';
import Shape from '../lib/Shape';

interface GenerateGridOptions {
  rows: number;
  columns: number;
  centerX: number;
  centerY: number;
}

function downloadURI(uri: string, name: string) {
  var link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function makeGridGenerator({
  rows,
  columns,
  centerX,
  centerY,
}: GenerateGridOptions): () => Cell[] {
  const cellSize = 100;
  return function () {
    return Array.from({ length: rows })
      .map((_, rowIndex) => {
        const y = centerY - (cellSize / 2) * rows + cellSize * rowIndex;
        return Array.from({ length: columns }).map((_, columnIndex): Cell => {
          const x = centerX - (cellSize / 2) * columns + cellSize * columnIndex;
          return {
            id: `${rowIndex}-${columnIndex}`,
            color: '',
            shape: undefined,
            y: y,
            x: x,
            selected: false,
          };
        });
      })
      .flat();
  };
}

function updateGridPosition({
  rows,
  columns,
  centerX,
  centerY,
}: GenerateGridOptions) {
  const cellSize = 100;
  return function (current: Cell[]) {
    return Array.from({ length: rows })
      .map((_, rowIndex) => {
        const y = centerY - (cellSize / 2) * rows + cellSize * rowIndex;
        return Array.from({ length: columns }).map((_, columnIndex): Cell => {
          const x = centerX - (cellSize / 2) * columns + cellSize * columnIndex;
          const currentCell = current.find(
            (cell) => cell.id === `${rowIndex}-${columnIndex}`
          )!;

          return {
            ...currentCell,
            y: y,
            x: x,
          };
        });
      })
      .flat();
  };
}

function Editor(): JSX.Element {
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<Konva.Stage>(null);
  const [cells, setCells] = useState<Cell[]>([]);

  useEffect(() => {
    setCells(
      makeGridGenerator({
        rows: 4,
        columns: 4,
        centerX: gridContainerRef.current!.clientWidth / 2,
        centerY: gridContainerRef.current!.clientHeight / 2,
      })
    );

    const abortController = new AbortController();
    window.addEventListener('resize', revalidateCellCoordinates, {
      signal: abortController.signal,
    });

    return function () {
      abortController.abort();
    };
  }, []);

  function revalidateCellCoordinates() {
    setCells(
      updateGridPosition({
        rows: 4,
        columns: 4,
        centerX: gridContainerRef.current!.clientWidth / 2,
        centerY: gridContainerRef.current!.clientHeight / 2,
      })
    );
  }

  function setSelectedCell(cellId?: string): void {
    if (cellId === undefined) {
      setCells((currentCells) => {
        return currentCells.map((cell) => {
          return {
            ...cell,
            selected: false,
          };
        });
      });
    } else {
      setCells((currentCells) =>
        currentCells
          .map((cell) => {
            if (cell.id !== cellId) {
              return {
                ...cell,
                selected: false,
              };
            } else {
              return {
                ...cell,
                selected: !cell.selected,
              };
            }
          })
          .sort((cell) => (cell.selected ? 1 : -1))
      );
    }
  }

  function onCellSelected(
    cellId: string | undefined,
    x?: number,
    y?: number
  ): void {
    setSelectedCell(cellId);
    if (!x || !y) {
      return;
    }
  }

  function onCellShapeChange(cellId: string, shape: Shape): void {
    setCells((currentCells) => {
      return currentCells.map((cell) => {
        if (cell.id !== cellId) {
          return cell;
        } else {
          return {
            ...cell,
            shape: shape,
          };
        }
      });
    });
  }

  function onCellColorChange(cellId: string, color: string) {
    setCells((currentCells) => {
      return currentCells.map((cell) => {
        if (cell.id !== cellId) {
          return cell;
        } else {
          return {
            ...cell,
            color: color,
          };
        }
      });
    });
  }

  function onCellBackgroundChange(cellId: string, color: string) {
    setCells((currentCells) => {
      return currentCells.map((cell) => {
        if (cell.id !== cellId) {
          return cell;
        } else {
          return {
            ...cell,
            background: color,
          };
        }
      });
    });
  }

  const selectedCell = cells.find((cell) => cell.selected);

  return (
    <div className='h-screen w-screen flex flex-col relative'>
      <header className='p-4 flex border-b'>
        <h1>Grid Title</h1>
      </header>
      <div className='h-screen flex'>
        <div className='h-full w-[300px] border-r'>
          <SelectedCell
            cell={selectedCell}
            onShapeChange={onCellShapeChange}
            onColorChange={onCellColorChange}
            onBackgroundChange={onCellBackgroundChange}
          />
        </div>
        <div className='w-full' ref={gridContainerRef}>
          <Grid
            ref={gridRef}
            onCellSelected={onCellSelected}
            cells={cells}
            width={gridContainerRef.current?.clientWidth || 0}
            height={gridContainerRef.current?.clientHeight || 0}
          />
        </div>
      </div>
      <button
        className='absolute right-2 bottom-2'
        onClick={async () => {
          const uri = gridRef.current!.toDataURL();
          downloadURI(uri, 'title');
        }}
      >
        Download
      </button>
    </div>
  );
}

export default Editor;
