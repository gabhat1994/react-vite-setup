import { type InviteNoumMembers } from '@/apollo/generated/types';
import { type InviteMembersValues } from './schema';

function toInviteMembersInput(
  noumId: string,
  values: InviteMembersValues,
): InviteNoumMembers {
  return {
    noumId,
    members: values.userIds.map((userId) => ({
      roleId: values.roleId,
      userId,
    })),
    invitationMessage: values.message,
  };
}

export const InviteMembersFormMapper = {
  toInviteMembersInput,
};
