import {
  EventsStatus,
  InvitationStatus,
  type EventMeta,
} from '@/apollo/generated/types';
import {
  EventsParticipatedDocument,
  GetEventsDocument,
  GetInvitedEventsCountDocument,
  useCreateEventInvitationMutation,
  useGetEventByIdLazyQuery,
  useUpdateEventStatusMutation,
  useUpdateInviteStatusMutation,
  type EventFragment,
  type EventMetaFragment,
  type EventsParticipatedQuery,
  type GetEventsQuery,
  type GetEventsQueryVariables,
  type GetInvitedEventsCountQuery,
  type GetInvitedEventsCountQueryVariables,
  type ParticipatedEventFragment,
} from '@/apollo/graphql';
import { type Maybe } from '@/common/types';
import { useAuth } from '@/features/auth/contexts';
import { useToast } from '@/hooks/toast';
import { useAlertNotifications } from '@/providers/AlertNotificationsProvider';
import { cleanList } from '@/utils/list';
import { trackEvent } from '@/utils/tracking';
import { type ApolloCache } from '@apollo/client';
import { t } from 'i18next';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';

interface UseEventHandlersOptions {
  variables?: GetEventsQueryVariables;
  callback?: (evId: string) => void;
}

export function useEventHandlers({
  variables,
  callback,
}: UseEventHandlersOptions = {}) {
  const { addToast } = useToast();
  const { user } = useAuth();
  const { dismissNotificationByEventId } = useAlertNotifications();
  const navigate = useNavigate();

  const [getEventById] = useGetEventByIdLazyQuery();
  const [updateInviteStatus] = useUpdateInviteStatusMutation();
  const [createEventInvitation] = useCreateEventInvitationMutation();
  const [updateEventStatus] = useUpdateEventStatusMutation();

  const userId = user?._id;
  const chamberId = user?.chamber?._id;

  const onShowError = useCallback(() => {
    addToast(
      'error',
      'icon',
      t('noumena.event.attendees.handle_event_error_message'),
    );
  }, [addToast]);

  const getInvitation = useCallback(
    async (eventId: string) => {
      const { data: singleEvent } = await getEventById({
        variables: {
          id: eventId,
        },
      });
      return singleEvent?.getEventById?.currentUser?.invitation;
    },
    [getEventById],
  );

  const getEventsCache = useCallback(
    (cache: ApolloCache<null>) => {
      const cacheQuery = cache.readQuery<GetEventsQuery>({
        query: GetEventsDocument,
        variables,
      });
      return cacheQuery?.getEvents;
    },
    [variables],
  );

  const getEventsParticipatedCache = useCallback(
    (cache: ApolloCache<null>): EventsParticipatedQuery =>
      (cache.readQuery({
        query: EventsParticipatedDocument,
        variables,
      }) as EventsParticipatedQuery) || {},
    [variables],
  );

  const setEventCache = useCallback(
    (
      cache: ApolloCache<null>,
      cacheEvent: GetEventsQuery['getEvents'],
      data: { data: EventFragment[]; meta?: EventMetaFragment },
    ) => {
      cache.writeQuery({
        query: GetEventsDocument,
        variables,
        data: {
          getEvents: {
            ...cacheEvent,
            ...data,
          },
        },
      });
    },
    [variables],
  );

  const updateEventParticipatedCache = useCallback(
    ({
      cache,
      attending,
      hosted,
    }: {
      cache: ApolloCache<null>;
      attending?: (
        evnts?: ParticipatedEventFragment[],
      ) => ParticipatedEventFragment[];
      hosted?: (
        evnts: ParticipatedEventFragment[],
      ) => ParticipatedEventFragment[];
    }) => {
      const cacheEvent = getEventsParticipatedCache(cache);
      if (cacheEvent?.attending?.data || cacheEvent?.hosted?.data) {
        cache.writeQuery({
          query: EventsParticipatedDocument,
          variables,
          data: {
            ...cacheEvent,
            attending: {
              data: attending?.(cleanList(cacheEvent.attending?.data)) || [],
            },
            hosted: {
              data: hosted?.(cleanList(cacheEvent.hosted?.data)) || [],
            },
          },
        });
      }
    },
    [variables, getEventsParticipatedCache],
  );

  const getNewEvents = useCallback(
    (data: EventFragment[], evnt: EventFragment) =>
      data?.map((ev) => (evnt && ev?._id === evnt._id ? evnt : ev!)),
    [],
  );

  const onGoLive = useCallback(
    async (eventId: string) => {
      await updateEventStatus({
        variables: {
          id: eventId,
          status: EventsStatus.PreEvent,
        },
        onCompleted: () => {
          trackEvent('social_hall_buzz_START');
        },
        update: (cache, { data }) => {
          const evnt = getEventsCache(cache);
          if (evnt && data?.updateEventStatus) {
            const newEvents = getNewEvents(
              cleanList(evnt?.data),
              data?.updateEventStatus,
            );
            setEventCache(cache, evnt, { data: newEvents });
          }
        },
      });
      dismissNotificationByEventId(eventId);
    },
    [
      updateEventStatus,
      dismissNotificationByEventId,
      getEventsCache,
      getNewEvents,
      setEventCache,
    ],
  );

  const onHandleInvitation = useCallback(
    async (
      eventId: string,
      status: InvitationStatus,
      invtId?: Maybe<string>,
      isAccepted?: boolean,
      isAcceptAll?: boolean,
    ) => {
      let invitationId: Maybe<string> | undefined = invtId;
      if (!invitationId) {
        const invitation = await getInvitation(eventId);
        invitationId = invitation?._id;
      }

      if (invitationId) {
        await updateInviteStatus({
          variables: {
            id: invitationId,
            status,
            acceptAll: !!isAcceptAll,
          },
          onCompleted: () => {
            callback?.(eventId);
          },
          onError: onShowError,
          update: (cache, { data }) => {
            const eventsCache = getEventsCache(cache);
            if (eventsCache) {
              const acceptedEventsCount =
                eventsCache.meta?.acceptedEventsCount || 0;
              const newEventMeta: EventMeta = {
                ...eventsCache.meta,
                acceptedEventsCount:
                  isAccepted === true
                    ? acceptedEventsCount + 1
                    : isAccepted === false
                    ? acceptedEventsCount - 1
                    : acceptedEventsCount,
              };
              const newEvents = getNewEvents(cleanList(eventsCache.data), {
                ...data?.updateInviteStatus!,
                currentUser: {
                  ...data?.updateInviteStatus?.currentUser!,
                  invitation: {
                    ...data?.updateInviteStatus?.currentUser?.invitation!,
                    status,
                  },
                },
              });
              setEventCache(cache, eventsCache, {
                data: newEvents,
                meta: newEventMeta,
              });
            }

            if (chamberId) {
              cache.updateQuery<
                GetInvitedEventsCountQuery,
                GetInvitedEventsCountQueryVariables
              >(
                {
                  query: GetInvitedEventsCountDocument,
                  variables: { chamberId },
                },
                (prevData) => {
                  if (!prevData) {
                    return null;
                  }
                  return {
                    getEvents: {
                      ...prevData.getEvents,
                      count: prevData.getEvents?.count
                        ? Math.min(prevData.getEvents.count - 1, 0)
                        : 0,
                    },
                  };
                },
              );
            }
          },
        });
      }
    },
    [
      getInvitation,
      updateInviteStatus,
      onShowError,
      callback,
      getEventsCache,
      chamberId,
      getNewEvents,
      setEventCache,
    ],
  );

  const onAttend = useCallback(
    async (eventId: string, acceptAll: boolean) => {
      if (userId) {
        await createEventInvitation({
          variables: {
            id: eventId,
            userId,
            acceptAll,
          },
          onError: (err) => {
            addToast('error', 'icon', err.message);
          },
          update: (cache, { data }) => {
            const evnt = getEventsCache(cache);

            if (evnt && data?.createEventInvitation) {
              const newEvents = getNewEvents(
                cleanList(evnt.data),
                data?.createEventInvitation,
              );
              setEventCache(cache, evnt, {
                data: newEvents,
                meta: {
                  ...evnt.meta,
                  acceptedEventsCount:
                    (evnt.meta?.acceptedEventsCount ?? 0) + 1,
                },
              });
            }
          },
        });
      }
    },
    [
      userId,
      createEventInvitation,
      addToast,
      getEventsCache,
      getNewEvents,
      setEventCache,
    ],
  );

  const onJoinEvent = useCallback(
    (eventId: string, socialHallId: string) => {
      dismissNotificationByEventId(eventId);
      navigate(`/social-hall/${socialHallId}`);
    },
    [dismissNotificationByEventId, navigate],
  );

  return {
    onGoLive,
    onJoinEvent,
    onAccept: (evId: string, invtId?: Maybe<string>, isAcceptAll?: boolean) =>
      onHandleInvitation(
        evId,
        InvitationStatus.Accepted,
        invtId,
        true,
        !!isAcceptAll,
      ),
    onDecline: (evId: string, invtId?: Maybe<string>, isRejectAll?: boolean) =>
      onHandleInvitation(
        evId,
        InvitationStatus.Rejected,
        invtId,
        !!isRejectAll,
      ),
    onAttending: (
      evId: string,
      invtId?: Maybe<string>,
      isAcceptAll?: boolean,
    ) =>
      onHandleInvitation(
        evId,
        InvitationStatus.Accepted,
        invtId,
        true,
        !!isAcceptAll,
      ),
    onNotAttending: (
      evId: string,
      invtId?: Maybe<string>,
      isRejectAll?: boolean,
    ) =>
      onHandleInvitation(
        evId,
        InvitationStatus.Rejected,
        invtId,
        false,
        !!isRejectAll,
      ),
    onHandleInvitation,
    onAttend,
    updateEventParticipatedCache,
  };
}
