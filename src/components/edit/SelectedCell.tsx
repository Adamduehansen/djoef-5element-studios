import { Listbox } from '@headlessui/react';
import { Fragment } from 'react';
import { useDocument } from '../../lib/DocumentProvider';
import Shape, { shapes } from '../../lib/types/Shape';
import ColorPicker from '../ui/ColorPicker';

const shapeDictionary = new Map<Shape, string>();
shapeDictionary.set('arc', 'Bue');
shapeDictionary.set('circle', 'Cirkel');
shapeDictionary.set('triangle', 'Trekant');

interface ListBoxOptionProps {
  text: string;
  value: string | undefined;
}

function ListBoxOption({ text, value }: ListBoxOptionProps): JSX.Element {
  return (
    <Listbox.Option value={value} as={Fragment}>
      {({ active, selected }): JSX.Element => {
        return (
          <li className={selected ? 'text-green-500' : 'text-red-500'}>
            {text}
          </li>
        );
      }}
    </Listbox.Option>
  );
}

function SelectedCell(): JSX.Element | null {
  const {
    selectedCellId,
    grid,
    setCellShape,
    setCellColor,
    setCellBackground,
    rotateCellLeft,
    rotateCellRight,
  } = useDocument();

  if (!selectedCellId) {
    return <div>Vælg en celle</div>;
  }

  function handleOnShapeChange(shape: Shape): void {
    if (!selectedCellId) {
      return;
    }
    setCellShape(selectedCellId, shape);
  }

  function handleOnColorChange(color: string): void {
    if (!selectedCellId) {
      return;
    }
    setCellColor(selectedCellId, color);
  }

  function handleBackgroundChange(color: string): void {
    if (!selectedCellId) {
      return;
    }
    setCellBackground(selectedCellId, color);
  }

  function handleRotateLeft(): void {
    if (!selectedCellId) {
      return;
    }
    rotateCellLeft(selectedCellId);
  }

  function handleRotateRight(): void {
    if (!selectedCellId) {
      return;
    }
    rotateCellRight(selectedCellId);
  }

  const selectedCell = grid.flat().find((cell) => cell.id === selectedCellId);

  if (!selectedCell) {
    return null;
  }

  return (
    <>
      <div>
        Baggrundsfarve:
        <ColorPicker onColorSelect={handleBackgroundChange} />
      </div>
      <div>
        <Listbox
          value={selectedCell.shape || ''}
          onChange={handleOnShapeChange}
        >
          <Listbox.Button aria-label='shape-button'>
            Figur:
            {selectedCell.shape
              ? shapeDictionary.get(selectedCell.shape)
              : 'Ikke valgt'}
          </Listbox.Button>
          <Listbox.Options>
            <ListBoxOption text='Ingen' value={undefined} />
            {shapes.map((shape) => {
              return (
                <ListBoxOption
                  key={shape}
                  value={shape}
                  text={shapeDictionary.get(shape) || ''}
                />
              );
            })}
          </Listbox.Options>
        </Listbox>
      </div>
      <div>
        Figur farve:
        <ColorPicker onColorSelect={handleOnColorChange} />
      </div>
      <div>
        <span className='block'>Rotate</span>
        <button aria-label='rotate-left' onClick={handleRotateLeft}>
          Left
        </button>
        <button aria-label='rotate-right' onClick={handleRotateRight}>
          Right
        </button>
      </div>
    </>
  );
}

export default SelectedCell;
