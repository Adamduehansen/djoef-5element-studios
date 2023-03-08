export const shapes = ['arc', 'circle', 'triangle', 'rect'] as const;
export type ShapeName = (typeof shapes)[number];

export default ShapeName;
