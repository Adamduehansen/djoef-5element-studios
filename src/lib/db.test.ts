import { Grid } from './types/Cell';
import { createGrid } from './db';

describe('db', () => {
  describe('makeGrid', () => {
    test('should make grid for square', () => {
      // Arrange
      const expected: Grid = [
        [
          {
            id: '0-0',
            rotation: 0,
          },
          {
            id: '0-1',
            rotation: 0,
          },
        ],
        [
          {
            id: '1-0',
            rotation: 0,
          },
          {
            id: '1-1',
            rotation: 0,
          },
        ],
      ];

      // Act
      const actual = createGrid(2, 2);

      // Assert
      expect(actual).toEqual(expected);
    });

    test('should make grid for taller', () => {
      // Arrange
      const expected: Grid = [
        [
          {
            id: '0-0',
            rotation: 0,
          },
          {
            id: '0-1',
            rotation: 0,
          },
          {
            id: '0-2',
            rotation: 0,
          },
        ],
        [
          {
            id: '1-0',
            rotation: 0,
          },
          {
            id: '1-1',
            rotation: 0,
          },
          {
            id: '1-2',
            rotation: 0,
          },
        ],
      ];

      // Act
      const actual = createGrid(2, 3);

      // Assert
      expect(actual).toEqual(expected);
    });
  });
});
