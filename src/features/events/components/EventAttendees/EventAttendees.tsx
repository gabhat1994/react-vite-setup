import { type FC } from 'react';
import { Trans } from 'react-i18next';
import { InlineAvatar } from '@/components/Avatar/Inline/Inline';
import { EventAttendeesNote, EventAttendeesWrapper } from './styles';

export const EventAttendees: FC<{
  notClickable?: boolean;
  isHost: boolean;
  avatarUrls: string[];
  isInvited?: boolean;
  fullName?: string;
  totalAttendees?: number;
  onViewAttendees: () => void;
}> = ({
  notClickable,
  isHost,
  avatarUrls,
  isInvited = false,
  fullName,
  totalAttendees = 0,
  onViewAttendees,
}) => {
  if (!avatarUrls?.length) return null;

  return (
    <EventAttendeesWrapper
      notClickable={notClickable}
      data-testid="event-attendees-testid"
      onClick={onViewAttendees}
    >
      <InlineAvatar
        size="L"
        urls={avatarUrls.filter((_url, index) => index < 3)}
        borderedImage={!isHost}
      />
      {isHost ? (
        isInvited ? (
          <Trans
            i18nKey="noumena.event.event_attendees.host_invitation_note"
            values={{
              numAvatarUrls: totalAttendees,
              fullName,
            }}
            components={{
              note1: <EventAttendeesNote />,
              note2: <EventAttendeesNote color="gray" paddingLeft={8} />,
              note3: <EventAttendeesNote color="gray" />,
            }}
          />
        ) : (
          <Trans
            i18nKey="noumena.event.event_attendees.host_note"
            values={{
              numAvatarUrls: totalAttendees,
            }}
            components={{
              note1: <EventAttendeesNote paddingLeft={8} />,
              note2: <EventAttendeesNote color="gray" />,
            }}
          />
        )
      ) : isInvited ? (
        <Trans
          i18nKey="noumena.event.event_attendees.attendee_invitation_note"
          values={{
            numAvatarUrls: totalAttendees,
            fullName,
          }}
          components={{
            note1: <EventAttendeesNote />,
            note2: <EventAttendeesNote paddingLeft={8} color="gray" />,
            note3: <EventAttendeesNote color="gray" />,
          }}
        />
      ) : (
        <Trans
          i18nKey="noumena.event.event_attendees.attendee_note"
          values={{
            numAvatarUrls: totalAttendees,
          }}
          components={{
            note1: <EventAttendeesNote paddingLeft={8} color="gray" />,
            note2: <EventAttendeesNote color="gray" />,
          }}
        />
      )}
    </EventAttendeesWrapper>
  );
};

export default EventAttendees;
