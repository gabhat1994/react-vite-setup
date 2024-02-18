export interface InActiveProps {
  /* The status of the rejected user */
  userStatus:
    | 'REJECTED'
    | 'PENDING'
    | 'INACTIVE'
    | 'ACTIVE'
    | 'DEACTIVATED'
    | 'UNREGISTERED';
  /* The reason of rejection */
  statusReason?: string;
  /* The description of rejection */
  description?: string;
  /* Handler for logout */
  handleLogout: () => void;
}
