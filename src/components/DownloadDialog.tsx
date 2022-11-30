import { Dialog } from '@headlessui/react';
import Konva from 'konva';
import { Fragment, useRef } from 'react';
import { Layer, Rect, Stage } from 'react-konva';
import { useDocument } from '../lib/DocumentProvider';
import { GridCell } from './Grid';
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

const CANVAS_SIZE = 300;

function Backdrop(): JSX.Element {
  return <div className='fixed inset-0 bg-black/30' aria-hidden='true' />;
}

function DownloadDialog({ open, onClose }: Props): JSX.Element {
  const stageRef = useRef<Konva.Stage>(null);
  const { title, cells, gridColumns, gridRows } = useDocument();

  const gridCells = cells.map((cell, index): GridCell => {
    return {
      ...cell,
      x: (index % gridColumns) * (CANVAS_SIZE / gridColumns),
      y: Math.floor(index / gridRows) * (CANVAS_SIZE / gridColumns),
      selected: false,
    };
  });

  function download(): void {
    const uri = stageRef.current!.toDataURL();
    downloadURI(uri, title);
  }

  return (
    <Dialog open={open} onClose={onClose} className='relative z-50'>
      <Backdrop />
      <div className='fixed inset-0 flex items-center justify-center p-4'>
        <Dialog.Panel className='rounded bg-white p-4'>
          <Dialog.Title>Download "{title}"</Dialog.Title>
          <Stage
            ref={stageRef}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            style={{
              border: '1px solid',
            }}
          >
            <Layer>
              {gridCells.map((cell) => {
                return (
                  <Fragment key={cell.id}>
                    {cell.background && (
                      <Rect
                        width={CANVAS_SIZE / gridColumns}
                        height={CANVAS_SIZE / gridRows}
                        x={cell.x}
                        y={cell.y}
                        fill={cell.background}
                      />
                    )}
                    {cell.shape && (
                      <ShapeFactory
                        cell={cell}
                        width={CANVAS_SIZE / gridColumns}
                      />
                    )}
                  </Fragment>
                );
              })}
            </Layer>
          </Stage>
          <button onClick={download}>Download</button>
          <button onClick={onClose}>Cancel</button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default DownloadDialog;
