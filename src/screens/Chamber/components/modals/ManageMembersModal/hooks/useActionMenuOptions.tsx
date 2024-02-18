import { type NoumMemberWithInvitationFragment } from '@/apollo/graphql';
import { type ActionsMenuItem } from '@/components/DataGrid';
import { MembersManagerActionPermissions } from '@/features/noums/utils';
import { useLaunchDarkly } from '@/hooks';
import { compact } from 'lodash';
import { useAuth } from '@/features/auth/contexts';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import { useNoumAuthorization } from '@/features/noums/contexts/NoumAuthorizationContext';
import { type RowActionType } from '../types';

type ActionMenuOptionsProps = {
  item: NoumMemberWithInvitationFragment;
};

const useActionMenuOptions = ({ item }: ActionMenuOptionsProps) => {
  const {
    flags: { noumCoManager },
  } = useLaunchDarkly();
  const { user: currentUser } = useAuth();
  const { isOwner } = useNoumContext();
  const { hasNoumPermission } = useNoumAuthorization();
  const hasInviteMembersPermission = hasNoumPermission('invite-users', isOwner);

  const menuOptions: ActionsMenuItem<RowActionType>[] = compact([
    MembersManagerActionPermissions.canViewManagerDetails(item) &&
      noumCoManager && {
        key: 'manager_details',
        value: 'manager_details',
        label: 'Manager Details',
        iconName: 'info_m',
      },
    MembersManagerActionPermissions.canEditRole(item) &&
      item.user?._id !== currentUser?._id && {
        key: 'edit_role',
        value: 'edit_role',
        label: 'Edit Role',
        iconName: 'edit_m',
      },
    MembersManagerActionPermissions.canViewHomeNoum(item) && {
      key: 'view_home_noum',
      value: 'view_home_noum',
      label: 'View Home Noum',
      iconName: 'profile_m',
    },
    MembersManagerActionPermissions.canCancelRolePromotion(item) && {
      key: 'cancel_manager_invite',
      value: 'cancel_manager_invite',
      label: `Cancel Manager's Invite`,
      iconName: 'undo_m',
    },
    MembersManagerActionPermissions.canDisconnect(item) &&
      hasInviteMembersPermission &&
      item.user?._id !== currentUser?._id && {
        key: 'disconnect',
        value: 'disconnect',
        label: 'Disconnect',
        iconName: 'close_m',
        intent: 'danger',
      },
    MembersManagerActionPermissions.canApproveRequest(item) && {
      key: 'approve_request',
      value: 'approve_request',
      label: 'Accept',
      iconName: 'tick_m',
      intent: 'brand-primary',
    },
    MembersManagerActionPermissions.canRejectRequest(item) && {
      key: 'reject_request',
      value: 'reject_request',
      label: 'Decline',
      iconName: 'close_m',
      intent: 'danger',
    },
  ]);

  return {
    menuOptions,
  };
};

export default useActionMenuOptions;
