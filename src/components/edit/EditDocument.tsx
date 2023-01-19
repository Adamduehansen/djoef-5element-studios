import { useDocument } from '../../lib/DocumentProvider';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface Props {
  onDownload: (title: string) => void;
}

function EditDocument({ onDownload }: Props): JSX.Element {
  const { title, setTitle, showGrid, setShowGrid } = useDocument();

  function makeOnGridChange() {
    return function () {
      setShowGrid(!showGrid);
    };
  }

  function onDocumentTitleChange({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void {
    setTitle(target.value);
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
      <Button onClick={makeDownloadHandler()}>Download</Button>
    </>
  );
}

export default EditDocument;
