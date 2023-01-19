import { useState } from 'react';
import DocumentList from '../components/DocumentList';
import NewDialog from '../components/NewDialog';
import { getAllDocuments, createDocument, deleteDocument } from '../lib/db';
import DocumentClientProvider from '../lib/DocumentClientProvider';
import Button from '../components/ui/Button';

function Home(): JSX.Element {
  const [showNewDialog, setShowNewDialog] = useState(false);

  function openNewDialog(): void {
    setShowNewDialog(true);
  }

  function closeNewDialog(): void {
    setShowNewDialog(false);
  }

  return (
    <DocumentClientProvider
      client={{
        getAllDocuments: getAllDocuments,
        createDocument: createDocument,
        deleteDocument: deleteDocument,
      }}
    >
      <Button onClick={openNewDialog}>Opret ny</Button>
      <DocumentList />
      <NewDialog open={showNewDialog} onClose={closeNewDialog} />
    </DocumentClientProvider>
  );
}

export default Home;
