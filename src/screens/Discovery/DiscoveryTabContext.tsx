import {
  createContext,
  type FC,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { DiscoveryRecommendedNoumsTab } from '@/features/discovery/hooks';

type DiscoveryTabContextProps = {
  recommendedTab: DiscoveryRecommendedNoumsTab;
  isTabLoading: boolean;
  setIsTabLoading: (value: boolean) => void;
  activeTab: number;
  setActiveTab: (value: number) => void;
};

const DiscoveryTabContextInitialValue: DiscoveryTabContextProps = {
  recommendedTab: DiscoveryRecommendedNoumsTab.NOUM_SPACES,
  isTabLoading: false,
  setIsTabLoading: () => {},
  activeTab: 1,
  setActiveTab: () => {},
};

const DiscoveryTabContext = createContext<DiscoveryTabContextProps>(
  DiscoveryTabContextInitialValue,
);
export const useDiscoveryTabContext = () => useContext(DiscoveryTabContext);

export const DiscoveryTabProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [recommendedTab, setRecommendedTab] =
    useState<DiscoveryRecommendedNoumsTab>(
      DiscoveryRecommendedNoumsTab.NOUM_SPACES,
    );
  const [isTabLoading, setIsTabLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState(1);

  const handleActiveTab = useCallback((tab: number) => {
    setActiveTab(tab);
    if (tab === 2) setRecommendedTab(DiscoveryRecommendedNoumsTab.MEMBERS);
    else if (tab === 1)
      setRecommendedTab(DiscoveryRecommendedNoumsTab.NOUM_SPACES);
    else setRecommendedTab(DiscoveryRecommendedNoumsTab.ALL);
  }, []);

  const value = useMemo(
    () => ({
      recommendedTab,
      isTabLoading,
      setIsTabLoading,
      activeTab,
      setActiveTab: handleActiveTab,
    }),
    [recommendedTab, isTabLoading, setIsTabLoading, activeTab, handleActiveTab],
  );

  return (
    <DiscoveryTabContext.Provider value={value}>
      {children}
    </DiscoveryTabContext.Provider>
  );
};
