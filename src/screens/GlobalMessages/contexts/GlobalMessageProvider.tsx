import {
  createContext,
  type FC,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { ConversationViewContext } from '@/features/conversation/contexts/ConversationViewContext';
import { ConversationType } from '@/features/conversation/types';
import {
  GlobalMessageContextInitialValue,
  type GlobalMessageContextProps,
} from './GlobalMessageContext';

export const GlobalMessageContext = createContext<GlobalMessageContextProps>(
  GlobalMessageContextInitialValue,
);

export const GlobalMessageProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const {
    conversationType,
    setConversationType,
    isNewConversation,
    setIsNewConversation,
  } = useContext(ConversationViewContext);
  const [notExistsConversation, setNotExistsConversation] =
    useState<boolean>(true);

  const prevTab = useMemo(() => {
    if (conversationType === ConversationType.GLOBAL_DIRECT) return 1;
    if (conversationType === ConversationType.GLOBAL_NOUM) return 2;
    return 0;
  }, [conversationType]);

  const [selectedTabId, setSelectedTabId] = useState<number>(prevTab);

  const handleSelectTab = useCallback(
    (tab: number) => {
      setSelectedTabId(tab);
      if (tab === 1) setConversationType(ConversationType.GLOBAL_DIRECT);
      else if (tab === 2) setConversationType(ConversationType.GLOBAL_NOUM);
      else setConversationType(ConversationType.GLOBAL_ALL);

      if (isNewConversation) setIsNewConversation(false);
    },
    [isNewConversation, setConversationType, setIsNewConversation],
  );

  const value = useMemo(
    () => ({
      notExistsConversation,
      setNotExistsConversation,
      selectedTabId,
      setSelectedTabId: handleSelectTab,
    }),
    [
      notExistsConversation,
      setNotExistsConversation,
      selectedTabId,
      handleSelectTab,
    ],
  );

  return (
    <GlobalMessageContext.Provider value={value}>
      {children}
    </GlobalMessageContext.Provider>
  );
};
