import { useState } from 'react';
import { useDocument } from '../lib/DocumentProvider';
import Input from '../ui/Input';

interface Props {
  onDownload: (title: string) => void;
}

function EditDocument({ onDownload }: Props): JSX.Element {
  const { title, setTitle, showGrid, setShowGrid, cellSize, setCellSize } =
    useDocument();

  function makeOnGridChange() {
    return function () {
      setShowGrid(!showGrid);
    };
  }

  function onDocumentTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  function onDocumentCellSizeChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setCellSize(parseInt(event.target.value));
  }

  function makeDownloadHandler() {
    return function () {
      onDownload(title);
    };
  }

  return (
    <>
      <Input
        type='text'
        text='Titel'
        value={title}
        onChange={onDocumentTitleChange}
      />
      <div>
        <label>
          <input
            type='checkbox'
            checked={showGrid}
            onChange={makeOnGridChange()}
          />
          Vis gitter
        </label>
      </div>
      <Input
        type='range'
        text='Celle størrelse (px)'
        value={cellSize || ''}
        min='100'
        max='500'
        step='10'
        onChange={onDocumentCellSizeChange}
      />
      <button onClick={makeDownloadHandler()}>Download</button>
    </>
  );
}

export default EditDocument;
