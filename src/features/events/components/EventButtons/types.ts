export type EventAttendingOption = 'attending' | 'not_attending';

export interface EventButtonProps {
  iconOnly?: boolean;
  width?: string;
  minWidth?: string;
  flex?: number | string;
  disabled?: boolean;
  onClick: () => void;
  isColumnBreakPoint?: boolean;
}

export type AttendButtonProps = Omit<EventButtonProps, 'iconOnly'> & {
  isLoading?: boolean;
};

export type EditEventButtonProps = EventButtonProps;

export type GoLiveButtonProps = Omit<EventButtonProps, 'iconOnly'> & {
  isLoading?: boolean;
};

export type JoinButtonProps = Omit<EventButtonProps, 'iconOnly'>;

export type InvitationButtonProps = Omit<
  EventButtonProps,
  'iconOnly' | 'onClick'
> & {
  isLoadingAccept?: boolean;
  isLoadingDecline?: boolean;
  onDecline: () => void;
  onAccept: () => void;
};

export type AttendingButtonProps = Omit<
  EventButtonProps,
  'iconOnly' | 'onClick'
> & {
  isAttending?: boolean;
  loading?: boolean;
  onAttending: () => void;
  onNotAttending: () => void;
};
