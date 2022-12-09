import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import DocumentClientProvider from '../lib/DocumentClientProvider';
import DocumentList from './DocumentList';

describe('DocumentList', () => {
  test('should render list of document', async () => {
    // Arrange
    render(
      <DocumentClientProvider
        client={{
          getAllDocuments: async function () {
            return [
              {
                id: 'any-id-1',
                title: 'any-title-1',
                cells: [],
                cellSize: 0,
                gridColumns: 0,
                gridRows: 0,
              },
              {
                id: 'any-id-2',
                title: 'any-title-2',
                cells: [],
                cellSize: 0,
                gridColumns: 0,
                gridRows: 0,
              },
            ];
          },
        }}
      >
        <DocumentList />
      </DocumentClientProvider>
    );

    // Act
    const listItems = await screen.findAllByRole('listitem');

    // Assert
    expect(listItems).toHaveLength(2);
  });
});
