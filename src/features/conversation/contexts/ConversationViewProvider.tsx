import { type FC, type ReactNode, useCallback, useMemo, useState } from 'react';
import { DeviceTypeEnum, useDeviceType } from '@/hooks';
import { ConversationViewContext } from './ConversationViewContext';
import { ConversationType, ViewMode } from '../types';

export const ConversationViewProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const deviceType = useDeviceType();

  const [viewMode, changeViewMode] = useState<ViewMode>(ViewMode.DEFAULT);
  const setViewMode = useCallback(
    (value: ViewMode) => {
      if (deviceType === DeviceTypeEnum.MOBILE) {
        changeViewMode(value);
      } else {
        changeViewMode(ViewMode.DEFAULT);
      }
    },
    [deviceType],
  );

  const [isNewConversation, setIsNewConversation] = useState<boolean>(false);
  const [conversationType, setConversationType] = useState(
    ConversationType.GLOBAL_ALL,
  );
  const [conversationWrapperWidth, setConversationWrapperWidth] =
    useState<number>(0);

  const value = useMemo(
    () => ({
      viewMode,
      setViewMode,
      isNewConversation,
      setIsNewConversation,
      conversationType,
      setConversationType,
      conversationWrapperWidth,
      setConversationWrapperWidth,
    }),
    [
      conversationType,
      conversationWrapperWidth,
      isNewConversation,
      setViewMode,
      viewMode,
    ],
  );

  return (
    <ConversationViewContext.Provider value={value}>
      {children}
    </ConversationViewContext.Provider>
  );
};
