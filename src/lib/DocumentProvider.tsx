import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import Document from '../contexts/Document';

interface DocumentDto {
  title: string;
}

function getDocument(id?: string): DocumentDto {
  return {
    title: 'Hello, World!',
  };
}

function DocumentProvider({ children }: React.PropsWithChildren): JSX.Element {
  const { id } = useParams();

  const document = getDocument(id);

  const [title, setTitle] = useState(document.title);
  const [showGrid, setShowGrid] = useState(true);

  return (
    <Document.Provider
      value={{
        title: title,
        setTitle: setTitle,
        showGrid: showGrid,
        setShowGrid: setShowGrid,
      }}
    >
      {children}
    </Document.Provider>
  );
}

export function useDocument() {
  return useContext(Document);
}

export default DocumentProvider;
