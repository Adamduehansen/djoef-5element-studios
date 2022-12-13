import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDocumentClient } from '../lib/DocumentClientProvider';
import Input from '../ui/Input';

interface Props {
  open: boolean;
  onClose: () => void;
}

function Backdrop(): JSX.Element {
  return <div className='fixed inset-0 bg-black/30' aria-hidden='true' />;
}

function NewDialog({ open, onClose }: Props): JSX.Element {
  const [size, setSize] = useState(4);
  const [title, setTitle] = useState(crypto.randomUUID());

  const { createDocument } = useDocumentClient();
  const navigate = useNavigate();

  async function onFormSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    const id = await createDocument({
      title: title,
      gridRows: size,
      gridColumns: size,
    });
    navigate(`editor/${id}`);
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <Backdrop />
      <div className='fixed inset-0 flex items-center justify-center p-4'>
        <Dialog.Panel className='rounded bg-white p-4'>
          <Dialog.Title>Opret ny</Dialog.Title>
          <form onSubmit={onFormSubmit}>
            <Input
              text='Titel'
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
            <Input
              text='Størrelse (bredde/højde)'
              type='number'
              value={size}
              onChange={(event) => {
                setSize(parseInt(event.target.value));
              }}
            />
            <button>Opret</button>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default NewDialog;
