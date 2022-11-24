export const shapes = ['arc', 'circle', 'triangle'] as const;
export type Shape = typeof shapes[number];

export default Shape;
