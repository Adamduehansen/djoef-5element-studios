import { openDB, DBSchema } from 'idb';
import Cell from './Cell';

export interface DocumentDto {
  title: string;
  cells: Cell[];
  gridRows: number;
  gridColumns: number;
}

interface DB extends DBSchema {
  documents: {
    key: string;
    value: DocumentDto;
  };
}

export async function getDB() {
  return await openDB<DB>('djoef-5element-editor', 1, {
    upgrade: function (db) {
      db.createObjectStore('documents');
    },
  });
}

export async function getDocument(
  id: string
): Promise<DocumentDto | undefined> {
  const db = await getDB();
  return await db.get('documents', id);
}

type NewDocumentOptions = Pick<
  DocumentDto,
  'title' | 'gridRows' | 'gridColumns'
>;
export async function addNewDocument(
  id: string,
  newDocument: NewDocumentOptions
) {
  const db = await getDB();
  const transaction = db.transaction('documents', 'readwrite');
  const store = transaction.objectStore('documents');
  store.add(
    {
      ...newDocument,
      cells: Array.from(Array(9)).map((_, index): Cell => {
        return {
          id: index.toString(),
          rotation: 0,
        };
      }),
    },
    id
  );
  await transaction.done;
}

export async function updateTitleOfDocument(id: string, title: string) {
  const db = await getDB();
  const transaction = db.transaction('documents', 'readwrite');
  const store = transaction.objectStore('documents');
  const document = await store.get(id);
  if (document) {
    await store.put(
      {
        ...document,
        title: title,
      },
      id
    );
  }

  await transaction.done;
}

export async function updateCellsForDocument(id: string, cells: Cell[]) {
  const db = await getDB();
  const transaction = db.transaction('documents', 'readwrite');
  const store = transaction.objectStore('documents');
  const document = await store.get(id);
  if (document) {
    await store.put(
      {
        ...document,
        cells: cells,
      },
      id
    );
  }

  await transaction.done;
}
