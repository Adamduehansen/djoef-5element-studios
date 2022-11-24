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
            shape: columnIndex === 1 ? 'circle' : undefined,
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

  function onCellShapeChanged(cellId: string, shape: Shape): void {
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

  const selectedCell = cells.find((cell) => cell.selected);

  return (
    <div className='h-screen w-screen flex flex-col'>
      <header className='p-4 flex border-b'>
        <h1>Grid Title</h1>
      </header>
      <div className='h-screen flex'>
        <div className='h-full w-[400px] border-r'>
          <SelectedCell
            cell={selectedCell}
            onShapeChange={onCellShapeChanged}
          />
        </div>
        <div className='w-full' ref={gridContainerRef}>
          <Grid
            onCellSelected={onCellSelected}
            cells={cells}
            width={gridContainerRef.current?.clientWidth || 0}
            height={gridContainerRef.current?.clientHeight || 0}
          />
        </div>
      </div>
    </div>
  );
}

export default Editor;
