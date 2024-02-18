import {
  type FC,
  type ReactNode,
  useState,
  useMemo,
  useContext,
  useCallback,
  useEffect,
} from 'react';
import * as Sentry from '@sentry/react';
import {
  type GetOrCreateSpaceConversationMutation,
  useGetOrCreateSpaceConversationMutation,
  type GetOrCreateGlobalConversationMutation,
  useGetOrCreateGlobalConversationMutation,
  useGetConversationLazyQuery,
} from '@/apollo/graphql';
import { cleanList } from '@/utils/list';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import { CREAT_CONVERSATION_WITH_HOME_OWNER } from '@/constants/conversation';
import { useAuth } from '@/features/auth/contexts';
import { type UserBasicOutputFragment } from '@/apollo/graphql/fragments';
import { SpaceUtils } from '@/utils/space';
import { ActiveConversationContext } from './ActiveConversationContext';
import { ConversationViewContext } from './ConversationViewContext';
import { NewConversationContext } from './NewConversationContext';
import { TwilioClientContext } from './TwilioClientContext';

const isGetOrCreateSpaceConversationType = (
  input:
    | GetOrCreateSpaceConversationMutation['getOrCreateSpaceConversation']
    | undefined,
): input is NonNullable<
  GetOrCreateSpaceConversationMutation['getOrCreateSpaceConversation']
> => !!(input && input.__typename === 'ConversationOutput');

const isGetOrCreateGlobalConversationType = (
  input:
    | GetOrCreateGlobalConversationMutation['getOrCreateGlobalConversation']
    | undefined,
): input is NonNullable<
  GetOrCreateGlobalConversationMutation['getOrCreateGlobalConversation']
> => !!(input && input.__typename === 'ConversationOutput');

export const NewConversationProvider: FC<{
  children: ReactNode;
  onCreated?: (sid: string) => void;
}> = ({ children, onCreated }) => {
  const { user } = useAuth();
  const { space } = useNoumContext();
  const { client } = useContext(TwilioClientContext);
  const { isNewConversation, setIsNewConversation } = useContext(
    ConversationViewContext,
  );
  const { activeConversationSid, setActiveConversationSid } = useContext(
    ActiveConversationContext,
  );
  const [getOrCreateSpaceConversationMutation] =
    useGetOrCreateSpaceConversationMutation();
  const [getOrCreateGlobalConversationMutation] =
    useGetOrCreateGlobalConversationMutation();
  const [getConversation] = useGetConversationLazyQuery();

  const [selectedUsers, setSelectedUsers] = useState<UserBasicOutputFragment[]>(
    [],
  );
  useEffect(() => {
    if (!isNewConversation) setSelectedUsers([]);
  }, [isNewConversation]);
  const [loading, setLoading] = useState(false);
  const [ecLoading, setECLoading] = useState(false);

  const selectedUserIds: string[] = useMemo(
    () => selectedUsers.map((u) => u._id),
    [selectedUsers],
  );

  const isConversationCreatable = useMemo(
    () =>
      (isNewConversation ||
        activeConversationSid === CREAT_CONVERSATION_WITH_HOME_OWNER) &&
      selectedUserIds.length > 0,
    [activeConversationSid, isNewConversation, selectedUserIds.length],
  );

  const createNewConversation = useCallback(async () => {
    if (!client || !isConversationCreatable) {
      return undefined;
    }

    try {
      setLoading(true);
      const { data } = await getOrCreateSpaceConversationMutation({
        variables: {
          userIds: selectedUserIds,
          spaceId: space?._id || '',
        },
      });

      if (!data) {
        const error = new Error('[handleCreateConversation] No data returned');
        Sentry.captureException(error, {
          tags: {
            section: 'CreateNewConversation',
          },
        });
        throw error;
      }

      const { getOrCreateSpaceConversation: conversationData } = data;

      if (isGetOrCreateSpaceConversationType(conversationData)) {
        const sid = conversationData.cid;
        if (sid) {
          const conversation = await client!.getConversationBySid(sid);
          setActiveConversationSid(sid);
          setIsNewConversation(false);
          onCreated?.(sid);
          return conversation;
        }
      }

      return undefined;
    } finally {
      setLoading(false);
    }
  }, [
    client,
    getOrCreateSpaceConversationMutation,
    isConversationCreatable,
    onCreated,
    selectedUserIds,
    setActiveConversationSid,
    setIsNewConversation,
    space,
  ]);

  const createHomeNoumNewConversation = useCallback(async () => {
    if (!client || !isConversationCreatable) {
      return undefined;
    }

    try {
      setLoading(true);
      const { data } = await getOrCreateGlobalConversationMutation({
        variables: {
          userIds: selectedUserIds,
        },
      });

      if (!data) {
        const error = new Error('[handleCreateConversation] No data returned');
        Sentry.captureException(error, {
          tags: {
            section: 'CreateNewConversation',
          },
        });
        throw error;
      }

      const { getOrCreateGlobalConversation: conversationData } = data;

      if (isGetOrCreateGlobalConversationType(conversationData)) {
        const sid = conversationData.cid;
        if (sid) {
          const conversation = await client!.getConversationBySid(sid);

          setActiveConversationSid(sid);
          setIsNewConversation(false);
          onCreated?.(sid);
          return conversation;
        }
      }

      return undefined;
    } finally {
      setLoading(false);
    }
  }, [
    client,
    getOrCreateGlobalConversationMutation,
    isConversationCreatable,
    onCreated,
    selectedUserIds,
    setActiveConversationSid,
    setIsNewConversation,
  ]);

  const value = useMemo(
    () => ({
      isConversationCreatable,
      loading,
      ecLoading,
      selectedUsers,
      setSelectedUsers,
      createNewConversation,
      createHomeNoumNewConversation,
    }),
    [
      isConversationCreatable,
      loading,
      ecLoading,
      selectedUsers,
      setSelectedUsers,
      createNewConversation,
      createHomeNoumNewConversation,
    ],
  );

  useEffect(() => {
    (async () => {
      if (!isNewConversation) return;

      setECLoading(true);
      if (selectedUserIds.length > 0) {
        const { data } = await getConversation({
          variables: {
            spaceId: SpaceUtils.isMasterNoum(space) ? undefined : space?._id,
            userIds: cleanList([...selectedUserIds, user?._id]),
          },
        });
        const cid = data?.getConversation?.cid;
        setActiveConversationSid(cid ?? '');
      } else {
        setActiveConversationSid('');
      }
      setECLoading(false);
    })();
  }, [
    getConversation,
    isNewConversation,
    selectedUserIds,
    setActiveConversationSid,
    space,
    user?._id,
  ]);

  return (
    <NewConversationContext.Provider value={value}>
      {children}
    </NewConversationContext.Provider>
  );
};
