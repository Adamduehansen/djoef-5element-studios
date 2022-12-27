import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, test, expect } from 'vitest';
import Document from '../../contexts/Document';
import EditorHeader from './EditorHeader';

describe('EditorHeader', () => {
  test('should render title of document', async (): Promise<void> => {
    // Arrange
    render(
      <Document.Provider
        // @ts-ignore
        value={{
          title: 'any-title',
        }}
      >
        <EditorHeader />
      </Document.Provider>,
      {
        wrapper: BrowserRouter,
      }
    );

    // Act
    const header = await screen.findByRole('heading', {
      name: 'any-title',
    });

    // Assert
    expect(header).toBeInTheDocument();
  });
});
