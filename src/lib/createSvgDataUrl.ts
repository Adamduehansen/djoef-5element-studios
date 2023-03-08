import ShapeName from '../lib/types/Shape';

interface Shape {
  x: number;
  y: number;
  name: ShapeName;
  color: string;
  rotation: number;
}

interface Options {
  width: number;
  height: number;
  shapes: Shape[];
}

type TagProperties = Omit<Shape, 'name'>;

const SHAPE_SIZE = 64;

const header = '<?xml version="1.0" encoding="utf-8"?>';
const dataUri = 'data:image/svg+xml;charset=utf-8,';

function handleNeverCase(shapeName: never): never {
  throw new Error(`${shapeName} not handled!`);
}

function createCircle({ x, y, color }: TagProperties): string {
  return `<circle cx="${x}" cy="${y}" r="32" fill="${color}" />`;
}

function createTriangle({ x, y, color, rotation }: TagProperties): string {
  const halfSize = SHAPE_SIZE / 2;
  const point0 = `${x},${y}`;
  const point1 = `${x + SHAPE_SIZE},${y + SHAPE_SIZE}`;
  const point2 = `${x},${y + SHAPE_SIZE}`;

  return `<polygon 
    points="${point0} ${point1} ${point2}" 
    fill="${color}" 
    transform="
      translate(-${halfSize} -${halfSize})
      rotate(${rotation} ${x + halfSize} ${y + halfSize})
    "/>`;
}

function createRect({ x, y, color }: TagProperties): string {
  return `<rect x="${x}" y="${y}" width="${SHAPE_SIZE}" height="${SHAPE_SIZE}" fill="${color}" />`;
}

function createArc({ x, y, color, rotation }: TagProperties): string {
  const halfSize = SHAPE_SIZE / 2;
  return `<path 
    d="M 0 0 C 16.972656 0 33.253906 6.742188 45.253906 18.746094 C 57.257812 30.746094 64 47.027344 64 64 L 0 64 Z M 0 0" 
    fill="${color}" 
    transform="
      translate(${x - halfSize} ${y - halfSize}) 
      rotate(${rotation} 32 32)
    "/>`;
}

function createShapeTag({ name, ...rest }: Shape): string {
  switch (name) {
    case 'arc':
      return createArc(rest);
    case 'circle':
      return createCircle(rest);
    case 'triangle':
      return createTriangle(rest);
    case 'rect':
      return createRect(rest);
    default:
      handleNeverCase(name);
  }
}

function createSvgDataUrl({ width, height, shapes }: Options): string {
  const shapeTags = shapes.map(createShapeTag);
  const svgElement = `<svg width="${width}px" height="${height}px" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">{0}</svg>`;
  return (
    dataUri +
    encodeURIComponent(header + svgElement.replace('{0}', shapeTags.join('')))
  );
}

export default createSvgDataUrl;
