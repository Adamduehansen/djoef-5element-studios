import Konva from 'konva';
import { Fragment, useRef } from 'react';
import { Layer, Rect, Stage } from 'react-konva';
import { Grid } from '../../lib/types/Cell';
import { useDocument } from '../../lib/DocumentProvider';
import { GridCell } from '../../lib/types/GridCell';
import ShapeFactory from '../Shape';
import { Vector2d } from 'konva/lib/types';

type CellGrid = GridCell[][];

const CELL_SIZE = 64;

function createGrid(options: {
  grid: Grid;
  selectedCellId?: string;
}): CellGrid {
  return options.grid.map((row, rowIndex) => {
    return row.map((cell, colIndex): GridCell => {
      return {
        ...cell,
        x: colIndex * CELL_SIZE,
        y: rowIndex * CELL_SIZE,
        selected: options.selectedCellId === cell.id,
      };
    });
  });
}

function getPointOfTouch(touch: Touch): {
  x: number;
  y: number;
} {
  return {
    x: touch.clientX,
    y: touch.clientY,
  };
}

function EditorGrid(): JSX.Element {
  const {
    showGrid,
    grid,
    scaleFactor,
    setScaleFactor,
    setSelectedCellId,
    selectedCellId,
  } = useDocument();
  const containerRef = useRef<HTMLDivElement>(null);

  const gridCells = createGrid({
    grid: grid,
    selectedCellId: selectedCellId,
  });

  function makeCellSelectedHandler(id: string) {
    return function () {
      setSelectedCellId(id);
    };
  }

  function makeMouseCursorChange(cursor: string) {
    return function ({ target }: Konva.KonvaEventObject<MouseEvent>) {
      const stage = target.getStage();
      if (!stage) {
        return;
      }
      const container = stage.container();
      container.style.cursor = cursor;
    };
  }

  return (
    <div ref={containerRef}>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onWheel={({ evt }): void => {
          evt.preventDefault();
          const { deltaY } = evt;
          if (deltaY > 0) {
            setScaleFactor(scaleFactor - 0.1);
          }
          if (deltaY < 0) {
            setScaleFactor(scaleFactor + 0.1);
          }
        }}
        onTouchMove={({ evt }): void => {
          evt.preventDefault();

          const { touches } = evt;
          if (touches.length !== 2) {
            return;
          }

          const [touch1, touch2] = evt.touches;
          const point1 = getPointOfTouch(touch1);
          const point2 = getPointOfTouch(touch2);
          console.log('point 1', point1);
          console.log('point 2', point2);
        }}
        scale={{
          x: scaleFactor,
          y: scaleFactor,
        }}
      >
        <Layer
          onMouseEnter={makeMouseCursorChange('pointer')}
          onMouseLeave={makeMouseCursorChange('default')}
        >
          {gridCells
            .flat()
            .sort((cell) => (cell.selected ? 1 : -1))
            .map((cell) => {
              const onSelectHandler = makeCellSelectedHandler(cell.id);
              return (
                <Fragment key={cell.id}>
                  {cell.background && (
                    <Rect
                      width={CELL_SIZE}
                      height={CELL_SIZE}
                      x={cell.x}
                      y={cell.y}
                      fill={cell.background}
                    />
                  )}
                  {cell.shape && <ShapeFactory cell={cell} width={CELL_SIZE} />}
                  <Rect
                    key={cell.id}
                    width={CELL_SIZE}
                    height={CELL_SIZE}
                    stroke={cell.selected ? 'grey' : 'lightgrey'}
                    strokeEnabled={showGrid}
                    x={cell.x}
                    y={cell.y}
                    onClick={onSelectHandler}
                    onTap={onSelectHandler}
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
