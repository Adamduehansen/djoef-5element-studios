import { Link } from 'react-router-dom';
import { useDocument } from '../lib/DocumentProvider';

function EditorHeader(): JSX.Element {
  const { title } = useDocument();

  return (
    <header className='flex justify-between items-center border-b py-2'>
      <Link to='/' aria-label='close' className='p-2'>
        <div className='w-5'>
          <svg viewBox='0 0 371.23 371.23'>
            <polygon
              points='371.23,21.213 350.018,0 185.615,164.402 21.213,0 0,21.213 164.402,185.615 0,350.018 21.213,371.23 
    185.615,206.828 350.018,371.23 371.23,350.018 206.828,185.615 '
            />
          </svg>
        </div>
      </Link>
      <h1>{title}</h1>
      <div></div>
    </header>
  );
}

export default EditorHeader;
