import { noop } from 'lodash';
import React, { useCallback, useContext, useMemo } from 'react';
import { generatePath, useNavigate } from 'react-router';
import { useApolloClient } from '@apollo/client';
import {
  type Event,
  type EventNotificationDetails,
  type Maybe,
} from '@/apollo/generated/types';
import routes from '@/constants/routes';
import {
  GetSpaceByIdDocument,
  type NotificationFragment,
} from '@/apollo/graphql';
import { ContractToolRoutes } from '@/features/contracts/utils/routes';
import { useEventHandlers } from '@/features/events/hooks';
import {
  useConnectionNotificationHandlers,
  useEventNotificationHandlers,
} from './hooks';
import { useMemberInvitationNotificationHandlers } from './hooks/memberInvitations';

const asyncNoop = () => Promise.resolve();

export interface NotificationHandlers {
  masterId: Maybe<string> | undefined;
  userStatus: Maybe<string> | undefined;
  markAsRead(notification: NotificationFragment): void;
  navigateToNoum(
    notification: NotificationFragment,
    noumId?: Maybe<string>,
  ): void;
  navigateToPost(
    notification: NotificationFragment,
    postId?: string | null,
  ): void;
  navigateToMyNoum(notification: NotificationFragment): void;
  navigateToInvoice(
    notification: NotificationFragment,
    invoiceId?: string,
  ): void;
  navigateToContract(
    notification: NotificationFragment,
    invoiceId?: string,
  ): void;
  navigateToStatementOfWork(
    notification: NotificationFragment,
    invoiceId?: string,
  ): void;
  navigateToMoneyPage(notification: NotificationFragment): void;
  navigateToMoneyDetailsPage(notification: NotificationFragment): void;
  navigateToSocialHall: (
    notification: NotificationFragment,
    socialHallId: string,
  ) => void;
  refreshCurrentUser(notification: NotificationFragment): void;
  navigateToPlanDetails(notification: NotificationFragment, id: string): void;
  navigateToApplicationReview(notification: NotificationFragment): void;
  events: {
    showEventDetails(
      notification: NotificationFragment,
      eventDetails: Maybe<EventNotificationDetails> | undefined,
    ): void;
    joinEvent(
      notification: NotificationFragment,
      eventDetails: Maybe<EventNotificationDetails> | undefined,
    ): void;
    goLiveEvent(
      notification: NotificationFragment,
      eventDetails: Maybe<EventNotificationDetails> | undefined,
    ): void;
    acceptEventInvitation(
      notification: NotificationFragment,
      eventDetails: Maybe<EventNotificationDetails> | undefined,
      isAcceptAll: boolean,
    ): void;
    rejectEventInvitation(
      notification: NotificationFragment,
      eventDetails: Maybe<EventNotificationDetails> | undefined,
      isRejectAll: boolean,
    ): void;
  };
  connections: {
    acceptConnection(
      notification: NotificationFragment,
      invitationId: Maybe<string> | undefined,
    ): void;
    rejectConnection(
      notification: NotificationFragment,
      invitationId: Maybe<string> | undefined,
    ): void;
    refetchConnectionData(connectionId: Maybe<string> | undefined): void;
  };
  memberInvitations: {
    acceptInvitation(
      notification: NotificationFragment,
      noumId: Maybe<string> | undefined,
    ): Promise<void>;
    rejectInvitation(
      notification: NotificationFragment,
      noumId: Maybe<string> | undefined,
    ): Promise<void>;
    acceptRolePromotion(
      notification: NotificationFragment,
      noumId: Maybe<string> | undefined,
    ): Promise<void>;
    rejectRolePromotion(
      notification: NotificationFragment,
      noumId: Maybe<string> | undefined,
    ): Promise<void>;
  };
}

