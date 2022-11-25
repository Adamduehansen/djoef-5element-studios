import { ComponentType } from 'react';
import { Shape as KonvaShape, Circle as KonvaCircle } from 'react-konva';
import Shape from '../lib/Shape';
import { GridCell } from './Grid';

interface ShapeProps {
  cell: GridCell;
  width: number;
}

function Triangle({ cell, width }: ShapeProps): JSX.Element {
  return (
    <KonvaShape
      sceneFunc={(context, shape) => {
        const { x } = cell;
        const { y } = cell;
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x + width, y + width);
        context.lineTo(x, y + width);
        context.closePath();
        context.fillStrokeShape(shape);
      }}
      fill={cell.color}
    />
  );
}

function Arc({ cell, width }: ShapeProps): JSX.Element {
  return (
    <KonvaShape
      sceneFunc={(context, shape) => {
        const { x } = cell;
        const { y } = cell;
        context.beginPath();
        context.moveTo(x, y);
        context.quadraticCurveTo(x + width, y, x + width, y + width);
        context.lineTo(x, y + width);
        context.closePath();
        context.fillStrokeShape(shape);
      }}
      fill={cell.color}
    />
  );
}

function Circle({ cell, width }: ShapeProps): JSX.Element {
  return (
    <KonvaCircle
      width={width}
      height={width}
      x={cell.x + width / 2}
      y={cell.y + width / 2}
      fill={cell.color}
    />
  );
}

const shapeDictionary = new Map<Shape, any>();
shapeDictionary.set('arc', Arc);
shapeDictionary.set('triangle', Triangle);
shapeDictionary.set('circle', Circle);

function ShapeFactory(props: ShapeProps): JSX.Element {
  const Componet: ComponentType<ShapeProps> = shapeDictionary.get(
    props.cell.shape!
  );
  return <Componet {...props} />;
}

export default ShapeFactory;
