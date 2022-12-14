import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DocumentDto } from '../lib/db';
import { useDocumentClient } from '../lib/DocumentClientProvider';
import Button from '../ui/Button';
import Preview from './Preview';

function DocumentList(): JSX.Element {
  const [documents, setDocuements] = useState<DocumentDto[]>([]);
  const { getAllDocuments, deleteDocument } = useDocumentClient();

  useEffect(() => {
    async function getDocuments() {
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
      {documents.map(({ id, title, gridColumns, gridRows, cells }) => {
        return (
          <li key={id} className='flex'>
            <Link to={`/editor/${id}`}>
              <div className='flex'>
                <div>
                  <div>{title}</div>
                  <div>
                    {gridColumns} x {gridRows}
                  </div>
                </div>
                <Preview
                  cells={cells}
                  columns={gridColumns}
                  rows={gridRows}
                  size={100}
                />
              </div>
            </Link>
            <Button text='Slet' onClick={makeDeleteHandler(id)} />
          </li>
        );
      })}
    </ul>
  );
}

export default DocumentList;
