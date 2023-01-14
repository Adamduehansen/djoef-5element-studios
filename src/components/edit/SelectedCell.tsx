import { Listbox, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';
import classnames from 'classnames';
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
          <li
            className={classnames('cursor-pointer text-gray-500', {
              'text-black': selected,
              'text-gray-700': active,
            })}
          >
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
      <div className='mb-2'>
        <ColorPicker
          text='Baggrundsfarve'
          value={selectedCell.background}
          onColorSelect={handleBackgroundChange}
        />
      </div>
      <div className='mb-2'>
        <Listbox
          value={selectedCell.shape || ''}
          onChange={handleOnShapeChange}
        >
          <Listbox.Button className='flex items-center justify-center rounded border p-2'>
            Figur
            <ChevronDownIcon className='h-5 w-5' />
          </Listbox.Button>
          <Transition
            enter='transition duration-100 ease-out'
            enterFrom='transform scale-95 opacity-0'
            enterTo='transform scale-100 opacity-100'
            leave='transition duration-75 ease-out'
            leaveFrom='transform scale-100 opacity-100'
            leaveTo='transform scale-95 opacity-0'
          >
            <Listbox.Options className='absolute z-10 rounded-lg border bg-white p-4'>
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
          </Transition>
        </Listbox>
      </div>
      <div className='mb-2'>
        <ColorPicker
          text='Figur farve'
          value={selectedCell.color}
          onColorSelect={handleOnColorChange}
        />
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
