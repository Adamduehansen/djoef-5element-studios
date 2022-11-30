import { useState } from 'react';
import { useDocument } from '../lib/DocumentProvider';
import Input from './Input';

interface Props {
  onDownload: (title: string) => void;
}

function EditDocument({ onDownload }: Props): JSX.Element {
  const { title, setTitle, showGrid, setShowGrid } = useDocument();

  const [documentTitle, setDocumentTitle] = useState(title);

  function makeOnGridChange() {
    return function () {
      setShowGrid(!showGrid);
    };
  }

  function onDocumentTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setDocumentTitle(event.target.value);
  }

  function onTitleChangeSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTitle(documentTitle);
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
      <Input type='number' text='Celle størrelse' />
      <button onClick={makeDownloadHandler()}>Download</button>
    </>
  );
}

export default EditDocument;
