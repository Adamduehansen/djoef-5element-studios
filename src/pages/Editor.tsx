import { useEffect, useRef, useState } from 'react';
import Grid from '../components/Grid';
import type Cell from '../lib/Cell';

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
  const [editCellPosition, setEditCellPosition] = useState<{
    x: number;
    y: number;
  }>();

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
      setCells((current) => {
        return current.map((cell) => {
          return {
            ...cell,
            selected: false,
          };
        });
      });
    } else {
      const selectedCell = cells.find((cell) => cell.id === cellId)!;
      selectedCell.selected = !selectedCell.selected;
      const otherCells = cells.filter((cell) => cell.id !== selectedCell.id);
      const updatedCellList = [
        ...otherCells.map((cell) => {
          return {
            ...cell,
            selected: false,
          };
        }),
        // The selected cell is placed last to make sure that it is rendered on
        // top of the others.
        selectedCell,
      ];
      setCells(updatedCellList);
      if (!selectedCell.selected) {
        setEditCellPosition(undefined);
      }
    }
  }

  function onCellSelected(cellId: string | undefined, x?: number, y?: number) {
    setSelectedCell(cellId);
    if (!x || !y) {
      return;
    }
    setEditCellPosition({ x: x, y: y });
  }

  return (
    <div className='h-screen flex flex-col'>
      <header className='w-screen bg-gray-600 flex justify-center items-center z-10 p-4 text-xl border-b border-black text-white'>
        <h1>Grid Title</h1>
      </header>
      <div className='flex-1 relative' ref={gridContainerRef}>
        <Grid
          onCellSelected={onCellSelected}
          cells={cells}
          width={gridContainerRef.current?.clientWidth || 0}
          height={gridContainerRef.current?.clientHeight || 0}
        />
        {editCellPosition && (
          <div
            className='absolute w-64 bg-slate-600 text-white p-4'
            style={{
              left: editCellPosition.x,
              top: editCellPosition.y,
            }}
          >
            <p>Hello, World!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Editor;
