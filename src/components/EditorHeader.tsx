import { useDocument } from '../lib/DocumentProvider';

function EditorHeader(): JSX.Element {
  const { title } = useDocument();

  return (
    <header className='flex justify-center items-center border-b py-4'>
      <h1>{title}</h1>
    </header>
  );
}

export default EditorHeader;
