import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DocumentDto } from '../lib/db';
import { useDocumentClient } from '../lib/DocumentClientProvider';
import Button from './ui/Button';
import Preview from './Preview';

function DocumentList(): JSX.Element {
  const [documents, setDocuements] = useState<DocumentDto[]>([]);
  const { getAllDocuments, deleteDocument } = useDocumentClient();

  useEffect(() => {
    async function getDocuments(): Promise<void> {
      setDocuements(await getAllDocuments());
    }
    getDocuments();
  }, []);

  function makeDeleteHandler(id: string): () => void {
    return async function () {
      await deleteDocument(id);
      setDocuements(await getAllDocuments());
    };
  }

  return (
    <ul>
      {documents.map(({ id, title, gridColumns, gridRows, grid }) => {
        return (
          <li key={id} className='flex h-52 w-64 border'>
            <Link to={`/editor/${id}`} className='overflow-hidden'>
              <div className='flex flex-col justify-between h-full'>
                <div>
                  <div className='h-32'>
                    <Preview
                      grid={grid}
                      columns={gridColumns}
                      rows={gridRows}
                      cellSize={64}
                    />
                  </div>
                  <div className='truncate'>{title}</div>
                </div>
                <div className='flex justify-between'>
                  {gridColumns} x {gridRows}
                  <Button text='Slet' onClick={makeDeleteHandler(id)} />
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default DocumentList;
