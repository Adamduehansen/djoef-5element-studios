import { describe, test, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Document from '../contexts/Document';
import EditorHeader from './EditorHeader';
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

  test('should render "unsaved changes" elements to title input', async () => {
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

    fireEvent.change(titleInput, {
      target: {
        value: 'changed',
      },
    });

    const asterix = await screen.findByText('*');
    const updateButton = await screen.findByRole('button', {
      name: 'Opdater Titel',
    });

    // Assert
    expect(asterix).toBeInTheDocument();
    expect(updateButton).toBeInTheDocument();
  });
});
