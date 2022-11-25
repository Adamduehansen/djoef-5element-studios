import Konva from 'konva';
import { useRef } from 'react';
import EditorHeader from '../components/EditorHeader';
import Grid from '../components/Grid';
import SelectedCell from '../components/SelectedCell';
import DocumentProvider from '../lib/DocumentProvider';

interface GenerateGridOptions {
  rows: number;
  columns: number;
  centerX: number;
  centerY: number;
}

function Editor(): JSX.Element {
  const gridRef = useRef<Konva.Stage>(null);

  return (
    <DocumentProvider>
      <div className='h-screen w-screen flex flex-col relative'>
        <EditorHeader stage={gridRef.current!} />
        <div className='h-screen flex'>
          <div className='h-full w-[300px] border-r'>
            <SelectedCell />
          </div>
          <div className='w-full flex justify-center items-center'>
            <Grid ref={gridRef} />
          </div>
        </div>
      </div>
    </DocumentProvider>
  );
}

export default Editor;
