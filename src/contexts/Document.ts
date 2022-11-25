import { createContext } from 'react';

interface DocumentProps {
  title: string;
  setTitle: (value: string) => void;
  showGrid: boolean;
  setShowGrid: (value: boolean) => void;
}

const Document = createContext<DocumentProps>({
  title: 'ny',
  setTitle: () => {},
  showGrid: true,
  setShowGrid: () => {},
});

export default Document;
