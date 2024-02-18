import { ConversationViewContext } from '@/features/conversation/contexts/ConversationViewContext';
import { NoumLayoutViewMode, ViewMode } from '@/features/conversation/types';
import { DeviceTypeEnum, useDeviceType } from '@/hooks';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type FC,
  type ReactNode,
} from 'react';
import { useElementLayoutMode } from '@/features/noums/hooks/noums';
import {
  MessageElementContextInitialValue,
  type MessageElementContextProps,
} from './MessageElementContext';

export const MessageElementContext = createContext<MessageElementContextProps>(
  MessageElementContextInitialValue,
);

export const MessageElementProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const deviceType = useDeviceType();
  const { loading } = useNoumContext();
  const {
    viewMode,
    setViewMode,
    isNewConversation,
    setIsNewConversation,
    conversationType,
    setConversationType,
    conversationWrapperWidth,
    setConversationWrapperWidth,
  } = useContext(ConversationViewContext);

  const [isOthersConversations, setIsOthersConversations] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);

  useEffect(() => {
    setIsOthersConversations(false);
  }, [setIsNewConversation]);

  useEffect(() => {
    if (!isNewConversation) return;
    setIsOthersConversations(false);
  }, [isNewConversation]);

  useEffect(() => {
    if (isNewConversation && deviceType === DeviceTypeEnum.MOBILE)
      setViewMode(ViewMode.FULLCONVERSATION);

    if (deviceType !== DeviceTypeEnum.MOBILE) setViewMode(ViewMode.DEFAULT);
  }, [isNewConversation, deviceType, setViewMode]);

  const noumLayoutViewMode = useElementLayoutMode();

  const value = useMemo(
    () => ({
      loading,
      isNoumLayoutCompactViewMode:
        noumLayoutViewMode === NoumLayoutViewMode.NOUMLAYOUTCOMPACT,
      isNoumLayoutSmallViewMode:
        noumLayoutViewMode === NoumLayoutViewMode.NOUMLAYOUTSMALL,
      isNewConversation,
      setIsNewConversation,
      isOthersConversations,
      setIsOthersConversations,
      viewMode,
      setViewMode,
      unreadMessages,
      setUnreadMessages,
      conversationType,
      setConversationType,
      conversationWrapperWidth,
      setConversationWrapperWidth,
      noumLayoutViewMode,
    }),
    [
      loading,
      isNewConversation,
      setIsNewConversation,
      isOthersConversations,
      viewMode,
      setViewMode,
      unreadMessages,
      conversationType,
      setConversationType,
      conversationWrapperWidth,
      setConversationWrapperWidth,
      noumLayoutViewMode,
    ],
  );

  return (
    <MessageElementContext.Provider value={value}>
      {children}
    </MessageElementContext.Provider>
  );
};

export const useMessageElement = () => {
  const value = useContext(MessageElementContext);

  return value;
};
