import { Dialog } from '@headlessui/react';
import { Fragment } from 'react';
import { Layer, Stage } from 'react-konva';
import { useDocument } from '../lib/DocumentProvider';
import { GridCell } from './Grid';
import ShapeFactory from './Shape';

interface Props {
  open: boolean;
  onClose: () => void;
}

// function downloadURI(uri: string, name: string) {
//   var link = document.createElement('a');
//   link.download = name;
//   link.href = uri;
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// }

// function Download(): void {
//   const uri = gridRef.current!.toDataURL();
//   downloadURI(uri, title);
// }

function DownloadDialog({ open, onClose }: Props): JSX.Element {
  const { title, cells, gridColumns, gridRows } = useDocument();

  const gridCells = cells.map((cell): GridCell => {
    return {
      ...cell,
      x: 0,
      y: 0,
      selected: false,
    };
  });

  return (
    <Dialog open={open} onClose={onClose} className='relative z-50'>
      <div className='fixed inset-0 bg-black/30' aria-hidden='true' />
      <div className='fixed inset-0 flex items-center justify-center p-4'>
        <Dialog.Panel className='w-full max-w-sm rounded bg-white p-4'>
          <Dialog.Title>Download "{title}"</Dialog.Title>
          <Stage
            width={300}
            height={300}
            style={{
              border: '1px solid',
            }}
          >
            <Layer>
              {gridCells.map((cell) => {
                return (
                  <Fragment key={cell.id}>
                    {cell.shape && (
                      <ShapeFactory cell={cell} width={300 / gridColumns} />
                    )}
                  </Fragment>
                );
              })}
            </Layer>
          </Stage>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default DownloadDialog;
