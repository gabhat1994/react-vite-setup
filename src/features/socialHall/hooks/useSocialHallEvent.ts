import {
  type EventFragment,
  GetEventByIdDocument,
  useGetEventByIdQuery,
  type GetEventByIdQuery,
  useGetEventStatusQuery,
  type GetEventByIdQueryVariables,
} from '@/apollo/graphql';
import { useApolloClient } from '@apollo/client';
import { EventsStatus } from '@/apollo/generated/types';
import { useSocialHallDetails } from './useSocialHallDetails';

export const useSocialHallEvent = () => {
  const { cache } = useApolloClient();

  const { data: socialHallDetails, isLoading } = useSocialHallDetails();

  const eventId = socialHallDetails?.eventId ?? '';

  const {
    data: event,
    subscribeToMore,
    refetch,
    loading,
  } = useGetEventByIdQuery({
    skip: !eventId,
    variables: {
      id: eventId,
    },
  });

  const eventDetails = {
    ...event?.getEventById,
    isInstantEvent: true,
  } as EventFragment;

  const { data: getEventStatusData } = useGetEventStatusQuery({
    variables: {
      id: eventId,
    },
    pollInterval: 3000,
    fetchPolicy: 'network-only',
    onCompleted({ getEventById }) {
      cache.updateQuery<GetEventByIdQuery, GetEventByIdQueryVariables>(
        {
          query: GetEventByIdDocument,
          variables: { id: eventId },
        },
        (prevData) => {
          if (!prevData?.getEventById) {
            return null;
          }
          return {
            getEventById: {
              ...prevData.getEventById,
              status: getEventById?.status,
            },
          };
        },
      );
    },
    skip: eventDetails.status !== EventsStatus.GoLive || !eventId,
  });

  const isWaitingForHost =
    getEventStatusData?.getEventById?.status === EventsStatus.GoLive;

  return {
    refetch,
    eventDetails,
    subscribeToMore,
    isWaitingForHost,
    socialHallDetails,
    loading: isLoading || loading,
  };
};

export default useSocialHallEvent;
