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
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(width, width);
        context.lineTo(0, width);
        context.closePath();
        context.fillStrokeShape(shape);
      }}
      x={cell.x + width / 2}
      y={cell.y + width / 2}
      rotation={cell.rotation}
      stroke='1px solid'
      strokeEnabled={cell.color === undefined}
      offset={{
        x: width / 2,
        y: width / 2,
      }}
      fill={cell.color}
    />
  );
}

function Arc({ cell, width }: ShapeProps): JSX.Element {
  return (
    <KonvaShape
      sceneFunc={(context, shape) => {
        context.beginPath();
        context.moveTo(0, 0);
        context.quadraticCurveTo(width, 0, width, width);
        context.lineTo(0, width);
        context.closePath();
        context.fillStrokeShape(shape);
      }}
      x={cell.x + width / 2}
      y={cell.y + width / 2}
      rotation={cell.rotation}
      stroke='1px solid'
      strokeEnabled={cell.color === undefined}
      offset={{
        x: width / 2,
        y: width / 2,
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
      stroke='1px solid'
      strokeEnabled={cell.color === undefined}
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
