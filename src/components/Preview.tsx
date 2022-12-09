import Konva from 'konva';
import React from 'react';
import { Fragment } from 'react';
import { Layer, Rect, Stage } from 'react-konva';
import Cell from '../lib/Cell';
import ShapeFactory from './Shape';

export interface GridCell extends Cell {
  x: number;
  y: number;
  selected: boolean;
}

interface Props {
  size: number;
  columns: number;
  rows: number;
  cells: Cell[];
}

const Preview = React.forwardRef<Konva.Stage, Props>(
  ({ cells, columns, rows, size }: Props, ref) => {
    const gridCells = cells.map((cell, index): GridCell => {
      return {
        ...cell,
        x: (index % columns) * (size / columns),
        y: Math.floor(index / rows) * (size / columns),
        selected: false,
      };
    });

    return (
      <Stage
        ref={ref}
        width={size}
        height={size}
        style={{
          border: '1px solid',
        }}
      >
        <Layer>
          {gridCells.map((cell) => {
            return (
              <Fragment key={cell.id}>
                {cell.background && (
                  <Rect
                    width={size / columns}
                    height={size / rows}
                    x={cell.x}
                    y={cell.y}
                    fill={cell.background}
                  />
                )}
                {cell.shape && (
                  <ShapeFactory cell={cell} width={size / columns} />
                )}
              </Fragment>
            );
          })}
        </Layer>
      </Stage>
    );
  }
);

export default Preview;
