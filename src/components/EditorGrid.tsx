import Konva from 'konva';
import { Fragment, useEffect, useRef } from 'react';
import { Layer, Rect, Stage } from 'react-konva';
import type Cell from '../lib/Cell';
import { Grid } from '../lib/Cell';
import { useDocument } from '../lib/DocumentProvider';
import ShapeFactory from './Shape';

export interface GridCell extends Cell {
  x: number;
  y: number;
  selected: boolean;
}

type CellGrid = GridCell[][];

function createGrid(options: {
  grid: Grid;
  cellsSize: number;
  selectedCellId?: string;
}): CellGrid {
  return options.grid.map((row, rowIndex) => {
    return row.map((cell, colIndex): GridCell => {
      return {
        ...cell,
        x: colIndex * options.cellsSize,
        y: rowIndex * options.cellsSize,
        selected: options.selectedCellId === cell.id,
      };
    });
  });
}

function EditorGrid(): JSX.Element {
  const {
    showGrid,
    gridColumns,
    gridRows,
    grid,
    cellSize,
    setSelectedCellId,
    selectedCellId,
  } = useDocument();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        containerRef.current &&
        (event.target as Node).contains(containerRef.current)
      ) {
        setSelectedCellId(undefined);
      }
    }

    const abortController = new AbortController();
    window.addEventListener('click', handleOutsideClick, {
      signal: abortController.signal,
    });
    return function () {
      abortController.abort();
    };
  }, []);

  const gridCells = createGrid({
    grid: grid,
    cellsSize: cellSize,
    selectedCellId: selectedCellId,
  });

  function makeCellSelectedHandler(id: string) {
    return function () {
      if (id === selectedCellId) {
        setSelectedCellId(undefined);
      } else {
        setSelectedCellId(id);
      }
    };
  }

  function makeMouseCursorChange(cursor: string) {
    return function (event: Konva.KonvaEventObject<MouseEvent>) {
      const container = event.target.getStage()!.container();
      container.style.cursor = cursor;
    };
  }

  return (
    <div ref={containerRef}>
      <Stage
        width={gridColumns * cellSize}
        height={gridRows * cellSize}
        onMouseEnter={makeMouseCursorChange('pointer')}
        onMouseLeave={makeMouseCursorChange('default')}
        style={{
          background: 'white',
          border: '1px solid',
        }}
      >
        <Layer>
          {gridCells
            .flat()
            .sort((cell) => (cell.selected ? 1 : -1))
            .map((cell) => {
              return (
                <Fragment key={cell.id}>
                  {cell.background && (
                    <Rect
                      width={cellSize}
                      height={cellSize}
                      x={cell.x}
                      y={cell.y}
                      fill={cell.background}
                    />
                  )}
                  {cell.shape && <ShapeFactory cell={cell} width={cellSize} />}
                  <Rect
                    key={cell.id}
                    width={cellSize}
                    height={cellSize}
                    stroke={cell.selected ? 'grey' : 'lightgrey'}
                    strokeEnabled={showGrid}
                    x={cell.x}
                    y={cell.y}
                    onClick={makeCellSelectedHandler(cell.id)}
                  />
                </Fragment>
              );
            })}
        </Layer>
      </Stage>
    </div>
  );
}

export default EditorGrid;
