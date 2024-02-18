import { useCallback, useMemo, useState } from 'react';
import { t } from 'i18next';

import { useGetEventAttendeesQuery } from '@/apollo/graphql';
import {
  InvitationStatus,
  type Attendees,
  UserRole,
  type Maybe,
} from '@/apollo/generated/types';
import { type InputListTypes } from '@/components/Tabs/types';
import { cleanList } from '@/utils/list';
import { getFullName } from '@/utils/fullName';
import { useAttendeeManagement } from '@/features/socialHall/hooks';
import { useUpdateInviteStatus } from './useUpdateInviteStatus';

interface IUseEventAttendees {
  eventId: Maybe<string>;
  isHost: boolean;
  shouldFetch: boolean;
  limit?: number;
}

interface IUseEventAttendeesRes {
  loading: boolean;
  cancellingUser: boolean;
  activeTab: TAttendeesTab;
  tabs: InputListTypes[];
  attendeesToShow: Attendees[];
  pendingAttendees: Attendees[];
  onChangeTab: (tab: string) => void;
  onCancel: (
    attendee: Maybe<Attendees> | undefined,
    callback: () => void,
  ) => void;
  refetchAudience: () => void;
}

type TAttendeesTab = 'attendees' | 'pending' | 'blocked';

export const useEventAttendees = ({
  eventId,
  isHost,
  limit,
  shouldFetch,
}: IUseEventAttendees): IUseEventAttendeesRes => {
  const [activeTab, setActiveTab] = useState<TAttendeesTab>('attendees');
  const [attendees, setAttendees] = useState<Attendees[]>([]);

  const { onBlockUser } = useAttendeeManagement();

  const { updateInviteStatusHelper, loading: cancellingUser } =
    useUpdateInviteStatus();

  const defaultInvitationStatus = [
    InvitationStatus.Accepted,
    InvitationStatus.Pending,
  ];

  const { loading, refetch: refetchAudience } = useGetEventAttendeesQuery({
    fetchPolicy: 'cache-and-network',
    skip: !shouldFetch,
    variables: {
      id: eventId || '',
      filter: {
        invitationStatus: isHost
          ? [...defaultInvitationStatus, InvitationStatus.Blocked]
          : defaultInvitationStatus,
      },
      limit,
    },
    onCompleted: (data) => {
      setAttendees(cleanList<Attendees>(data?.getEventAttendees?.data));
    },
  });

  const [activeAttendees, pendingAttendees, blockedAttendees]: [
    Attendees[],
    Attendees[],
    Attendees[],
  ] = useMemo(() => {
    if (loading) return [[], [], []];

    const sortAttendees = (a: Attendees, b: Attendees): number => {
      if (a.userId?.firstName && b.userId?.lastName) {
        return a.userId.lastName!.localeCompare(b.userId.lastName!);
      }

      return 0;
    };

    const aAttendees: Attendees[] = isHost ? [] : attendees;
    const pAttendees: Attendees[] = [];
    const bAttendees: Attendees[] = [];

    if (isHost) {
      attendees.forEach((attendee) => {
        if (attendee.invitationStatus === InvitationStatus.Accepted) {
          aAttendees.push(attendee);
        } else if (attendee.invitationStatus === InvitationStatus.Pending) {
          pAttendees.push(attendee);
        } else if (attendee.invitationStatus === InvitationStatus.Blocked) {
          bAttendees.push(attendee);
        }
      });
    }

    const hosts: Attendees[] = aAttendees.filter(
      (a) => a.userRole === UserRole.Host || a.userRole === UserRole.Cohost,
    );
    const participants: Attendees[] = aAttendees.filter(
      (a) => a.userRole === UserRole.Participant,
    );

    pAttendees.sort(sortAttendees);

    return [
      [...hosts.sort(sortAttendees), ...participants.sort(sortAttendees)],
      pAttendees,
      bAttendees,
    ];
  }, [attendees, isHost, loading]);

  const attendeesToShow = useMemo(() => {
    if (isHost) {
      return activeTab === 'attendees'
        ? activeAttendees
        : activeTab === 'pending'
        ? pendingAttendees
        : blockedAttendees;
    }

    return activeAttendees;
  }, [isHost, activeAttendees, activeTab, pendingAttendees, blockedAttendees]);

  const tabs: InputListTypes[] = [
    {
      id: 'attendees',
      name: 'attendees',
      image: 'terms_m',
      text: t('noumena.event.attendees.active', {
        count: activeAttendees.length,
      }),
      labelSize: 'auto',
    },
    {
      id: 'pending',
      name: 'pending',
      image: 'terms_m',
      text: t('noumena.event.attendees.pending', {
        count: pendingAttendees.length,
      }),
      labelSize: 'auto',
    },
    {
      id: 'blocked',
      name: 'blocked',
      image: 'terms_m',
      text: t('noumena.event.attendees.blocked', {
        count: blockedAttendees.length,
      }),
      labelSize: 'auto',
    },
  ];

  const onCancel = useCallback(
    async (attendee: Maybe<Attendees> | undefined, callback: () => void) => {
      if (!attendee || !attendee.invitationId) return;

      if (activeTab === 'pending') {
        const newStatus: InvitationStatus = InvitationStatus.Cancelled;
        updateInviteStatusHelper(
          attendee.invitationId,
          newStatus,
          (isSuccess) => {
            if (isSuccess) {
              setAttendees((a) =>
                a.filter((item) => item.invitationId !== attendee.invitationId),
              );
              callback();
            }
          },
        );
      }
      if (['attendees', 'blocked'].includes(activeTab)) {
        const isBlocking = activeTab === 'attendees';
        await onBlockUser(
          attendee.userId?._id!,
          eventId!,
          getFullName(
            attendee.userId?.firstName,
            attendee.userId?.middleName,
            attendee.userId?.lastName,
          ) ?? '',
          isBlocking,
        );
        setAttendees((a) =>
          a.map((item) => {
            if (item.invitationId === attendee.invitationId) {
              return {
                ...item,
                invitationStatus: isBlocking
                  ? InvitationStatus.Blocked
                  : InvitationStatus.Accepted,
              };
            }
            return item;
          }),
        );
        callback();
      }
    },
    [updateInviteStatusHelper, activeTab, onBlockUser, eventId],
  );

  return {
    loading,
    cancellingUser,
    tabs,
    activeTab,
    attendeesToShow,
    pendingAttendees,
    onChangeTab: (tab: string) => setActiveTab(tab as TAttendeesTab),
    onCancel,
    refetchAudience,
  };
};

export default useEventAttendees;
