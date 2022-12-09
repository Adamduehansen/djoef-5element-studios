import { Fragment, useEffect, useState } from 'react';
import { Layer, Rect, Stage } from 'react-konva';
import { Link } from 'react-router-dom';
import { DocumentDto } from '../lib/db';
import { useDocumentClient } from '../lib/DocumentClientProvider';
import { GridCell } from './Grid';
import ShapeFactory from './Shape';

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
        const gridCells = cells.map((cell, index): GridCell => {
          return {
            ...cell,
            x: (index % gridColumns) * (100 / gridColumns),
            y: Math.floor(index / gridRows) * (100 / gridColumns),
            selected: false,
          };
        });

        const preview = (
          <Stage
            width={100}
            height={100}
            style={{
              border: '1px solid',
            }}
          >
            <Layer>
              {gridCells.map((cell) => {
                return (
                  <Fragment key={cell.id}>
                    {cell.background && (
                      <Rect
                        width={100 / gridColumns}
                        height={100 / gridRows}
                        x={cell.x}
                        y={cell.y}
                        fill={cell.background}
                      />
                    )}
                    {cell.shape && (
                      <ShapeFactory cell={cell} width={100 / gridColumns} />
                    )}
                  </Fragment>
                );
              })}
            </Layer>
          </Stage>
        );

        return (
          <Link key={id} to={`/editor/${id}`}>
            <li className='flex'>
              <div>
                <div>{title}</div>
                <div>
                  {gridColumns} x {gridRows}
                </div>
              </div>
              {preview}
            </li>
          </Link>
        );
      })}
    </ul>
  );
}

export default DocumentList;
