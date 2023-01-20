import { describe, test, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Document from '../../contexts/Document';
import EditDocument from './EditDocument';

describe('EditorHeader', () => {
  describe('Title input', () => {
    test('should render title of document in input', (): void => {
      // Arrange
      const title = 'any-title';
      render(
        <Document.Provider
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          value={{
            title: title,
          }}
        >
          <EditDocument onDownload={vi.fn()} />
        </Document.Provider>
      );

      // Act
      const titleInput = screen.getByRole('textbox', {
        name: 'Titel',
      });

      // Assert
      expect(titleInput).toHaveValue(title);
    });

    test('should call setTitle in document context on change', () => {
      // Arrange
      const setTitleMock = vi.fn();
      render(
        <Document.Provider
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          value={{
            title: 'any-title',
            setTitle: setTitleMock,
          }}
        >
          <EditDocument onDownload={vi.fn()} />
        </Document.Provider>
      );

      // Act
      const titleInput = screen.getByRole('textbox', {
        name: 'Titel',
      });

      fireEvent.change(titleInput, {
        target: {
          value: 'new-title',
        },
      });

      // Assert
      expect(setTitleMock).toHaveBeenCalled();
    });
  });

  describe('Show grid checkbox', () => {
    test('should be checked when showGrid is true', (): void => {
      // Arrange
      render(
        <Document.Provider
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          value={{
            showGrid: true,
          }}
        >
          <EditDocument onDownload={vi.fn()} />
        </Document.Provider>
      );

      // Act
      const showGridCheckbox = screen.getByRole('checkbox', {
        name: 'Vis gitter',
      });

      // Assert
      expect(showGridCheckbox).toBeChecked();
    });

    test('should not be checked when showGrid is false', (): void => {
      // Arrange
      render(
        <Document.Provider
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          value={{
            showGrid: false,
          }}
        >
          <EditDocument onDownload={vi.fn()} />
        </Document.Provider>
      );

      // Act
      const showGridCheckbox = screen.getByRole('checkbox', {
        name: 'Vis gitter',
      });

      // Assert
      expect(showGridCheckbox).not.toBeChecked();
    });

    test('should call setShowGrid in document context on change', () => {
      // Arrange
      const setShowGridMock = vi.fn();
      render(
        <Document.Provider
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          value={{
            showGrid: false,
            setShowGrid: setShowGridMock,
          }}
        >
          <EditDocument onDownload={vi.fn()} />
        </Document.Provider>
      );

      // Act
      const showGridCheckbox = screen.getByRole('checkbox', {
        name: 'Vis gitter',
      });

      fireEvent.click(showGridCheckbox);

      expect(setShowGridMock).toHaveBeenCalled();
    });
  });
});
