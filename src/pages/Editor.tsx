import { useState } from 'react';
import { Popover } from '@headlessui/react';
import {
  Bars3Icon,
  AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/solid';
import DownloadDialog from '../components/DownloadDialog';
import EditDocument from '../components/edit/EditDocument';
import EditorHeader from '../components/edit/EditorHeader';
import EditorGrid from '../components/edit/EditorGrid';
import SelectedCell from '../components/edit/SelectedCell';
import DocumentProvider from '../lib/DocumentProvider';

function Editor(): JSX.Element {
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);
  const [showCellEditor, setShowCellEditor] = useState(false);
  const [showDocumentEditor, setShowDocumentEditor] = useState(false);

  return (
    <DocumentProvider>
      <div className='flex h-screen w-screen flex-col'>
        <EditorHeader />
        <div className='relative flex h-screen'>
          <Popover className='absolute top-1 left-1'>
            <Popover.Button
              className='h-6 w-6'
              onClick={(): void => {
                setShowCellEditor((current) => {
                  return !current;
                });
              }}
            >
              <AdjustmentsHorizontalIcon />
            </Popover.Button>
            {showCellEditor && (
              <Popover.Panel
                static
                className='absolute left-0 z-10 rounded border bg-white p-2'
              >
                <SelectedCell />
              </Popover.Panel>
            )}
          </Popover>
          <div className='flex w-full items-center justify-center overflow-hidden'>
            <EditorGrid />
          </div>
          <Popover className='absolute top-1 right-1'>
            <Popover.Button
              className='h-6 w-6'
              onClick={(): void => {
                setShowDocumentEditor((current) => {
                  return !current;
                });
              }}
            >
              <Bars3Icon />
            </Popover.Button>
            {showDocumentEditor && (
              <Popover.Panel
                static
                className='absolute right-0 z-10 rounded border bg-white p-2'
              >
                <EditDocument
                  onDownload={(): void => {
                    setShowDownloadDialog(true);
                  }}
                />
              </Popover.Panel>
            )}
          </Popover>
        </div>
      </div>
      <DownloadDialog
        open={showDownloadDialog}
        onClose={(): void => {
          setShowDownloadDialog(false);
        }}
      />
    </DocumentProvider>
  );
}

export default Editor;
