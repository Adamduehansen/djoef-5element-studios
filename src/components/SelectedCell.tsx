import { Listbox } from '@headlessui/react';
import { Fragment } from 'react';
import type Cell from '../lib/Cell';
import Shape, { shapes } from '../lib/Shape';

interface Props {
  cell?: Cell;
  onShapeChange: (cellId: string, shape: Shape) => void;
  onColorChange: (cellId: string, color: string) => void;
}

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

function SelectedCell({
  cell,
  onShapeChange,
  onColorChange,
}: Props): JSX.Element | null {
  if (!cell) {
    return <div>Vælg en celle</div>;
  }

  function handleOnShapeChange(shape: Shape) {
    onShapeChange(cell!.id, shape);
  }

  function handleOnColorChange(color: string) {
    onColorChange(cell!.id, color);
  }

  return (
    <>
      <div>
        <Listbox value={cell.shape} onChange={handleOnShapeChange}>
          <Listbox.Button>
            Figur: {cell.shape ? shapeDictionary.get(cell.shape) : 'Ikke valgt'}
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
        <Listbox value={cell.color} onChange={handleOnColorChange}>
          <Listbox.Button>Farve: {cell.color || 'Ikke valgt'}</Listbox.Button>
          <Listbox.Options>
            <ListBoxOption text='Ingen' value={undefined} />
            {['red', 'green', 'blue'].map((color) => {
              return <ListBoxOption key={color} value={color} text={color} />;
            })}
          </Listbox.Options>
        </Listbox>
      </div>
    </>
  );
}

export default SelectedCell;
