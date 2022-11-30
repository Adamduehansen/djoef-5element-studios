import Konva from 'konva';
import { Fragment, useEffect, useRef } from 'react';
import { Layer, Rect, Stage } from 'react-konva';
import type Cell from '../lib/Cell';
import { useDocument } from '../lib/DocumentProvider';
import ShapeFactory from './Shape';

const CELL_WIDTH = 200;

export interface GridCell extends Cell {
  x: number;
  y: number;
  selected: boolean;
}

function makeGridCells(
  cells: Cell[],
  cols: number,
  rows: number,
  selectedCellId?: string
): GridCell[] {
  return cells
    .map((cell, index): GridCell => {
      return {
        ...cell,
        x: (index % cols) * CELL_WIDTH,
        y: Math.floor(index / rows) * CELL_WIDTH,
        selected: selectedCellId === cell.id,
      };
    })
    .sort((cell) => (cell.selected ? 1 : -1));
}

function Grid() {
  const {
    showGrid,
    gridColumns,
    gridRows,
    cells,
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

  const gridCells = makeGridCells(cells, gridColumns, gridRows, selectedCellId);

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
        width={gridColumns * CELL_WIDTH}
        height={gridRows * CELL_WIDTH}
        onMouseEnter={makeMouseCursorChange('pointer')}
        onMouseLeave={makeMouseCursorChange('default')}
        style={{
          background: 'white',
          border: '1px solid',
        }}
      >
        <Layer>
          {gridCells.map((cell) => {
            return (
              <Fragment key={cell.id}>
                {cell.background && (
                  <Rect
                    width={CELL_WIDTH}
                    height={CELL_WIDTH}
                    x={cell.x}
                    y={cell.y}
                    fill={cell.background}
                  />
                )}
                {cell.shape && <ShapeFactory cell={cell} width={CELL_WIDTH} />}
                <Rect
                  key={cell.id}
                  width={CELL_WIDTH}
                  height={CELL_WIDTH}
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

export default Grid;
