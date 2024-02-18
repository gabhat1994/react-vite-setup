import {
  createContext,
  type ReactNode,
  useState,
  type FC,
  useMemo,
  useEffect,
  useContext,
} from 'react';
import { t } from 'i18next';
import { useToast } from '@/hooks/toast';
import useBandwidthDetection from '@/hooks/useBandwidthDetection';

export type TNetworkStatus = 'offline' | 'online';

const NetworkContext = createContext<{
  status: TNetworkStatus;
}>({
  status: 'online',
});

export const useNetworkContext = () => useContext(NetworkContext);

export const NetworkProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [netStatus, setNetStatus] = useState<TNetworkStatus>('online');
  const { addToast, removeToast } = useToast();
  useBandwidthDetection(netStatus);

  const payload = useMemo(() => ({ status: netStatus }), [netStatus]);
  useEffect(() => {
    const changeStatus = (e: Event) => setNetStatus(e.type as TNetworkStatus);
    window.addEventListener('offline', changeStatus);
    window.addEventListener('online', changeStatus);

    return () => {
      window.removeEventListener('offline', changeStatus);
      window.removeEventListener('online', changeStatus);
    };
  }, []);

  useEffect(() => {
    if (netStatus === 'offline') {
      addToast('error', 'none', t('noumena.network.offline'), true);
    } else {
      removeToast('');
    }
  }, [addToast, netStatus, removeToast]);

  return (
    <NetworkContext.Provider value={payload}>
      {children}
    </NetworkContext.Provider>
  );
};
