import { first } from 'lodash';
import { type InputListTypes } from '@/components/Tabs/types';
import { t } from 'i18next';
import {
  UserRole,
  type Attendees,
  InvitationStatus,
} from '@/apollo/generated/types';
import { type GenerateHostedByLabel, type HostingKey } from './types';

export const getCancelModalData = (name: string) => ({
  title: t('noumena.social_hall.remove_user_modal.title', {
    name,
  }),
  description: t('noumena.social_hall.remove_user_modal.description'),
  confirmButton: t('noumena.social_hall.remove_user_modal.confirm'),
  cancelButton: t('noumena.cancel'),
});

export const getAttendeeTabData = (count: number): InputListTypes => ({
  name: 'attending',
  labelSize: 'medium',
  text: t('noumena.event.button.attending_count', {
    count,
  }),
});

export const getPendingTabData = (count: number): InputListTypes => ({
  name: 'pending',
  labelSize: 'medium',
  text: t('noumena.event.attendees.pending', {
    count,
  }),
});

export const getEvenDetailsTab = (count: number): InputListTypes[] => [
  {
    id: 'Details',
    name: 'Details',
    text: t('noumena.editor.details'),
    labelSize: 'large',
  },
  {
    id: 'Attendees',
    name: 'Attendees',
    text: t('noumena.event.attendees.active', {
      count,
    }),
    labelSize: 'large',
  },
];

const getHostName = (attendees: Attendees[]) =>
  attendees.find((attendee) => attendee.userRole === UserRole.Host)?.userId
    ?.firstName ?? '';

export const generateHostedByLabel = ({
  attendees,
  isHost,
  noumName,
  isCoHost,
  isProjectNoum,
  currentUserName,
}: GenerateHostedByLabel): {
  i18nString: string;
  options: Record<string, string>;
} => {
  const cohosts = attendees.filter(
    ({ userRole, invitationStatus }) =>
      userRole === UserRole.Cohost &&
      invitationStatus === InvitationStatus.Accepted,
  );

  const cohostsCount = cohosts.length;
  const cohostName = isCoHost
    ? getHostName(attendees)
    : first(cohosts)?.userId?.firstName ?? '';

  const hostName =
    isCoHost || isHost ? currentUserName : getHostName(attendees);

  const hostingType: Record<HostingKey, string> =
    isHost || isCoHost
      ? {
          '0': 'noumena.event.self.hosting',
          '1': 'noumena.event.self_and_cohost.hosting',
          default: 'noumena.event.self_and_multiple_users.hosting',
        }
      : {
          '0': 'noumena.event.host.hosting',
          '1': 'noumena.event.host_and_cohost.hosting',
          default: 'noumena.event.multiple_hosts.hosting',
        };

  const i18nString =
    hostingType[cohostsCount.toString() as HostingKey] ??
    hostingType['default' as HostingKey];

  return {
    i18nString,
    options: {
      hostName,
      cohostName,
      noumName: isProjectNoum ? noumName : '',
      additionalText: isProjectNoum ? t('noumena.event.via') : '',
      count: cohostsCount > 1 ? cohostsCount.toString() : '',
    },
  };
};

export const getAttendingAttendees = (attendees: Attendees[]) =>
  attendees.filter(
    ({ userRole, invitationStatus }) =>
      userRole !== UserRole.Host &&
      invitationStatus === InvitationStatus.Accepted,
  );
