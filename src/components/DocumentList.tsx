import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DocumentDto } from '../lib/db';
import { useDocumentClient } from '../lib/DocumentClientProvider';
import Preview from './Preview';

function DocumentList(): JSX.Element {
  const [documents, setDocuements] = useState<DocumentDto[]>([]);
  const { getAllDocuments: getAllDocument } = useDocumentClient();

  useEffect(() => {
    async function getDocuments() {
      setDocuements(await getAllDocument());
    }
    getDocuments();
  }, []);

  return (
    <ul>
      {documents.map(({ id, title, gridColumns, gridRows, cells }) => {
        return (
          <Link key={id} to={`/editor/${id}`}>
            <li className='flex'>
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
            </li>
          </Link>
        );
      })}
    </ul>
  );
}

export default DocumentList;
