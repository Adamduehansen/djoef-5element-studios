import { Listbox } from '@headlessui/react';
import { Fragment } from 'react';
import type Cell from '../lib/Cell';
import Shape, { shapes } from '../lib/Shape';

interface Props {
  cell?: Cell;
  onShapeChange: (shape: Shape) => void;
}

const shapeDictionary = new Map<Shape, string>();
shapeDictionary.set('arc', 'Bue');
shapeDictionary.set('circle', 'Cirkel');
shapeDictionary.set('triangle', 'Trekant');

interface ListBoxOptionProps {
  text: string;
  value: string;
}

function ListBoxOption({ text, value }: ListBoxOptionProps): JSX.Element {
  return (
    <Listbox.Option value={value} as={Fragment}>
      {({ active }) => (
        <li className={active ? 'text-green-500' : 'text-red-500'}>{text}</li>
      )}
    </Listbox.Option>
  );
}

function SelectedCell({ cell, onShapeChange }: Props): JSX.Element | null {
  if (!cell) {
    return <div>Vælg en celle</div>;
  }

  return (
    <div>
      <Listbox value={cell.shape || 'none'} onChange={onShapeChange}>
        <Listbox.Button>
          Figur: {cell.shape ? shapeDictionary.get(cell.shape) : 'Ikke valgt'}
        </Listbox.Button>
        <Listbox.Options>
          <ListBoxOption text='Ingen' value='none' />
          {shapes.map((shape) => {
            return (
              <Listbox.Option key={shape} value={shape} as={Fragment}>
                {({ active }) => (
                  <li className={active ? 'text-green-500' : 'text-red-500'}>
                    {shapeDictionary.get(shape)}
                  </li>
                )}
              </Listbox.Option>
            );
          })}
        </Listbox.Options>
      </Listbox>
    </div>
  );
}

export default SelectedCell;
