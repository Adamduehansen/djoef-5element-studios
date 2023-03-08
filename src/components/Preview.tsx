import Konva from 'konva';
import React from 'react';
import { Fragment } from 'react';
import { Layer, Rect, Stage } from 'react-konva';
import { Grid } from '../lib/types/Cell';
import { GridCell } from '../lib/types/GridCell';
import ShapeFactory from './Shape';

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
                <Fragment key={cell.id}>
                  {cell.background && (
                    <Rect
                      name='rect'
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

Preview.displayName = 'Preview';

export default Preview;
