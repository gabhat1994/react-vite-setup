import { useMemo } from 'react';

import { keyBy } from 'lodash';
import { t } from 'i18next';
import { UserUtil } from '@/utils/user';
import { cleanList } from '@/utils/list';
import NonNMDefaultImage from '@/assets/images/non_noumena_member_profile_default.svg';
import { useAuth } from '@/features/auth/contexts';
import { useConversation } from './useConversation';
import { useConversationParticipants } from './useConversationParticipants';
import { type ConversationUserProps } from '../../types';

interface UseConversationParticipantsOptions {
  sid: string;
}

export function useConversationDetails({
  sid,
}: UseConversationParticipantsOptions) {
  const { user, isUnregistered } = useAuth();
  const { conversation, status: cStatus } = useConversation({ sid });
  const { participants, status: pStatus } = useConversationParticipants({
    sid,
  });
  const loading = cStatus !== 'success' || pStatus !== 'success';
  const conversationUsers = useMemo(
    () =>
      cleanList(
        participants.map((ptp) =>
          conversation?.conversationData?.participants?.find(
            (item) => item?._id === ptp.identity && item?._id !== user?._id,
          ),
        ),
      ) || [],
    [participants, conversation, user],
  );
  const isBlocked = conversationUsers.length === 0;
  const isGroupConversation = conversationUsers.length > 1;
  const title = isBlocked
    ? t('noumena.inactive_user')
    : UserUtil.renderGroupName(conversationUsers);
  const users = conversationUsers.map((item) => {
    const isUserInactive =
      UserUtil.isInactive(item) || UserUtil.isDeleted(item);
    const isUnregisteredUser = UserUtil.isUnregistered(item);

    return {
      _id: item._id,
      firstName: isUserInactive ? t('noumena.inactive_user') : item.firstName,
      lastName: isUserInactive ? '' : item.lastName,
      title: item.title,
      source: isUnregisteredUser
        ? NonNMDefaultImage
        : isUserInactive
        ? null
        : UserUtil.getProfilePicture(item),
      placeholder: isUserInactive,
      homeNoumId: item.chamber?._id,
      isUnregistered: isUnregisteredUser || isUnregistered,
    } as ConversationUserProps;
  });

  const usersById = useMemo(
    () => keyBy(conversationUsers, (item) => item._id),
    [conversationUsers],
  );

  const getUserById = (id: string) => usersById[id];

  return {
    title,
    users,
    participants,
    isGroupConversation,
    isBlocked,
    getUserById,
    loading,
  };
}
