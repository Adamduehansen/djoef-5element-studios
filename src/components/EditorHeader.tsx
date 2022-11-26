import { Stage } from 'konva/lib/Stage';
import { useState } from 'react';
import { useDocument } from '../lib/DocumentProvider';

function downloadURI(uri: string, name: string) {
  var link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

interface Props {
  stage: Stage;
}

function EditorHeader({ stage }: Props): JSX.Element {
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

  function onDownload() {
    const uri = stage.toDataURL();
    downloadURI(uri, title);
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
        <button onClick={onDownload}>Download</button>
      </div>
    </header>
  );
}

export default EditorHeader;
