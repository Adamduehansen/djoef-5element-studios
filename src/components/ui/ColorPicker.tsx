import { Popover } from '@headlessui/react';
import ColorButton from './ColorButton';

interface Props {
  onColorSelect: (color: string) => void;
}

function ColorPicker({ onColorSelect }: Props): JSX.Element {
  return (
    <Popover>
      <Popover.Button>Vælg farve</Popover.Button>
      <Popover.Panel>
        <div>
          <div>Skov</div>
          <ColorButton value='2f4441' onClick={onColorSelect} />
          <ColorButton value='a4b392' onClick={onColorSelect} />
          <ColorButton value='cbff9e' onClick={onColorSelect} />
        </div>
        <div>
          <div>Jord</div>
          <ColorButton value='a48471' onClick={onColorSelect} />
          <ColorButton value='ceb7af' onClick={onColorSelect} />
          <ColorButton value='fd4369' onClick={onColorSelect} />
        </div>
        <div>
          <div>Hav</div>
          <ColorButton value='354867' onClick={onColorSelect} />
          <ColorButton value='bccbca' onClick={onColorSelect} />
          <ColorButton value='3548ff' onClick={onColorSelect} />
        </div>
        <div>
          <div>Sand</div>
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
    </Popover>
  );
}

export default ColorPicker;
