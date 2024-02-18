import { UserUtil } from '@/utils/user';
import { Stack } from '@/layout';
import { getFullName } from '@/utils/fullName';
import { InlineAvatar } from '@/components/Avatar/Inline/Inline';
import { Trans } from 'react-i18next';
import { EventAttendeesNote } from '@/features/events/components';
import { useMemo } from 'react';
import { InvitationStatus, type UserOutput } from '@/apollo/generated/types';
import { type EventInvitationProps } from './types';

export const EventInvitationNote = ({
  event,
}: EventInvitationProps): JSX.Element => {
  const fullName = getFullName(
    event.chamberId?.uid?.firstName,
    event.chamberId?.uid?.middleName,
    event.chamberId?.uid?.lastName,
  );

  const avatarUrls: string[] = useMemo(
    () => [
      UserUtil.getProfilePicture(event.userId as UserOutput) || '',
      ...event.cohosts
        .filter((item) => item.status === InvitationStatus.Accepted)
        .map((item) => UserUtil.getProfilePicture(item.userId) ?? '')
        .filter((_url, index) => index < 3),
    ],
    [event],
  );

  return (
    <Stack align="center" gap={5}>
      <InlineAvatar size="L" urls={avatarUrls} />
      <Trans
        i18nKey="noumena.event_detials.event_attendees.host_invitation_note"
        values={{
          fullName,
        }}
        components={{
          note1: <EventAttendeesNote />,
          note2: <EventAttendeesNote color="gray" />,
        }}
      />
    </Stack>
  );
};
