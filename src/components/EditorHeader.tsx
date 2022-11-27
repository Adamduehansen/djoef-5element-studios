import { useState } from 'react';
import { useDocument } from '../lib/DocumentProvider';
interface Props {
  onDownload: (title: string) => void;
}

function EditorHeader({ onDownload }: Props): JSX.Element {
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
    <header className='p-4 flex justify-between border-b'>
      <form onSubmit={onTitleChangeSubmit} className='flex'>
        <div>
          <label htmlFor='document-title' className='pr-2'>
            Titel
          </label>
          {title !== documentTitle && <span>*</span>}
          <input
            type='text'
            id='document-title'
            value={documentTitle}
            onChange={onDocumentTitleChange}
          />
        </div>
        {title !== documentTitle && <button>Opdater</button>}
      </form>

      <div className='flex justify-between'>
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
        <button onClick={makeDownloadHandler()}>Download</button>
      </div>
    </header>
  );
}

export default EditorHeader;