export const NotificationHandlersContext =
  React.createContext<NotificationHandlers>({
    masterId: null,
    userStatus: null,
    navigateToSocialHall: noop,
    events: {
      acceptEventInvitation: noop,
      rejectEventInvitation: noop,
      goLiveEvent: noop,
      joinEvent: noop,
      showEventDetails: noop,
    },
    connections: {
      acceptConnection: noop,
      rejectConnection: noop,
      refetchConnectionData: noop,
    },
    memberInvitations: {
      acceptInvitation: asyncNoop,
      rejectInvitation: asyncNoop,
      acceptRolePromotion: asyncNoop,
      rejectRolePromotion: asyncNoop,
    },
    navigateToNoum: noop,
    navigateToMyNoum: noop,
    navigateToMoneyPage: noop,
    navigateToMoneyDetailsPage: noop,
    markAsRead: noop,
    refreshCurrentUser: noop,
    navigateToPost: noop,
    navigateToInvoice: noop,
    navigateToContract: noop,
    navigateToStatementOfWork: noop,
    navigateToPlanDetails: noop,
    navigateToApplicationReview: noop,
  });

interface NotificationHandlersProviderProps {
  children: React.ReactNode;
  masterId: Maybe<string> | undefined;
  userStatus: Maybe<string> | undefined;
  onClose?: () => void;
  onNotificationRead: (notification: NotificationFragment) => Promise<void>;
  onEventDetails: (event: Maybe<Event> | undefined) => void;
}

