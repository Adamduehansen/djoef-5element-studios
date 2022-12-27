import { render, screen } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { describe, test, expect } from 'vitest';
import Document, { DocumentProps } from '../../contexts/Document';
import SelectedCell from './SelectedCell';

interface TestDocumentProps extends PropsWithChildren {
  document: DocumentProps;
}

function TestDocument({ document, children }: TestDocumentProps): JSX.Element {
  return <Document.Provider value={document}>{children}</Document.Provider>;
}

describe('SelectedCell', () => {
  test('should render texts on buttons for cell with no values', async () => {
    // Arrange
    render(
      <TestDocument
        // @ts-ignore
        document={{
          grid: [
            {
              id: '1',
              rotation: 0,
            },
          ],
          selectedCellId: '1',
        }}
      >
        <SelectedCell />
      </TestDocument>
    );

    // Act
    const shapeButton = await screen.findByRole('button', {
      name: 'shape-button',
    });

    const colorButton = await screen.findByRole('button', {
      name: 'color-button',
    });

    const backgroundButton = await screen.findByRole('button', {
      name: 'background-button',
    });

    // Assert
    expect(shapeButton).toHaveTextContent(/Figur/);
    expect(shapeButton).toHaveTextContent(/Ikke valgt/);
    expect(colorButton).toHaveTextContent(/Farve/);
    expect(colorButton).toHaveTextContent(/Ikke valgt/);
    expect(backgroundButton).toHaveTextContent(/Baggrund/);
    expect(backgroundButton).toHaveTextContent(/Ikke valgt/);
  });

  test('should render values on buttons for cell', async () => {
    // Arrange
    render(
      <TestDocument
        // @ts-ignore
        document={{
          grid: [
            {
              id: '1',
              rotation: 0,
              shape: 'circle',
              color: 'any-color',
              background: 'any-background',
            },
          ],
          selectedCellId: '1',
        }}
      >
        <SelectedCell />
      </TestDocument>
    );

    // Act
    const shapeButton = await screen.findByRole('button', {
      name: 'shape-button',
    });

    const colorButton = await screen.findByRole('button', {
      name: 'color-button',
    });

    const backgroundButton = await screen.findByRole('button', {
      name: 'background-button',
    });

    // Assert
    expect(shapeButton).toHaveTextContent(/Figur/);
    expect(shapeButton).toHaveTextContent(/Cirkel/);
    expect(colorButton).toHaveTextContent(/Farve/);
    expect(colorButton).toHaveTextContent(/any-color/);
    expect(backgroundButton).toHaveTextContent(/Baggrund/);
    expect(backgroundButton).toHaveTextContent(/any-background/);
  });
});
