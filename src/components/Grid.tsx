import Konva from 'konva';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Layer, Rect, Stage } from 'react-konva';
import type Cell from '../lib/Cell';
import { useDocument } from '../lib/DocumentProvider';
import ShapeFactory from './Shape';

const CELL_WIDTH = 100;

export interface GridCell extends Cell {
  x: number;
  y: number;
  selected: boolean;
}

function makeGridCells(
  cells: Cell[],
  col: number,
  selectedCellId?: string
): GridCell[] {
  let colIndex = 0;
  let rowIndex = 0;

  return cells
    .map((cell): GridCell => {
      const x = colIndex * CELL_WIDTH;
      const y = rowIndex * CELL_WIDTH;

      colIndex += 1;

      if (colIndex >= col) {
        colIndex = 0;
        rowIndex += 1;
      }

      return {
        ...cell,
        x: x,
        y: y,
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

  const gridCells = makeGridCells(cells, gridColumns, selectedCellId);

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

Grid.displayName = 'Grid';

export default Grid;