export function NotificationHandlersProvider({
  children,
  masterId,
  userStatus,
  onClose,
  onNotificationRead,
  onEventDetails,
}: NotificationHandlersProviderProps) {
  const navigate = useNavigate();
  const apolloClient = useApolloClient();
  const { onJoinEvent } = useEventHandlers({});

  const navigateToPost = useCallback(
    async (notification: NotificationFragment, postId?: string) => {
      onNotificationRead(notification);
      if (postId) {
        const noumId = notification.data?.chamber?._id ?? '';
        onClose?.();
        navigate(`/post/${postId}?noumId=${noumId}`);
      }
    },
    [onNotificationRead, onClose, navigate],
  );

  const navigateToNoum = useCallback(
    async (notification: NotificationFragment, noumId?: string) => {
      onNotificationRead(notification);
      if (noumId) {
        // Refetch the target Noum while redirecting to ensure fresh data.
        apolloClient.refetchQueries({ include: [GetSpaceByIdDocument] });
        onClose?.();
        let uri = `/noum/${noumId}`;
        if (notification?.data?.topUpdatedElement)
          uri += `?elementId=${notification.data.topUpdatedElement}`;
        navigate(uri);
      }
    },
    [onNotificationRead, apolloClient, onClose, navigate],
  );

  const navigateToMyNoum = useCallback(
    async (notification: NotificationFragment) => {
      if (masterId) {
        navigateToNoum(notification, masterId);
      }
    },
    [navigateToNoum, masterId],
  );

  const navigateToMoneyPage = useCallback(
    async (notification: NotificationFragment) => {
      onNotificationRead(notification);
      onClose?.();
      navigate(routes.MONEY);
    },
    [onNotificationRead, onClose, navigate],
  );

  const navigateToMoneyDetailsPage = useCallback(
    async (notification: NotificationFragment) => {
      onNotificationRead(notification);
      onClose?.();
      navigate(routes.MONEY_DETAILS);
    },
    [onNotificationRead, onClose, navigate],
  );
  const navigateToSocialHall = useCallback(
    async (notification: NotificationFragment, socialHallId: string) => {
      onNotificationRead(notification);
      onClose?.();
      onJoinEvent(notification.event?.id?._id ?? '', socialHallId);
    },
    [onClose, onJoinEvent, onNotificationRead],
  );

  const refreshCurrentUser = useCallback(
    async (notification: NotificationFragment) => {
      await apolloClient.refetchQueries({
        include: ['currentUser', 'getSpaceById'],
      });
      onNotificationRead(notification);
    },
    [apolloClient, onNotificationRead],
  );

  const navigateToInvoice = useCallback(
    async (notification: NotificationFragment, id?: string) => {
      apolloClient.refetchQueries({
        include: ['getInvoiceById'],
      });
      if (id) {
        onClose?.();
        navigate(generatePath(routes.INVOICE_DETAILS, { id }));
      }

      onNotificationRead(notification);
    },
    [apolloClient, navigate, onClose, onNotificationRead],
  );

  const navigateToContract = useCallback(
    async (notification: NotificationFragment, id?: string) => {
      if (id) {
        apolloClient.refetchQueries({
          include: ['getSingleContract'],
        });
        onClose?.();
        navigate(ContractToolRoutes.viewContract({ id }));
      }

      onNotificationRead(notification);
    },
    [apolloClient, navigate, onClose, onNotificationRead],
  );

  const navigateToStatementOfWork = useCallback(
    async (notification: NotificationFragment, id?: string) => {
      if (id) {
        apolloClient.refetchQueries({
          include: ['getSingleSOW'],
        });
        onClose?.();
        navigate(ContractToolRoutes.viewStatementOfWork({ id }));
      }

      onNotificationRead(notification);
    },
    [apolloClient, navigate, onClose, onNotificationRead],
  );

  const navigateToPlanDetails = useCallback(
    async (notification: NotificationFragment, id: string) => {
      onNotificationRead(notification);
      if (id) navigate(generatePath(routes.PLAN_DETAILS, { id }));
    },
    [navigate, onNotificationRead],
  );
  const navigateToApplicationReview = useCallback(
    async (notification: NotificationFragment) => {
      onNotificationRead(notification);
      navigate(routes.APPLICATION_REVIEW);
    },
    [navigate, onNotificationRead],
  );

  const {
    showEventDetails,
    joinEvent,
    goLiveEvent,
    acceptEventInvitation,
    rejectEventInvitation,
  } = useEventNotificationHandlers({ onNotificationRead, onEventDetails });

  const { acceptConnection, rejectConnection, refetchConnectionData } =
    useConnectionNotificationHandlers({ onNotificationRead });

  const {
    acceptInvitation,
    rejectInvitation,
    acceptRolePromotion,
    rejectRolePromotion,
  } = useMemberInvitationNotificationHandlers({ onNotificationRead });

  const value = useMemo(
    () => ({
      masterId,
      userStatus,
      markAsRead: onNotificationRead,
      navigateToNoum,
      navigateToPost,
      navigateToMyNoum,
      navigateToSocialHall,
      navigateToMoneyPage,
      navigateToMoneyDetailsPage,
      refreshCurrentUser,
      navigateToInvoice,
      navigateToContract,
      navigateToStatementOfWork,
      navigateToPlanDetails,
      navigateToApplicationReview,
      events: {
        showEventDetails,
        joinEvent,
        goLiveEvent,
        acceptEventInvitation,
        rejectEventInvitation,
      },
      connections: {
        acceptConnection,
        rejectConnection,
        refetchConnectionData,
      },
      memberInvitations: {
        acceptInvitation,
        rejectInvitation,
        acceptRolePromotion,
        rejectRolePromotion,
      },
    }),
    [
      masterId,
      userStatus,
      onNotificationRead,
      navigateToNoum,
      navigateToPost,
      navigateToMyNoum,
      navigateToSocialHall,
      navigateToMoneyPage,
      navigateToMoneyDetailsPage,
      refreshCurrentUser,
      navigateToInvoice,
      navigateToContract,
      navigateToStatementOfWork,
      navigateToPlanDetails,
      navigateToApplicationReview,
      showEventDetails,
      joinEvent,
      goLiveEvent,
      acceptEventInvitation,
      rejectEventInvitation,
      acceptConnection,
      rejectConnection,
      refetchConnectionData,
      acceptInvitation,
      rejectInvitation,
      acceptRolePromotion,
      rejectRolePromotion,
    ],
  );

  return (
    <NotificationHandlersContext.Provider value={value}>
      {children}
    </NotificationHandlersContext.Provider>
  );
}

export function useNotificationHandlers() {
  return useContext(NotificationHandlersContext);
}
