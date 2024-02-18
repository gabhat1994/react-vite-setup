export interface MainEventNotificationProps {
  isOpen: boolean;
  onDecline?: () => void;
  onConfirm?: () => void;
  showButtons?: boolean;
  description: string;
  icon?: JSX.Element;
  showUserJoined?: boolean;
  showUserLeave?: boolean;
}
