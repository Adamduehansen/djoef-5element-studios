import { openDB, DBSchema } from 'idb';
import Cell from './Cell';

const DEFAULT_CELL_SIZE = 100;

export interface DocumentDto {
  id: string;
  title: string;
  cells: Cell[];
  gridRows: number;
  gridColumns: number;
  cellSize: number;
}

export type NewDocumentOptions = Pick<
  DocumentDto,
  'title' | 'gridRows' | 'gridColumns'
>;

interface DB extends DBSchema {
  documents: {
    key: string;
    value: DocumentDto;
  };
}

export async function getDB() {
  return await openDB<DB>('djoef-5element-editor', 1, {
    upgrade: function (db) {
      db.createObjectStore('documents', {
        keyPath: 'id',
      });
    },
  });
}

export async function getDocument(
  id: string
): Promise<DocumentDto | undefined> {
  const db = await getDB();
  return await db.get('documents', id);
}

export async function createNewDocument(
  newDocument: NewDocumentOptions
): Promise<string> {
  const db = await getDB();
  const transaction = db.transaction('documents', 'readwrite');
  const store = transaction.objectStore('documents');
  const { gridColumns, gridRows } = newDocument;
  const id = crypto.randomUUID();
  store.add(
    {
      ...newDocument,
      id: id,
      cellSize: DEFAULT_CELL_SIZE,
      cells: Array.from(Array(gridColumns * gridRows)).map((_, index): Cell => {
        return {
          id: index.toString(),
          rotation: 0,
        };
      }),
    },
    id
  );
  await transaction.done;
  return id;
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

export async function updateCellSizeOfDocument(id: string, cellSize: number) {
  const db = await getDB();
  const transaction = db.transaction('documents', 'readwrite');
  const store = transaction.objectStore('documents');
  const document = await store.get(id);
  if (document) {
    await store.put(
      {
        ...document,
        cellSize: cellSize,
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

export async function getAllDocuments(): Promise<DocumentDto[]> {
  const db = await getDB();
  const transaction = db.transaction('documents', 'readwrite');
  const store = transaction.objectStore('documents');
  return await store.getAll();
}
