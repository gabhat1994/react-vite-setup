import { CREAT_CONVERSATION_WITH_HOME_OWNER } from '@/constants/conversation';
import { ActiveConversationContext } from '@/features/conversation/contexts/ActiveConversationContext';
import ConversationHooks from '@/features/conversation/hooks/globalMessages';
import { ConversationType, ViewMode } from '@/features/conversation/types';
import { DeviceTypeEnum, useDeviceType } from '@/hooks';
import { cleanList } from '@/utils/list';
import { NetworkStatus } from '@apollo/client';
import { useCallback, useContext, useLayoutEffect, useMemo } from 'react';
import { type BottomStatus } from '@/components/Infinite/types';
import { useNoumElement } from '@/features/noums/contexts/NoumElementContext';
import { MessageElementContext } from '../contexts/MessageElementProvider';
import { useConversationType } from '../hooks/useConversationType';

const useChatList = () => {
  const deviceType = useDeviceType();
  const isMobile = Boolean(deviceType === DeviceTypeEnum.MOBILE);
  const { isEditing } = useNoumElement();

  const conversationType = useConversationType();

  const {
    privateConversation,
    conversations,
    networkStatus,
    loading,
    count,
    totalCount,
    unreadCount,
    onFetchMore,
  } = ConversationHooks.useConversationsList(conversationType);
  const hasPrivateConversation = !!privateConversation;

  const paginating = networkStatus === NetworkStatus.fetchMore;
  const hasMore = count < totalCount;
  const infiniteStatus: BottomStatus = paginating
    ? 'loading'
    : hasMore
    ? 'hasNextPage'
    : 'end';

  const isHomeUserConversation =
    conversationType === ConversationType.HOME_USER;

  const allConversations = useMemo(
    () => cleanList([privateConversation, ...conversations]),
    [conversations, privateConversation],
  );

  const cids = useMemo(
    () =>
      cleanList(
        allConversations.map((c) =>
          c.__typename === 'ConversationOutput' ? c.cid : null,
        ),
      ),
    [allConversations],
  );

  const showExampleConversation =
    isEditing && cids.length === 0 && networkStatus === NetworkStatus.ready;

  const {
    isNewConversation,
    setIsNewConversation,
    viewMode,
    setViewMode,
    isNoumLayoutSmallViewMode,
    noumLayoutViewMode,
  } = useContext(MessageElementContext);

  const { activeConversationSid, setActiveConversationSid } = useContext(
    ActiveConversationContext,
  );

  const countConversationToShow = useMemo(() => {
    if (isMobile && viewMode === ViewMode.DEFAULT) {
      return 5;
    }
    if (isNoumLayoutSmallViewMode) {
      return 5;
    }
    return cids.length;
  }, [isMobile, viewMode, isNoumLayoutSmallViewMode, cids.length]);

  const showSlicedConversations =
    (isMobile && viewMode === ViewMode.DEFAULT) || isNoumLayoutSmallViewMode;

  const cidsToRender = useMemo(
    () => cids.slice(0, countConversationToShow),
    [cids, countConversationToShow],
  );

  const leftChannels = totalCount - cidsToRender.length;

  const handleItemClick = useCallback(
    (sid: string) => {
      setActiveConversationSid(sid);
      setIsNewConversation(false);
    },
    [setActiveConversationSid, setIsNewConversation],
  );

  useLayoutEffect(() => {
    if (loading || isNoumLayoutSmallViewMode) {
      return;
    }

    if (!isNewConversation && !activeConversationSid) {
      if (
        conversationType === ConversationType.HOME_USER &&
        !hasPrivateConversation
      ) {
        setActiveConversationSid(CREAT_CONVERSATION_WITH_HOME_OWNER);
      } else if (cids.length > 0) {
        const firstConversation = cids[0];
        setActiveConversationSid(firstConversation || '');
      }
    }
  }, [
    activeConversationSid,
    conversationType,
    cids,
    hasPrivateConversation,
    isNewConversation,
    loading,
    setActiveConversationSid,
    isNoumLayoutSmallViewMode,
  ]);

  return {
    unreadCount,
    onFetchMore,
    handleItemClick,
    leftChannels,
    showSlicedConversations,
    showExampleConversation,
    noumLayoutViewMode,
    infiniteStatus,
    loading,
    cids,
    isNewConversation,
    isHomeUserConversation,
    activeConversationSid,
    allConversations,
    cidsToRender,
    hasPrivateConversation,
    setViewMode,
    viewMode,
    isNoumLayoutSmallViewMode,
  };
};

export default useChatList;
