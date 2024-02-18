import { t } from 'i18next';
import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  EventSubscriptionType,
  EventsFilter,
  EventsStatus,
  InvitationStatus,
  SortOrder,
  UserRole,
} from '@/apollo/generated/types';
import { useAuth } from '@/features/auth/contexts';
import { useToast } from '@/hooks/toast';
import { cleanList } from '@/utils/list';
import {
  EventsDocument,
  type EventsSubscription,
  type GetEventsQuery,
  useGetEventsQuery,
  type EventFragment,
  type GetEventsQueryVariables,
  type EventsSubscriptionVariables,
} from '@/apollo/graphql';
import { useEventHandlers } from './useEventHandlers';

export interface IEventHandlers {
  onGoLive: (eventId: string) => Promise<void>;
  onAccept: (eventId: string, isAcceptAll: boolean) => Promise<void>;
  onDecline: (eventId: string, isAcceptAll: boolean) => Promise<void>;
  onAttend: (eventId: string, isAcceptAll: boolean) => Promise<void>;
  onAttending: (eventId: string, isAcceptAll: boolean) => Promise<void>;
  onNotAttending: (eventId: string, isAcceptAll: boolean) => Promise<void>;
  onCopyLink?: (socialHallId: string) => void;
  onJoinEvent: (eventId: string, socialHallId: string) => void;
}

interface IUseEvents {
  chamberId: string;
  limit?: number;
  preventGetEvents?: boolean;
  shouldGetActiveEvents?: boolean;
  offset?: number;
}

export type IActiveFilter = EventsFilter | 'all';

export const GLOBAL_EVENT_CREATION = 'global-event-creation';

