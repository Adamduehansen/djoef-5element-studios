import { useState } from 'react';
import { useDocument } from '../lib/DocumentProvider';
import Input from '../ui/Input';

interface Props {
  onDownload: (title: string) => void;
}

function EditDocument({ onDownload }: Props): JSX.Element {
  const { title, setTitle, showGrid, setShowGrid, cellSize, setCellSize } =
    useDocument();

  const [documentTitle, setDocumentTitle] = useState(title);
  const [documentCellSize, setDocumentCellSize] = useState<number | undefined>(
    cellSize
  );

  function makeOnGridChange() {
    return function () {
      setShowGrid(!showGrid);
    };
  }

  function onDocumentTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setDocumentTitle(event.target.value);
  }

  function onDocumentCellSizeChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setDocumentCellSize(parseInt(event.target.value));
  }

  function onTitleChangeSubmit(event: React.FormEvent) {
    event.preventDefault();
    setTitle(documentTitle);
  }

  function onCellSizeChangeSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!documentCellSize) {
      return;
    }

    setCellSize(documentCellSize);
  }

  function makeDownloadHandler() {
    return function () {
      onDownload(title);
    };
  }

  return (
    <>
      <form onSubmit={onTitleChangeSubmit} className='flex flex-col'>
        <Input
          type='text'
          text='Titel'
          value={documentTitle}
          onChange={onDocumentTitleChange}
          changed={title !== documentTitle}
        />
        <button>Opdater Titel</button>
      </form>
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
      <form onSubmit={onCellSizeChangeSubmit}>
        <div className='flex'>
          <Input
            type='range'
            text='Celle størrelse (px)'
            value={documentCellSize || ''}
            min='100'
            max='500'
            step='50'
            onChange={onDocumentCellSizeChange}
            changed={cellSize !== documentCellSize}
          />
        </div>
        <button>Opdater Cellstørrelse</button>
      </form>
      <button onClick={makeDownloadHandler()}>Download</button>
    </>
  );
}

export default EditDocument;
