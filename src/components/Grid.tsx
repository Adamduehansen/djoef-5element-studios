import Konva from 'konva';
import React, { Fragment, useEffect, useState } from 'react';
import { Layer, Rect, Stage } from 'react-konva';
import type Cell from '../lib/Cell';
import { useDocument } from '../lib/DocumentProvider';
import ShapeFactory from './Shape';

const CELL_WIDTH = 100;

interface GridCell extends Cell {
  x: number;
  y: number;
  selected: boolean;
}

function makeGridCells(
  cells: Cell[],
  col: number,
  selectedCellId?: string
): () => GridCell[] {
  return function () {
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
  };
}

const Grid = React.forwardRef<Konva.Stage>((_, ref) => {
  const {
    showGrid,
    gridColumns,
    gridRows,
    cells,
    setSelectedCellId,
    selectedCellId,
  } = useDocument();

  const gridCells = makeGridCells(cells, gridColumns, selectedCellId)();

  function makeCellSelectedHandler(id: string) {
    return function () {
      setSelectedCellId(id);
    };
  }

  function makeMouseCursorChange(cursor: string) {
    return function (event: Konva.KonvaEventObject<MouseEvent>) {
      const container = event.target.getStage()!.container();
      container.style.cursor = cursor;
    };
  }

  return (
    <Stage
      ref={ref}
      id='background'
      width={gridColumns * CELL_WIDTH}
      height={gridRows * CELL_WIDTH}
      onMouseEnter={makeMouseCursorChange('pointer')}
      onMouseLeave={makeMouseCursorChange('default')}
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
  );
});

export default Grid;
