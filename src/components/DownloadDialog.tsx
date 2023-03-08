import { Dialog } from '@headlessui/react';
import Konva from 'konva';
import React, { useRef } from 'react';
import { useDocument } from '../lib/DocumentProvider';
import createSvgDataUrl from '../lib/createSvgDataUrl';
import Preview from './Preview';
import Button from './ui/Button';

interface Props {
  open: boolean;
  onClose: () => void;
}

function downloadURI(uri: string, name: string): void {
  const link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function Backdrop(): JSX.Element {
  return <div className='fixed inset-0 bg-black/30' aria-hidden='true' />;
}

function DownloadDialog({ open, onClose }: Props): JSX.Element {
  const stageRef = useRef<Konva.Stage>(null);
  const { title, grid, gridColumns, gridRows } = useDocument();

  const onDownload: React.FormEventHandler<HTMLFormElement> = function (event) {
    event.preventDefault();

    if (stageRef.current === null) {
      return;
    }

    const layers = stageRef.current.getLayers();
    if (layers.length === 0) {
      return;
    }

    const shapes = layers[0].getChildren().map((child) => child.attrs);

    const uri = createSvgDataUrl({
      width: 256,
      height: 256,
      shapes: shapes.map((shape) => {
        return {
          name: shape.name,
          x: shape.x,
          y: shape.y,
          color: shape.fill,
          rotation: shape.rotation,
        };
      }),
    });
    downloadURI(uri, title);
  };

  return (
    <Dialog open={open} onClose={onClose} className='relative z-50'>
      <Backdrop />
      <div className='fixed inset-0 flex items-center justify-center p-4'>
        <Dialog.Panel className='rounded bg-white p-4'>
          <Dialog.Title>Download {title}</Dialog.Title>
          <div className='flex flex-col items-center justify-center'>
            <Preview
              ref={stageRef}
              cellSize={64}
              grid={grid}
              columns={gridColumns}
              rows={gridRows}
            />
          </div>
          <form onSubmit={onDownload}>
            <Button>Download</Button>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default DownloadDialog;
