import { openDB, DBSchema, IDBPDatabase } from 'idb';
import Cell, { Grid } from './types/Cell';

const DEFAULT_CELL_SIZE = 100;

export interface DocumentDto {
  id: string;
  title: string;
  grid: Grid;
  gridRows: number;
  gridColumns: number;
  cellSize: number;
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
      cellSize: DEFAULT_CELL_SIZE,
      grid: createGrid(gridRows, gridColumns),
    },
    id
  );
  await transaction.done;
  return id;
}

export async function updateTitleOfDocument(id: string, title: string) {
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

export async function updateCellSizeOfDocument(id: string, cellSize: number) {
  const db = await getDB();
  const transaction = db.transaction('document', 'readwrite');
  const store = transaction.objectStore('document');
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

export async function updateCellsForDocument(id: string, cells: Grid) {
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

export async function deleteDocument(id: string) {
  const db = await getDB();
  const transaction = db.transaction('document', 'readwrite');
  const store = transaction.objectStore('document');
  await store.delete(id);
}
