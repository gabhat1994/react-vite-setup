import { useApolloClient } from '@apollo/client';
import {
  type EventFragment,
  GetEventByIdDocument,
  type GetEventByIdQuery,
} from '@/apollo/graphql';
import { useSocialHallEventContext } from '@/providers/SocialHallEventProvider';

export const useGetEventByIdCache = () => {
  const client = useApolloClient();
  const { eventDetails } = useSocialHallEventContext();

  const updateCache = (data: Partial<EventFragment>) => {
    const options = {
      query: GetEventByIdDocument,
      variables: {
        id: eventDetails?._id!,
      },
    };
    const { getEventById } = client.readQuery(options) as GetEventByIdQuery;
    client.writeQuery({
      ...options,
      data: {
        getEventById: {
          ...getEventById,
          ...data,
        },
      },
    });
  };

  return [updateCache];
};
