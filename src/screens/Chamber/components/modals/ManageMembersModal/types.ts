type TNoumEditModal =
  | 'customize'
  | 'manage_members'
  | 'archive'
  | 'invites'
  | 'permission'
  | 'custom_preview'
  | 'broadcasting'
  | 'noum_ads'
  | 'save_as_a_template'
  | 'restore_last_published_version'
  | 'noumena_copilot';

type NavItemType = {
  label: string;
  show: boolean;
  value: TNoumEditModal;
  type: 'primary' | 'error' | 'success' | 'warning' | 'gray' | undefined;
  disableBeforeFirstPublish: boolean;
};
export interface ChamberMobileActionsProps {
  onToggleFilter: () => void;
  inviteMembers: () => void;
}
export type ManageMembersModalProps = {
  navItems?: NavItemType[];
  isOpen: boolean;
  handleClose: () => void;
  handleOptionSelection?: (value: TNoumEditModal) => void;
  isNoumPublishedAtAll?: boolean;
};

export type RowActionType =
  | 'manager_details'
  | 'edit_role'
  | 'view_home_noum'
  | 'disconnect'
  | 'approve_request'
  | 'reject_request'
  | 'cancel_manager_invite';

export type BulkActionType = 'edit_role' | 'disconnect';
