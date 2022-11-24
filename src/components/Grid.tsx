import Konva from 'konva';
import React, { Fragment, useRef } from 'react';
import { Circle, Layer, Rect, Stage } from 'react-konva';
import type Cell from '../lib/Cell';

interface Props {
  onCellSelected: (cellId: string | undefined, x?: number, y?: number) => void;
  cells: Cell[];
  width: number;
  height: number;
}

const Grid = React.forwardRef<Konva.Stage, Props>(
  ({ onCellSelected, cells, width, height }, ref) => {
    function makeCellSelectedHandler(id: string) {
      return function () {
        onCellSelected(id);
      };
    }

    return (
      <Stage
        ref={ref}
        width={width}
        height={height}
        id='background'
        onClick={({ target }) => {
          if (target.id() === 'background') {
            onCellSelected(undefined);
          }
        }}
      >
        <Layer>
          {cells.map((cell) => {
            const cellSize = 100;
            return (
              <Fragment key={cell.id}>
                {cell.shape && (
                  <Circle
                    width={cellSize}
                    height={cellSize}
                    x={cell.x + cellSize / 2}
                    y={cell.y + cellSize / 2}
                    stroke='black'
                  />
                )}
                <Rect
                  key={cell.id}
                  width={cellSize}
                  height={cellSize}
                  stroke={cell.selected ? 'yellow' : 'lightgrey'}
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
  }
);

export default Grid;
