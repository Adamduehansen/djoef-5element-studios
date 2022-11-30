import { useState } from 'react';
import DownloadDialog from '../components/DownloadDialog';
import EditDocument from '../components/EditDocument';
import EditorHeader from '../components/EditorHeader';
import Grid from '../components/Grid';
import SelectedCell from '../components/SelectedCell';
import DocumentProvider from '../lib/DocumentProvider';

function Editor(): JSX.Element {
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);

  return (
    <DocumentProvider>
      <div className='h-screen w-screen flex flex-col relative'>
        <EditorHeader />
        <div className='h-screen flex'>
          <div className='h-full w-[300px] border-r'>
            <SelectedCell />
          </div>
          <div className='w-full flex justify-center items-center'>
            <Grid />
          </div>
          <div className='h-full w-[300px] border-l'>
            <EditDocument
              onDownload={() => {
                setShowDownloadDialog(true);
              }}
            />
          </div>
        </div>
      </div>
      <DownloadDialog
        open={showDownloadDialog}
        onClose={() => {
          setShowDownloadDialog(false);
        }}
      />
    </DocumentProvider>
  );
}

export default Editor;
