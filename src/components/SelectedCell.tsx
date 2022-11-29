import { Listbox } from '@headlessui/react';
import { Fragment } from 'react';
import { useDocument } from '../lib/DocumentProvider';
import Shape, { shapes } from '../lib/Shape';

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
      {({ active, selected }) => (
        <li className={selected ? 'text-green-500' : 'text-red-500'}>{text}</li>
      )}
    </Listbox.Option>
  );
}

function SelectedCell(): JSX.Element | null {
  const {
    selectedCellId,
    cells,
    setCellShape,
    setCellColor,
    setCellBackground,
    rotateCellLeft,
    rotateCellRight,
  } = useDocument();

  if (!selectedCellId) {
    return <div>Vælg en celle</div>;
  }

  function handleOnShapeChange(shape: Shape) {
    setCellShape(selectedCellId!, shape);
  }

  function handleOnColorChange(color: string) {
    setCellColor(selectedCellId!, color);
  }

  function handleBackgroundChange(color: string) {
    setCellBackground(selectedCellId!, color);
  }

  function handleRotateLeft() {
    rotateCellLeft(selectedCellId!);
  }

  function handleRotateRight() {
    rotateCellRight(selectedCellId!);
  }

  const selectedCell = cells.find((cells) => cells.id === selectedCellId)!;

  return (
    <>
      <div>
        <Listbox
          value={selectedCell.shape || ''}
          onChange={handleOnShapeChange}
        >
          <Listbox.Button>
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
        <Listbox
          value={selectedCell.color || ''}
          onChange={handleOnColorChange}
          disabled={selectedCell.shape ? false : true}
        >
          <Listbox.Button>
            Farve: {selectedCell.color || 'Ikke valgt'}
          </Listbox.Button>
          <Listbox.Options>
            <ListBoxOption text='Ingen' value={undefined} />
            {['red', 'green', 'blue'].map((color) => {
              return <ListBoxOption key={color} value={color} text={color} />;
            })}
          </Listbox.Options>
        </Listbox>
      </div>
      <div>
        <Listbox
          value={selectedCell.background || ''}
          onChange={handleBackgroundChange}
        >
          <Listbox.Button>
            Baggrund: {selectedCell.background || 'Ikke valgt'}
          </Listbox.Button>
          <Listbox.Options>
            <ListBoxOption text='Ingen' value={undefined} />
            {['red', 'green', 'blue'].map((color) => {
              return <ListBoxOption key={color} value={color} text={color} />;
            })}
          </Listbox.Options>
        </Listbox>
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
