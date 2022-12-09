import { Dialog } from '@headlessui/react';
import Konva from 'konva';
import React, { Fragment, useRef, useState } from 'react';
import { Layer, Rect, Stage } from 'react-konva';
import { useDocument } from '../lib/DocumentProvider';
import { GridCell } from './Grid';
import Input from './Input';
import Preview from './Preview';
import ShapeFactory from './Shape';

interface Props {
  open: boolean;
  onClose: () => void;
}

function downloadURI(uri: string, name: string) {
  var link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const DEFAULT_IMAGE_SIZE = 400;

function Backdrop(): JSX.Element {
  return <div className='fixed inset-0 bg-black/30' aria-hidden='true' />;
}

function DownloadDialog({ open, onClose }: Props): JSX.Element {
  const [imageSize, setImageSize] = useState(DEFAULT_IMAGE_SIZE);
  const stageRef = useRef<Konva.Stage>(null);
  const { title, cells, gridColumns, gridRows } = useDocument();

  function onDownloadSizeChange(event: React.ChangeEvent<HTMLInputElement>) {
    setImageSize(parseInt(event.target.value));
  }

  function onDownloadFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const uri = stageRef.current!.toDataURL({
      pixelRatio: imageSize / DEFAULT_IMAGE_SIZE,
    });
    downloadURI(uri, title);
  }

  return (
    <Dialog open={open} onClose={onClose} className='relative z-50'>
      <Backdrop />
      <div className='fixed inset-0 flex items-center justify-center p-4'>
        <Dialog.Panel className='rounded bg-white p-4'>
          <Dialog.Title>Download "{title}"</Dialog.Title>
          <Preview
            ref={stageRef}
            size={DEFAULT_IMAGE_SIZE}
            cells={cells}
            columns={gridColumns}
            rows={gridRows}
          />
          <form onSubmit={onDownloadFormSubmit}>
            <Input
              type='number'
              text='Størrelse'
              value={imageSize}
              onChange={onDownloadSizeChange}
              autoFocus
            />
            <button>Download</button>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default DownloadDialog;
