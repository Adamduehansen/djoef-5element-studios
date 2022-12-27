import Konva from 'konva';
import React from 'react';
import { Fragment } from 'react';
import { Layer, Rect, Stage } from 'react-konva';
import Cell, { Grid } from '../lib/Cell';
import ShapeFactory from './Shape';

export interface GridCell extends Cell {
  x: number;
  y: number;
  selected: boolean;
}

interface Props {
  cellSize: number;
  columns: number;
  rows: number;
  grid: Grid;
}

const Preview = React.forwardRef<Konva.Stage, Props>(
  ({ grid, columns, rows, cellSize }: Props, ref) => {
    const gridCells: GridCell[][] = grid.map((row, rowIndex) => {
      return row.map((cell, colIndex): GridCell => {
        return {
          ...cell,
          x: cellSize * colIndex,
          y: cellSize * rowIndex,
          selected: false,
        };
      });
    });

    return (
      <Stage
        ref={ref}
        width={columns * cellSize}
        height={rows * cellSize}
        style={{
          border: '1px solid',
        }}
      >
        <Layer>
          {gridCells.map((row) => {
            return row.map((cell) => {
              return (
                <Fragment>
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
                </Fragment>
              );
            });
          })}
        </Layer>
      </Stage>
    );
  }
);

export default Preview;
