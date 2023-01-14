import { openDB, DBSchema, IDBPDatabase } from 'idb';
import Cell, { Grid } from './types/Cell';

export interface DocumentDto {
  id: string;
  title: string;
  grid: Grid;
  gridRows: number;
  gridColumns: number;
  scaleFactor: number;
}

export type NewDocumentOptions = Pick<
  DocumentDto,
  'title' | 'gridRows' | 'gridColumns'
>;

export function createGrid(rows: number, cols: number): Grid {
  const grid: Grid = [];
  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    const row: Cell[] = [];
    for (let colIndex = 0; colIndex < cols; colIndex++) {
      row.push({
        id: `${rowIndex}-${colIndex}`,
        rotation: 0,
      });
    }
    grid.push(row);
  }
  return grid;
}

interface DB extends DBSchema {
  document: {
    key: string;
    value: DocumentDto;
  };
}

export async function getDB(): Promise<IDBPDatabase<DB>> {
  return await openDB<DB>('djoef-5element-editor', 1, {
    upgrade: function (db) {
      db.createObjectStore('document');
    },
  });
}

export async function getDocument(
  id: string
): Promise<DocumentDto | undefined> {
  const db = await getDB();
  return await db.get('document', id);
}

export async function createDocument(
  document: NewDocumentOptions
): Promise<string> {
  const db = await getDB();
  const transaction = db.transaction('document', 'readwrite');
  const store = transaction.objectStore('document');
  const { gridColumns, gridRows } = document;
  const id = crypto.randomUUID();
  store.add(
    {
      ...document,
      id: id,
      scaleFactor: 1,
      grid: createGrid(gridRows, gridColumns),
    },
    id
  );
  await transaction.done;
  return id;
}

export async function updateTitleOfDocument(
  id: string,
  title: string
): Promise<void> {
  const db = await getDB();
  const transaction = db.transaction('document', 'readwrite');
  const store = transaction.objectStore('document');
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

export async function updateScaleFactorOfDocument(
  id: string,
  cellSize: number
): Promise<void> {
  const db = await getDB();
  const transaction = db.transaction('document', 'readwrite');
  const store = transaction.objectStore('document');
  const document = await store.get(id);
  if (document) {
    await store.put(
      {
        ...document,
        scaleFactor: cellSize,
      },
      id
    );
  }

  await transaction.done;
}

export async function updateCellsForDocument(
  id: string,
  cells: Grid
): Promise<void> {
  const db = await getDB();
  const transaction = db.transaction('document', 'readwrite');
  const store = transaction.objectStore('document');
  const document = await store.get(id);
  if (document) {
    await store.put(
      {
        ...document,
        grid: cells,
      },
      id
    );
  }

  await transaction.done;
}

export async function getAllDocuments(): Promise<DocumentDto[]> {
  const db = await getDB();
  const transaction = db.transaction('document', 'readwrite');
  const store = transaction.objectStore('document');
  return await store.getAll();
}

export async function deleteDocument(id: string): Promise<void> {
  const db = await getDB();
  const transaction = db.transaction('document', 'readwrite');
  const store = transaction.objectStore('document');
  await store.delete(id);
}
