import Konva from 'konva';
import React, { Fragment } from 'react';
import { Layer, Rect, Stage } from 'react-konva';
import type Cell from '../lib/Cell';
import ShapeFactory from './Shape';

interface Props {
  onCellSelected: (cellId: string | undefined, x?: number, y?: number) => void;
  cells: Cell[];
  width: number;
  height: number;
  showGrid: boolean;
}

const Grid = React.forwardRef<Konva.Stage, Props>(
  ({ onCellSelected, cells, width, height, showGrid }, ref) => {
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
                  stroke={cell.selected ? 'yellow' : 'lightgrey'}
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
  }
);

export default Grid;
