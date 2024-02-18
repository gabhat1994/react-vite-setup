import { type Maybe } from '@/apollo/generated/types';
import { type NoumRoleForAuthorizationFragment } from '@/apollo/graphql';
import {
  defaultNoumRoleNames,
  type DefaultNoumRoleName,
  type NoumRole,
} from './types';

function parseDefaultRoleName(value: string): DefaultNoumRoleName | null {
  return defaultNoumRoleNames.includes(value as DefaultNoumRoleName)
    ? (value as DefaultNoumRoleName)
    : null;
}

export function mapNoumRole(
  value: Maybe<NoumRoleForAuthorizationFragment> | undefined,
): NoumRole | null {
  if (!value?.name) {
    return null;
  }

  const defaultRoleName = parseDefaultRoleName(value.name);
  if (defaultRoleName) {
    return {
      name: defaultRoleName,
      isDefault: true,
    };
  }

  return {
    name: value.name,
    isDefault: false,
  };
}
