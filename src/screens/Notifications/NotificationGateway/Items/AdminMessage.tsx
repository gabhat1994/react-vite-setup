import NoumenaLogo from '@/assets/images/noumena-filled-logo.svg';
import NotificationItem from '../../NotificationLayout';
import { type AdminMessageProps } from './types';

const AdminMessage = ({
  isViewed,
  body,
  onClick,
  timestamp,
  title,
  buttons,
}: AdminMessageProps) => (
  <NotificationItem
    isViewed={isViewed}
    timestamp={timestamp}
    onClick={onClick}
    title={title}
    body={body}
    avatars={[NoumenaLogo]}
    buttons={buttons}
  />
);

export default AdminMessage;
