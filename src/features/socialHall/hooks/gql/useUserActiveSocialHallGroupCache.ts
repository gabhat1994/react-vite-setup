import { useApolloClient } from '@apollo/client';
import {
  UserActiveSocialHallGroupDocument,
  type UserActiveSocialHallGroupQuery,
} from '@/apollo/graphql';
import { type SocialGroup } from '@/apollo/generated/types';
import { useSocialHallContext } from '@/providers/SocialHallProvider';
import { useSocialHallEventContext } from '@/providers/SocialHallEventProvider';

export const useUserActiveSocialHallGroupCache = () => {
  const client = useApolloClient();
  const { socialHallId } = useSocialHallContext();
  const { eventDetails } = useSocialHallEventContext();

  const updateCache = (data: SocialGroup | null) => {
    const options = {
      query: UserActiveSocialHallGroupDocument,
      variables: {
        id: socialHallId,
        skipUserRole: !eventDetails?._id,
        eventId: eventDetails?._id ?? '',
      },
    };
    client.readQuery(options) as UserActiveSocialHallGroupQuery;
    client.writeQuery({
      ...options,
      data: {
        userActiveSocialHallGroup: data,
      },
    });
  };

  return [updateCache];
};
