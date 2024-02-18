import { UserRole } from '@/apollo/generated/types';
import { useEventMeta } from '@/features/events/hooks';
import { useCallback, useState, type FC } from 'react';
import { EventLabel } from '../EventLabel/EventLabel';
import { EventItemButtonsWrapper } from './styles';
import { type EventItemButtonsProps } from './types';
import {
  AddToCalendarButton,
  AttendButton,
  AttendingButton,
  CopyEventLinkButton,
  EditEventButton,
  EllipsisButton,
  GoLiveButton,
  InvitationButton,
  JoinEventButton,
} from '../EventButtons';

export const EventItemButtons: FC<EventItemButtonsProps> = ({
  type,
  event,
  role,
  noumId,
  onAccept,
  onAttend,
  onAttending,
  onDecline,
  onEditEvent,
  onGoLive,
  onJoinEvent,
  onNotAttending,
  onCopyLink,
  isEventDetail,
  isNoumLayoutSmallViewMode,
}: EventItemButtonsProps) => {
  const { eventCardButtonType } = useEventMeta({ chamberId: noumId, event });

  const [isLoadingAttending, setIsLoadingAttending] = useState(false);
  const [isLoadingNotAttending, setIsLoadingNotAttending] = useState(false);
  const [isLoadingAccept, setIsLoadingAccept] = useState(false);
  const [isLoadingDecline, setIsLoadingDecline] = useState(false);
  const [isLoadingAttend, setIsLoadingAttend] = useState(false);
  const [isLoadingGoLive, setIsLoadingGoLive] = useState(false);
  const isCalendarType = type === 'calendar';

  const handleAttending = useCallback(async () => {
    setIsLoadingAttending(true);
    await onAttending();
    setIsLoadingAttending(false);
  }, [onAttending]);

  const handleNotAttending = useCallback(async () => {
    setIsLoadingNotAttending(true);
    await onNotAttending();
    setIsLoadingNotAttending(false);
  }, [onNotAttending]);

  const handleAccept = useCallback(async () => {
    setIsLoadingAccept(true);
    await onAccept();
    setIsLoadingAccept(false);
  }, [onAccept]);

  const handleDecline = useCallback(async () => {
    setIsLoadingDecline(true);
    await onDecline();
    setIsLoadingDecline(false);
  }, [onDecline]);

  const handleAttend = useCallback(async () => {
    setIsLoadingAttend(true);
    await onAttend();
    setIsLoadingAttend(false);
  }, [onAttend]);

  const handleGoLive = useCallback(async () => {
    setIsLoadingGoLive(true);
    await onGoLive();
    setIsLoadingGoLive(false);
  }, [onGoLive]);

  let element: JSX.Element | null = null;

  if (!event) {
    return null;
  }
  const HelperButtons = (
    <>
      <AddToCalendarButton event={event} type={type} />
      <CopyEventLinkButton onClick={() => onCopyLink?.()} />
    </>
  );

  const HelperDropDown = (
    <EllipsisButton
      event={event}
      onCopyLink={onCopyLink}
      onEditEvent={onEditEvent}
      eventCardButtonType={eventCardButtonType}
      type={type}
    />
  );

  switch (eventCardButtonType) {
    case 'FINISHED':
      element = isCalendarType ? null : (
        <EventLabel variant="finished" flex={1} />
      );
      break;
    case 'GO_LIVE':
      element = (
        <>
          {isCalendarType ? (
            <>{HelperDropDown}</>
          ) : isEventDetail ? (
            <EditEventButton iconOnly flex={0} onClick={onEditEvent} />
          ) : (
            <>
              {role === UserRole.Host && <>{HelperButtons}</>}
              <EditEventButton iconOnly flex={0} onClick={onEditEvent} />
            </>
          )}
          <GoLiveButton
            flex={1}
            isLoading={isLoadingGoLive}
            onClick={handleGoLive}
          />
        </>
      );
      break;
    case 'ATTENDING':
      element = (
        <>
          {isCalendarType ? (
            <>{HelperDropDown}</>
          ) : (
            !isEventDetail && <AddToCalendarButton event={event} type={type} />
          )}
          <AttendingButton
            isAttending
            flex={1}
            loading={isLoadingAttending || isLoadingNotAttending}
            onAttending={handleAttending}
            onNotAttending={handleNotAttending}
          />
        </>
      );
      break;

    case 'NOT_ATTENDING':
      element = (
        <AttendingButton
          isAttending={false}
          flex={1}
          width={isLoadingAttending || isLoadingNotAttending ? '162px' : '100%'}
          loading={isLoadingAttending || isLoadingNotAttending}
          onAttending={handleAttending}
          onNotAttending={handleNotAttending}
        />
      );
      break;
    case 'ATTEND_EVENT':
      element = (
        <>
          {isCalendarType ? (
            <>{HelperDropDown}</>
          ) : (
            !isEventDetail && <AddToCalendarButton event={event} type={type} />
          )}
          <AttendButton
            width="100%"
            isLoading={isLoadingAttend}
            onClick={handleAttend}
          />
        </>
      );
      break;
    case 'ALREADY_JOINED':
    case 'JOIN_EVENT':
      element = (
        <>
          {isCalendarType ? (
            <>{HelperDropDown}</>
          ) : (
            !isEventDetail && <>{HelperButtons}</>
          )}
          <JoinEventButton flex={1} onClick={onJoinEvent} />
        </>
      );
      break;
    case 'INVITED':
      element = (
        <>
          {isCalendarType ? (
            <>{HelperDropDown}</>
          ) : (
            !isEventDetail && <AddToCalendarButton event={event} type={type} />
          )}
          <InvitationButton
            flex={1}
            isLoadingAccept={isLoadingAccept}
            isLoadingDecline={isLoadingDecline}
            onAccept={handleAccept}
            onDecline={handleDecline}
          />
        </>
      );
      break;
    case 'EDIT_EVENT':
      element = (
        <>
          {isCalendarType ? (
            <>{HelperDropDown}</>
          ) : isEventDetail ? (
            <>
              <EditEventButton flex={0} iconOnly onClick={onEditEvent} />
              <GoLiveButton
                disabled
                flex={1}
                minWidth="154px"
                isLoading={isLoadingGoLive}
                onClick={handleGoLive}
              />
            </>
          ) : (
            <>
              {[UserRole.Host, UserRole.Cohost].includes(role!) && (
                <>{HelperButtons}</>
              )}
              <EditEventButton flex={1} onClick={onEditEvent} />
            </>
          )}
        </>
      );
      break;
    default:
  }

  if (!element) return null;

  return (
    <EventItemButtonsWrapper
      type={type}
      isEventDetail={isEventDetail}
      isNoumLayoutSmallViewMode={isNoumLayoutSmallViewMode}
    >
      {element}
    </EventItemButtonsWrapper>
  );
};
