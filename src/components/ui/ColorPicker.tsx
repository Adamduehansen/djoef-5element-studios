import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import ColorButton from './ColorButton';

interface Props {
  text: string;
  value?: string;
  onColorSelect: (color: string) => void;
}

function ColorPicker({ text, value, onColorSelect }: Props): JSX.Element {
  return (
    <Popover>
      <Popover.Button className='flex items-center justify-center border p-2 rounded'>
        <span>{text}</span>
        <ChevronDownIcon className='w-5 h-5' />
      </Popover.Button>
      <Transition
        enter='transition duration-100 ease-out'
        enterFrom='transform scale-95 opacity-0'
        enterTo='transform scale-100 opacity-100'
        leave='transition duration-75 ease-out'
        leaveFrom='transform scale-100 opacity-100'
        leaveTo='transform scale-95 opacity-0'
      >
        <Popover.Panel className='absolute z-10 bg-white p-4 border rounded-lg'>
          <div>Skov</div>
          <div className='grid grid-cols-3 gap-x-1'>
            <ColorButton value='2f4441' onClick={onColorSelect} />
            <ColorButton value='a4b392' onClick={onColorSelect} />
            <ColorButton value='cbff9e' onClick={onColorSelect} />
          </div>
          <div>Jord</div>
          <div className='grid grid-cols-3 gap-x-1'>
            <ColorButton value='a48471' onClick={onColorSelect} />
            <ColorButton value='ceb7af' onClick={onColorSelect} />
            <ColorButton value='fd4369' onClick={onColorSelect} />
          </div>
          <div>Hav</div>
          <div className='grid grid-cols-3 gap-x-1'>
            <ColorButton value='354867' onClick={onColorSelect} />
            <ColorButton value='bccbca' onClick={onColorSelect} />
            <ColorButton value='3548ff' onClick={onColorSelect} />
          </div>
          <div>Sand</div>
          <div className='grid grid-cols-3 gap-x-1'>
            <ColorButton value='e6cda3' onClick={onColorSelect} />
            <ColorButton value='ebe0cd' onClick={onColorSelect} />
            <ColorButton value='ffff78' onClick={onColorSelect} />
          </div>
          <div>
            <div>Dis</div>
            <ColorButton value='47494f' onClick={onColorSelect} />
            <ColorButton value='cbc9c5' onClick={onColorSelect} />
            <ColorButton value='1c1e24' onClick={onColorSelect} />
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

export default ColorPicker;
