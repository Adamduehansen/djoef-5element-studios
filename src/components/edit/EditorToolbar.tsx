import {
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
} from '@heroicons/react/24/solid';
import { useDocument } from '../../lib/DocumentProvider';

const SCALE_APPLIER = 0.25;

function EditorToolbar(): JSX.Element {
  const { scaleFactor, setScaleFactor } = useDocument();

  function zoomIn(): void {
    setScaleFactor(scaleFactor + SCALE_APPLIER);
  }

  function zoomOut(): void {
    setScaleFactor(scaleFactor - SCALE_APPLIER);
  }

  return (
    <div className='p fixed bottom-2 right-2 flex gap-x-2 rounded-md border bg-white p-1'>
      <button className='h-6 w-6' onClick={zoomIn}>
        <MagnifyingGlassPlusIcon />
      </button>
      <button className='h-6 w-6' onClick={zoomOut}>
        <MagnifyingGlassMinusIcon />
      </button>
    </div>
  );
}

export default EditorToolbar;
