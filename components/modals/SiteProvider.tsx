'use client';
import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import DonateModal from './DonateModal';
import VolunteerModal from './VolunteerModal';
import VideoModal from './VideoModal';

export type ModalName = 'donate' | 'volunteer' | 'video';

type SiteContext = {
  open: (modal: ModalName) => void;
  close: () => void;
  toast: (message: string) => void;
};

const TOAST_DURATION_MS = 3200;

const Context = createContext<SiteContext | null>(null);

export const useSite = () => {
  const context = useContext(Context);
  if (!context) throw new Error('useSite must be used inside <SiteProvider>');
  return context;
};

/** Holds which modal is open + the toast message. Wraps the whole app (see app/layout.tsx). */
export default function SiteProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<ModalName | null>(null);
  const [message, setMessage] = useState('');
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const toast = useCallback((text: string) => {
    setMessage(text);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setMessage(''), TOAST_DURATION_MS);
  }, []);

  const close = useCallback(() => setModal(null), []);

  return (
    <Context.Provider value={{ open: setModal, close, toast }}>
      {children}

      <DonateModal open={modal === 'donate'} />
      <VolunteerModal open={modal === 'volunteer'} />
      <VideoModal open={modal === 'video'} />

      <div className={`toast${message ? ' on' : ''}`} role="status">
        {message}
      </div>
    </Context.Provider>
  );
}
