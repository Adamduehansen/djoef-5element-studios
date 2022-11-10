import { Fragment } from 'react';
import { Circle, Layer, Rect, Stage } from 'react-konva';
import type Cell from '../lib/Cell';

interface Props {
  onCellSelected: (cellId: string) => void;
  cells: Cell[];
  width: number;
  height: number;
}

function Grid({ onCellSelected, cells, width, height }: Props): JSX.Element {
  function makeCellSelectedHandler(id: string) {
    return function () {
      onCellSelected(id);
    };
  }

  return (
    <Stage width={width} height={height}>
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
                stroke={cell.selected ? 'yellow' : 'black'}
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

export default Grid;
