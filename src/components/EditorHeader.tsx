import { Stage } from 'konva/lib/Stage';
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

  function makeOnTitleChange() {
    return function (event: React.ChangeEvent<HTMLInputElement>) {
      setTitle(event.target.value);
    };
  }

  function makeOnGridChange() {
    return function () {
      setShowGrid(!showGrid);
    };
  }

  function onDownload() {
    const uri = stage.toDataURL();
    downloadURI(uri, title);
  }

  return (
    <header className='p-4 flex justify-between border-b'>
      <div>
        <input type='text' value={title} onChange={makeOnTitleChange()} />
        <button onClick={() => {}}>Gem</button>
      </div>
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