export const useEvents = ({
  chamberId,
  limit = 10,
  offset = 0,
  preventGetEvents = false,
  shouldGetActiveEvents = true,
}: IUseEvents) => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [activeFilter, setActiveFilter] = useState<IActiveFilter>('all');

  const variables: GetEventsQueryVariables = {
    chamberId: chamberId || '',
    filter: shouldGetActiveEvents
      ? activeFilter !== 'all'
        ? { eventFilter: activeFilter }
        : undefined
      : { eventFilter: EventsFilter.Hosting },
    limit,
    offset,
    sortOrder:
      activeFilter === EventsFilter.Expired ? SortOrder.Desc : SortOrder.Asc,
  };

  const {
    data: eventsData,
    loading,
    fetchMore,
    refetch,
    networkStatus,
    subscribeToMore,
  } = useGetEventsQuery({
    variables,
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
    skip: !chamberId || preventGetEvents,
  });

  const events = cleanList(eventsData?.getEvents?.data || []).filter(
    (e) => e.status !== EventsStatus.Cancelled,
  );

  const eventsCount = eventsData?.getEvents?.count ?? 0;
  const eventsMeta = eventsData?.getEvents?.meta;

  const getEventStatus = useCallback(
    (
      eventSubscriptionType: EventSubscriptionType | undefined,
    ): EventsStatus | null => {
      if (!eventSubscriptionType) return null;
      switch (eventSubscriptionType) {
        case EventSubscriptionType.EventExpired:
          return EventsStatus.Expired;
        case EventSubscriptionType.Cancelled:
          return EventsStatus.Cancelled;
        case EventSubscriptionType.GoLive:
          return EventsStatus.GoLive;
        case EventSubscriptionType.Live:
          return EventsStatus.Live;
        case EventSubscriptionType.PostEvent:
          return EventsStatus.PostEvent;
        case EventSubscriptionType.PostEventEnded:
          return EventsStatus.PostEventEnded;
        case EventSubscriptionType.PreEvent:
          return EventsStatus.PreEvent;
        case EventSubscriptionType.PreLive:
          return EventsStatus.PreLive;
        default:
          return null;
      }
    },
    [],
  );

  useEffect(() => {
    const unsubscribe = subscribeToMore<
      EventsSubscription,
      EventsSubscriptionVariables
    >({
      document: EventsDocument,
      variables: { userId: user?._id || '' },
      updateQuery(prev, { subscriptionData }) {
        const { data } = subscriptionData;
        const status = getEventStatus(data?.events?.type);

        if (!data && !status) {
          return prev;
        }

        if (
          data.events?.type &&
          [
            EventSubscriptionType.NewEvent,
            EventSubscriptionType.Cancelled,
            EventSubscriptionType.PostEventEnded,
            EventSubscriptionType.EventExpired,
            EventSubscriptionType.EventUpdated,
          ].includes(data.events.type)
        ) {
          refetch();
          return prev;
        }

        const newEvents =
          prev.getEvents?.data?.map((ev) => {
            if (ev?._id === data?.events?.eventId) {
              return { ...ev, status: status ?? ev?.status };
            }
            return ev;
          }) || [];

        return {
          getEvents: {
            count: prev.getEvents?.count || 0,
            meta: prev.getEvents?.meta || {
              allEventsCount: 0,
              acceptedEventsCount: 0,
              hostedEventsCount: 0,
              pastEventsCount: 0,
              pendingEventsCount: 0,
            },
            data: newEvents,
          },
        } as GetEventsQuery;
      },
    });

    return () => {
      unsubscribe();
    };
  }, [chamberId, getEventStatus, refetch, subscribeToMore, user?._id]);

  const onRefetchEvents = useCallback(async () => {
    if (chamberId) {
      await refetch();
    }
  }, [refetch, chamberId]);

  const onChangeFilter = useCallback((f: string) => {
    if (f) {
      setActiveFilter(f as IActiveFilter);
    }
  }, []);

  const eventHandlers = useEventHandlers({ variables });

  const pastEventType = useMemo(
    () => [
      EventsStatus.Expired,
      EventsStatus.Cancelled,
      EventsStatus.PostEventEnded,
    ],
    [],
  );

  const filteredEvents = useMemo(() => {
    let evs: EventFragment[] = events;
    if (activeFilter === EventsFilter.Attending) {
      evs = events.filter(
        ({ currentUser, status }) =>
          status &&
          !pastEventType.includes(status) &&
          currentUser?.invitation?.status === InvitationStatus.Accepted,
      );
    }

    if (activeFilter === EventsFilter.Expired) {
      evs = events.filter(
        ({ status }) => status && pastEventType.includes(status),
      );
    }

    if (activeFilter === EventsFilter.Hosting) {
      evs = events.filter(
        ({ currentUser, status }) =>
          status &&
          !pastEventType.includes(status) &&
          (currentUser?.userRole === UserRole.Host ||
            currentUser?.userRole === UserRole.Cohost),
      );
    }

    if (activeFilter === EventsFilter.Invitation) {
      evs = events.filter(
        ({ currentUser, status }) =>
          (status &&
            !pastEventType.includes(status) &&
            currentUser?.invitation?.status === InvitationStatus.Pending) ||
          currentUser?.invitation?.status === InvitationStatus.Rejected,
      );
    }

    return evs;
  }, [activeFilter, events, pastEventType]);

  const onHandleInvitation = useCallback(
    async (
      evId: string,
      status: InvitationStatus,
      isAccepted?: boolean,
      isAcceptAll?: boolean,
    ) => {
      const event = events.find((ev) => ev._id === evId);

      await eventHandlers.onHandleInvitation(
        evId,
        status,
        event?.currentUser?.invitation?._id,
        isAccepted,
        isAcceptAll,
      );
    },
    [eventHandlers, events],
  );

  const onCopyLink = useCallback(
    (socialHallId: string) => {
      const socialHallLink = `${window?.location?.origin}/social-hall/${socialHallId}`;
      navigator.clipboard.writeText(`${socialHallLink}` ?? '');
      addToast('primary', 'none', `${t('noumena.event.link.copied')}`);
    },
    [addToast],
  );

  const fetchMoreEvents = useCallback(async () => {
    await fetchMore({
      variables: {
        limit,
        offset: events.length,
      },
    });
  }, [events.length, fetchMore, limit]);

  return {
    onJoinEvent: eventHandlers.onJoinEvent,
    onGoLive: eventHandlers.onGoLive,
    onAttend: eventHandlers.onAttend,
    onAccept: (evId: string, isAcceptAll: boolean) =>
      onHandleInvitation(evId, InvitationStatus.Accepted, true, isAcceptAll),
    onDecline: (evId: string, isAcceptAll: boolean) =>
      onHandleInvitation(evId, InvitationStatus.Rejected, false, isAcceptAll),
    onAttending: (evId: string, isAcceptAll: boolean) =>
      onHandleInvitation(evId, InvitationStatus.Accepted, true, isAcceptAll),
    onNotAttending: (evId: string, isAcceptAll: boolean) =>
      onHandleInvitation(evId, InvitationStatus.Rejected, false, isAcceptAll),
    onCopyLink: (socialHallId: string) => onCopyLink(socialHallId),
    events: filteredEvents,
    eventMeta: eventsMeta,
    eventsCount,
    activeFilter,
    loading,
    loadingEventsMeta: loading,
    networkStatus,
    refetchEvents: onRefetchEvents,
    onChangeFilter,
    fetchMoreEvents,
  };
};

export default useEvents;
