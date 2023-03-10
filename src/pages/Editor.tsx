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
import EditorToolbar from '../components/edit/EditorToolbar';

function Editor(): JSX.Element {
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);
  const [showCellEditor, setShowCellEditor] = useState(true);
  const [showDocumentEditor, setShowDocumentEditor] = useState(false);

  return (
    <DocumentProvider>
      <div>
        <div className='fixed z-10 w-full'>
          <EditorHeader />
          <div className='flex justify-between'>
            <Popover className='ml-1'>
              <Popover.Button
                className='flex'
                onClick={(): void => {
                  setShowCellEditor((current) => {
                    return !current;
                  });
                }}
              >
                <AdjustmentsHorizontalIcon className='h-6 w-6' />
                <span>Celle</span>
              </Popover.Button>
              {showCellEditor && (
                <Popover.Panel
                  static
                  className='absolute left-1 z-10 rounded border bg-white p-2'
                >
                  <SelectedCell />
                </Popover.Panel>
              )}
            </Popover>
            <Popover>
              <Popover.Button
                className='mr-1 flex'
                onClick={(): void => {
                  setShowDocumentEditor((current) => {
                    return !current;
                  });
                }}
              >
                <span>Dokument</span>
                <Bars3Icon className='h-6 w-6' />
              </Popover.Button>
              {showDocumentEditor && (
                <Popover.Panel
                  static
                  className='absolute right-1 z-10 rounded border bg-white p-2'
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
          <EditorToolbar />
        </div>
        <EditorGrid />
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
