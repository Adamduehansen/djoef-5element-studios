import { Listbox } from '@headlessui/react';
import { Fragment } from 'react';
import type Cell from '../lib/Cell';
import Shape, { shapes } from '../lib/Shape';

interface Props {
  cell?: Cell;
  onShapeChange: (cellId: string, shape: Shape) => void;
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

function SelectedCell({ cell, onShapeChange }: Props): JSX.Element | null {
  if (!cell) {
    return <div>Vælg en celle</div>;
  }

  function makeOnShapeChange(shape: Shape) {
    onShapeChange(cell!.id, shape);
  }

  return (
    <div>
      <Listbox value={cell.shape || 'none'} onChange={makeOnShapeChange}>
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
  );
}

export default SelectedCell;
