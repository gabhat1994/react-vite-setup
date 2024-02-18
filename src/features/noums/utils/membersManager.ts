import { NoumMemberStatus } from '@/apollo/generated/types';
import { type NoumMemberBasicFragment } from '@/apollo/graphql';
import { type Maybe } from '@/common/types';
import { UserUtil } from '@/utils/user';

function getBulkMembersActionMeta(members: NoumMemberBasicFragment[]) {
  const isBulkSelection = members.length > 1;

  const managers = members.filter(MemberUtils.isManager);
  const managersCount = managers.length;
  const membersCount = members.length - managersCount;
  const hasManagersOnly = managersCount > 0 && managersCount === members.length;
  const hasMixedRoles = managersCount > 0 && managersCount < members.length;

  return {
    hasManagersOnly,
    hasMixedRoles,
    isBulkSelection,
    managersCount,
    membersCount,
  };
}

function getBulkMembersActionTranslationSuffix(
  members: NoumMemberBasicFragment[],
) {
  const { isBulkSelection, hasMixedRoles, hasManagersOnly } =
    getBulkMembersActionMeta(members);

  const countSuffix = isBulkSelection ? 'bulk' : 'single';
  const typeSuffix = hasManagersOnly
    ? 'manager'
    : hasMixedRoles
    ? 'mixed'
    : 'member';

  return `${countSuffix}.${typeSuffix}` as const;
}

export function getBulkMembersActionTranslationMeta(
  members: NoumMemberBasicFragment[],
) {
  const { managersCount, membersCount } = getBulkMembersActionMeta(members);
  const translationSuffix = getBulkMembersActionTranslationSuffix(members);

  return {
    translationSuffix,
    userName: members.length > 0 ? UserUtil.renderName(members[0].user) : '',
    managersCount,
    membersCount,
  };
}

export const MembersManagerActionPermissions = {
  canViewManagerDetails: (member: NoumMemberBasicFragment) =>
    member.role.isManager,
  canViewHomeNoum: (member: NoumMemberBasicFragment) =>
    member.user?.chamber?._id && UserUtil.isActive(member.user),
  canEditRole: (member: NoumMemberBasicFragment) =>
    (MemberUtils.isConnected(member) ||
      MemberUtils.hasPendingInvitation(member)) &&
    !UserUtil.isUnregistered(member.user),
  canDisconnect: (member: NoumMemberBasicFragment) =>
    MemberUtils.isConnected(member) || UserUtil.isUnregistered(member.user),
  canApproveRequest: (member: NoumMemberBasicFragment) =>
    MemberUtils.hasPendingConnectionRequest(member),
  canRejectRequest: (member: NoumMemberBasicFragment) =>
    MemberUtils.hasPendingConnectionRequest(member),
  canCancelRolePromotion: (member: NoumMemberBasicFragment) =>
    MemberUtils.hasPendingManagerPromotion(member),
};

export const MemberUtils = {
  isConnected: (member: Pick<NoumMemberBasicFragment, 'status'>) =>
    member.status === NoumMemberStatus.Connected,
  hasPendingInvitation: (member: Pick<NoumMemberBasicFragment, 'status'>) =>
    member.status === NoumMemberStatus.Invited,
  hasPendingConnectionRequest: (
    member: Pick<NoumMemberBasicFragment, 'status'>,
  ) => member.status === NoumMemberStatus.Requested,
  isManager: (member: Maybe<NoumMemberBasicFragment>) =>
    !!member?.role.isManager,
  hasPendingManagerPromotion: (
    member: Maybe<Pick<NoumMemberBasicFragment, 'rolePromotionToApprove'>>,
  ) => member?.rolePromotionToApprove?.isManager,
};
