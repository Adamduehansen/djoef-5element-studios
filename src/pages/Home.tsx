import DocumentList from '../components/DocumentList';
import { getAllDocuments } from '../lib/db';
import DocumentClientProvider from '../lib/DocumentClientProvider';

function Home(): JSX.Element {
  return (
    <DocumentClientProvider
      client={{
        getAllDocuments: getAllDocuments,
      }}
    >
      <h1>Home</h1>
      <DocumentList />
    </DocumentClientProvider>
  );
}

export default Home;
