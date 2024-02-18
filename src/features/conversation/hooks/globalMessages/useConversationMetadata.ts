import { useMemo } from 'react';

import { keyBy } from 'lodash';

import { t } from 'i18next';
import { useAuth } from '@/features/auth/contexts';
import { UserUtil } from '@/utils/user';
import { type UserBasicOutputFragment } from '@/apollo/graphql/fragments';
import { mapToUserData } from '../../helpers';

interface UseConversationMetadata {
  participants: UserBasicOutputFragment[];
}

export function useConversationMetadata({
  participants,
}: UseConversationMetadata) {
  const { user: currentUser } = useAuth();
  const conversationUsers = useMemo(
    () =>
      participants.filter(
        (participant) => participant._id !== currentUser?._id,
      ),
    [currentUser, participants],
  );

  const { title, users, isConversationBlocked, isGroupConversation } =
    useMemo(() => {
      const isBlocked =
        conversationUsers?.length > 0 &&
        conversationUsers.every(
          (user) => UserUtil.isDeleted(user) || UserUtil.isInactive(user),
        );

      const isGroup = conversationUsers.length > 1;

      return {
        isConversationBlocked: isBlocked,
        isGroupConversation: isGroup,
        title: isBlocked
          ? t('noumena.inactive_user')
          : conversationUsers.map(UserUtil.renderName).join(', '),
        users: conversationUsers.map((user) => mapToUserData(user)),
      };
    }, [conversationUsers]);

  const usersById = useMemo(() => {
    const participantsWithCurrentUser = [
      ...conversationUsers,
      ...(currentUser ? [currentUser] : []),
    ];
    return keyBy(participantsWithCurrentUser, (user) => user._id);
  }, [conversationUsers, currentUser]);

  const getParticipantById = (id: string) => usersById[id];

  return {
    title,
    users,
    isConversationBlocked,
    isGroupConversation,
    getParticipantById,
  };
}
