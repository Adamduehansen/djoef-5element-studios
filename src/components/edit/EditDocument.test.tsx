import { describe, test, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Document from '../../contexts/Document';
import EditDocument from './EditDocument';

describe('EditorHeader', () => {
  test('should render title of document as input field', async (): Promise<void> => {
    // Arrange
    render(
      <Document.Provider
        // @ts-ignore
        value={{
          title: 'any-title',
        }}
      >
        <EditDocument onDownload={() => {}} />
      </Document.Provider>
    );

    // Act
    const titleInput = await screen.findByRole('textbox', {
      name: 'Titel',
    });

    // Assert
    expect(titleInput).toBeInTheDocument();
  });
});
