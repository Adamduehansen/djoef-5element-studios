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
  return function (current: Cell[]) {
    const cellSize = 100;
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

  function setSelectedCell(cellId: string): void {
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
  }

  function onCellSelected(cellId: string) {
    setSelectedCell(cellId);
  }

  return (
    <div className='h-screen flex flex-col'>
      <header className='w-screen bg-gray-600 flex justify-center items-center z-10 p-4 text-xl border-b border-black text-white'>
        <h1>Grid Title</h1>
      </header>
      <div className='flex-1' ref={gridContainerRef}>
        <Grid
          onCellSelected={onCellSelected}
          cells={cells}
          width={gridContainerRef.current?.clientWidth || 0}
          height={gridContainerRef.current?.clientHeight || 0}
        />
      </div>
    </div>
  );
}

export default Editor;
