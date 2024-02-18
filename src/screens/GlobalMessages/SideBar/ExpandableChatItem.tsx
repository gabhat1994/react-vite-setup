import {
  type ConversationsOutput,
  type NoumGroupConversationItem,
} from '@/apollo/generated/types';
import {
  GetSpaceConversationsAsAdminQueryDocument,
  GetSpaceConversationsDocument,
} from '@/apollo/graphql';
import { Accordion } from '@/components/Accordion';
import { Avatar } from '@/components/Avatar/Avatar';
import { Spinner } from '@/components/Spinner';
import { TSpan } from '@/components/Typography';
import { useAuth } from '@/features/auth/contexts';
import ChatItem from '@/features/conversation/components/ChatItem';
import { useConversationListQueryOptions } from '@/features/conversation/hooks/globalMessages/useConversationListQueryOptions';
import { ConversationType } from '@/features/conversation/types';
import { cleanList } from '@/utils/list';
import { useLazyQuery } from '@apollo/client';
import { t } from 'i18next';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import { Trans } from 'react-i18next';
import { type ConversationOutputFragment } from '@/apollo/graphql/fragments';
import {
  Divider,
  NoumGroupLoading,
  StyledLoadMore,
  StyledSubtitle,
  UnreadMessageSign,
} from './styles';

export const ExpandableChatItem = ({
  conversationItem,
  activeConversationSid,
  isNewConversation,
  handleClickItem,
}: {
  conversationItem: NoumGroupConversationItem;
  activeConversationSid: string;
  isNewConversation: boolean;
  handleClickItem: (sid: string) => void;
}) => {
  const { user } = useAuth();
  const spaceId = conversationItem.noum?._id;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [showLoadingSection, setShowLoadingSection] = useState<boolean>(false);
  const [unreadConversations, setUnreadConversations] = useState<number>(0);
  const [conversations, setConversations] = useState<
    ConversationOutputFragment[]
  >(
    cleanList(
      conversationItem.conversations?.map((item) => item?.conversation),
    ),
  );
  const conversationType =
    conversationItem.noum?.uid?._id === user?._id
      ? ConversationType.PROJECT_OWNER
      : ConversationType.PROJECT_USER;
  const queryOptions = useConversationListQueryOptions(conversationType);
  const [, { fetchMore }] = useLazyQuery(
    conversationType === ConversationType.PROJECT_OWNER
      ? GetSpaceConversationsAsAdminQueryDocument
      : GetSpaceConversationsDocument,
    {
      fetchPolicy: 'cache-and-network',
      variables: {
        ...queryOptions?.variables,
        offset: 0,
        limit: 10,
        spaceId,
      },
    },
  );

  const handleLoadMore = useCallback(async () => {
    if (!spaceId || !queryOptions?.variables) {
      return;
    }
    setIsLoadingMore(true);
    const result = await fetchMore({
      variables: {
        offset: conversations.length,
        limit: 10,
      },
    });

    const spaceConversationsData = (
      (result.data.getSpaceConversations ||
        result.data.getSpaceConversationsAsAdminQuery) as ConversationsOutput
    ).data;
    const cleaned = cleanList(spaceConversationsData);
    if (cleaned?.length) {
      setConversations((prev) => [
        ...prev,
        ...cleaned.filter((newItem) =>
          prev.every((item) => newItem._id !== item._id),
        ),
      ]);
    }
    setIsLoadingMore(false);
  }, [conversations.length, fetchMore, queryOptions?.variables, spaceId]);

  const unreadConversationsMap = useMemo(
    () =>
      conversationItem.conversations?.reduce(
        (prev: { [cid: string]: number }, item) => ({
          ...prev,
          [item?.conversation?.cid!]: item?.unread || 0,
        }),
        {},
      ) || {},
    [conversationItem],
  );

  const handleClick = useCallback(
    (sid: string) => {
      handleClickItem(sid);
      if (unreadConversationsMap[sid]) {
        unreadConversationsMap[sid] = 0;
      }
    },
    [handleClickItem, unreadConversationsMap],
  );

  const handleReadChatItem = useCallback(
    (sid: string) => {
      if (unreadConversationsMap[sid]) {
        unreadConversationsMap[sid] = 0;
      }
    },
    [unreadConversationsMap],
  );

  useEffect(
    () => setUnreadConversations(conversationItem.unreadConversation || 0),
    [conversationItem],
  );

  useLayoutEffect(
    () =>
      setUnreadConversations(
        Object.values(unreadConversationsMap).reduce(
          (prev, curr) => (curr ? prev + 1 : prev),
          0,
        ),
      ),
    [unreadConversationsMap],
  );

  useEffect(() => {
    setConversations(
      cleanList(
        conversationItem.conversations?.map((item) => item?.conversation),
      ),
    );
  }, [conversationItem.conversations]);

  useLayoutEffect(() => {
    const showLoadMore =
      (conversationItem.conversationsCount || 0) > conversations.length;
    setShowLoadingSection(showLoadMore);
  }, [conversationItem.conversationsCount, conversations.length]);

  useLayoutEffect(() => {
    const cids = cleanList(
      conversationItem.conversations?.map((item) => item?.conversation?.cid),
    );
    setIsOpen(cids.includes(activeConversationSid));
  }, [activeConversationSid, conversationItem.conversations]);

  return (
    <div>
      <Accordion
        key={`accord-${conversationItem.noum?._id}`}
        expanded={isOpen}
        onToggle={setIsOpen}
        headerGap={16}
        left={<Avatar url={conversationItem.noum?.profileImage} />}
        title={conversationItem.noum?.name || ''}
        isBoldTitle
        contentHeightKey={String(conversations.length)}
        subtitle={
          <StyledSubtitle>
            {unreadConversations ? <UnreadMessageSign /> : null}
            <Trans
              i18nKey={
                conversationItem.conversationsCount! > 1
                  ? 'noumena.message.conversations_number_note'
                  : 'noumena.message.conversation_number_note'
              }
              values={{
                numConversations: conversationItem.conversationsCount,
              }}
              components={{
                primary: (
                  <TSpan
                    font="body-m-bold"
                    colorToken="--text-tablecell-brand-primary-default"
                  />
                ),
              }}
            />
          </StyledSubtitle>
        }
      >
        <>
          <Divider />
          {conversations.map((item, index) => (
            <ChatItem
              key={item._id}
              index={index}
              sid={item.cid!}
              size="M"
              isActive={
                !isNewConversation && item.cid === activeConversationSid
              }
              onClick={handleClick}
              onRead={() => handleReadChatItem(item.cid!)}
            />
          ))}
          {showLoadingSection &&
            (isLoadingMore ? (
              <NoumGroupLoading>
                <Spinner />
              </NoumGroupLoading>
            ) : (
              <StyledLoadMore
                onClick={handleLoadMore}
                font="button-m"
                colorToken="--text-button-brand-primary-default"
              >
                {t('noumena.load.more')}
              </StyledLoadMore>
            ))}
        </>
      </Accordion>
    </div>
  );
};
