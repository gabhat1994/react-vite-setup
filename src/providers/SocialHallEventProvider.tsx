import {
  type FC,
  memo,
  useMemo,
  type ReactNode,
  useContext,
  createContext,
  useCallback,
  useState,
} from 'react';
import { t } from 'i18next';
import { generatePath, useNavigate, useParams } from 'react-router-dom';

import {
  EventsStatus,
  type CurrentUser,
  type SocialHallAttendee,
} from '@/apollo/generated/types';
import {
  useCloseSocialHallGroupMutation,
  useGetEventUserRoleQuery,
  useUpdateEventStatusMutation,
} from '@/apollo/graphql';
import ROUTES from '@/constants/routes';
import { useToast } from '@/hooks/toast';
import { trackEvent } from '@/utils/tracking';
import { useAuth } from '@/features/auth/contexts';
import { useEventStatusChange } from '@/features/events/hooks';
import { type ISocialHallEventContext } from '@/screens/SocialHall/types';
import { SocialHallEventContextInitialValue } from '@/screens/SocialHall/const';
import {
  usePersonalSHId,
  useSocialHallEvent,
} from '@/features/socialHall/hooks';

import { useSocialHallContext } from './SocialHallProvider';

const SocialHallEventContext = createContext<ISocialHallEventContext>(
  SocialHallEventContextInitialValue,
);

const SocialHallEventProviderInner: FC<{ children: ReactNode }> = ({
  children,
}) => {
  // @TODO: need to refactor this with knock functionality implementation
  const [hostJoined] = useState(false);
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const { user } = useAuth();
  const {
    socialHallAttendee,
    setIsBlockNavigate,
    isPersonalSocialHall,
    activeSocialHallGroup,
    socialHallAttendeesAndGroups,
  } = useSocialHallContext();
  const { addToast } = useToast();
  const [isKicked, setIsKicked] = useState(false);
  const personalSocialHallId = usePersonalSHId();
  const { eventDetails, socialHallDetails } = useSocialHallEvent();
  const [updateEventStatusMutation] = useUpdateEventStatusMutation();
  const [closeSocialHallGroup] = useCloseSocialHallGroupMutation();

  const eventUserRole = useGetEventUserRoleQuery({
    skip: !eventDetails?._id,
    variables: {
      eventId: eventDetails?._id!,
    },
  });

  const navigateToHomePage = useCallback(
    () => navigate(generatePath(ROUTES.HOME_NOUM)),
    [navigate],
  );

  const onUpdateEventStatusSuccess = useCallback(
    (status: EventsStatus) => {
      if (
        [EventsStatus.Cancelled, EventsStatus.PostEventEnded].includes(status)
      ) {
        trackEvent('social_hall_buzz_END');
      }
      if ([EventsStatus.Cancelled, EventsStatus.Expired].includes(status)) {
        addToast('primary', 'icon', t('noumena.social_hall.canceled_event'));
        navigateToHomePage();
      }
    },
    [addToast, navigateToHomePage],
  );

  const onUpdateEventStatus = useCallback(
    async (status: EventsStatus) => {
      if (socialHallDetails?.eventId !== undefined) {
        await updateEventStatusMutation({
          variables: {
            id: socialHallDetails?.eventId!,
            status,
          },
        });
        onUpdateEventStatusSuccess(status);
      }
    },
    [
      socialHallDetails?.eventId,
      updateEventStatusMutation,
      onUpdateEventStatusSuccess,
    ],
  );

  const onCloseEvent = useCallback(async () => {
    const status = eventDetails?.recurring
      ? EventsStatus.Expired
      : EventsStatus.Cancelled;
    if (personalSocialHallId) {
      await closeSocialHallGroup({
        variables: { socialHallId: socialHallDetails?._id ?? '' },
      });
      onUpdateEventStatusSuccess(status);
    } else {
      onUpdateEventStatus(status);
    }
  }, [
    eventDetails?.recurring,
    personalSocialHallId,
    closeSocialHallGroup,
    socialHallDetails?._id,
    onUpdateEventStatusSuccess,
    onUpdateEventStatus,
  ]);

  const eventStatus = useEventStatusChange({
    eventDetails,
    socialHallAttendee: socialHallAttendee as SocialHallAttendee,
    socialHallAttendeeGroupRefetch: () =>
      socialHallAttendeesAndGroups?.refetch()!,
  });

  const eventOwner =
    isPersonalSocialHall && socialHallAttendee?.isHost
      ? user
      : eventDetails?.userId;

  const isEventOwner = eventOwner?._id === user?._id;

  const onUserBlockedSuccess = useCallback(async () => {
    setIsKicked(false);
    setIsBlockNavigate(false);
    setTimeout(navigateToHomePage, 500);
  }, [navigateToHomePage, setIsBlockNavigate]);

  const value = useMemo(
    () => ({
      isKicked,
      hostJoined,
      eventOwner,
      setIsKicked,
      isEventOwner,
      onCloseEvent,
      socialHallId: id,
      onUpdateEventStatus,
      onUserBlockedSuccess,
      eventDetails: eventDetails || null,
      groupName: activeSocialHallGroup?.name || eventDetails?.title,
      getEventUserRole: eventUserRole.data?.getEventUserRole as CurrentUser,
      ...eventStatus,
    }),
    [
      id,
      isKicked,
      hostJoined,
      eventOwner,
      setIsKicked,
      eventStatus,
      onCloseEvent,
      eventDetails,
      isEventOwner,
      eventUserRole,
      onUpdateEventStatus,
      onUserBlockedSuccess,
      activeSocialHallGroup?.name,
    ],
  );

  return (
    <SocialHallEventContext.Provider value={value}>
      {children}
    </SocialHallEventContext.Provider>
  );
};

export const useSocialHallEventContext = () =>
  useContext(SocialHallEventContext);

export const SocialHallEventProvider = memo(SocialHallEventProviderInner);
