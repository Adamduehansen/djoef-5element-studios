import React, { createContext, useContext } from 'react';
import { DocumentDto, NewDocumentOptions } from './db';

interface DocumentClientProps {
  getAllDocuments: () => Promise<DocumentDto[]>;
  createDocument: (options: NewDocumentOptions) => Promise<string>;
}

const DocumentClient = createContext<DocumentClientProps>({
  getAllDocuments: () => Promise.resolve([]),
  createDocument: () => Promise.resolve(''),
});

interface DocumentClientProviderProps extends React.PropsWithChildren {
  client: DocumentClientProps;
}

function DocumentClientProvider({
  client,
  children,
}: DocumentClientProviderProps): JSX.Element {
  return (
    <DocumentClient.Provider value={client}>{children}</DocumentClient.Provider>
  );
}

export default DocumentClientProvider;

export function useDocumentClient(): DocumentClientProps {
  return useContext(DocumentClient);
}
