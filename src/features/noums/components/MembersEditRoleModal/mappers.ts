import { type NoumMemberBasicFragment } from '@/apollo/graphql';
import { uniq } from 'lodash';
import { type MemberEditRoleFormValues } from './schema';

export function mapDefaultValuesFromMembers(
  members: NoumMemberBasicFragment[],
): MemberEditRoleFormValues {
  const distinctRoles = uniq(members.map((member) => member.role._id));

  return {
    // Business Rule: Set predefined role only if all members have the same one. Otherwise, start with empty.
    roleId: distinctRoles.length === 1 ? distinctRoles[0] : '',
  };
}
