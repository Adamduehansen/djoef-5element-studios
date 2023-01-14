import { Link } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useDocument } from '../../lib/DocumentProvider';

function EditorHeader(): JSX.Element {
  const { title } = useDocument();

  return (
    <header className='flex items-center justify-between border-b py-2'>
      <Link to='/' aria-label='close' className='p-1'>
        <XMarkIcon className='h-6 w-6' />
      </Link>
      <h1>{title}</h1>
      <div></div>
    </header>
  );
}

export default EditorHeader;
