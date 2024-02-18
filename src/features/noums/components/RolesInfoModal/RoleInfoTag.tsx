import { NoumRolePermissionLevel } from '@/apollo/generated/types';
import { type NoumRolePermissionGroupForInfoFragment } from '@/apollo/graphql';
import { Tag } from '@/components';
import { useTranslation } from 'react-i18next';

interface RoleInfoTagProps {
  permissionGroup: NoumRolePermissionGroupForInfoFragment;
}

export function RoleInfoTag({ permissionGroup }: RoleInfoTagProps) {
  const { t } = useTranslation();

  const activePermissionIds = permissionGroup.permissions
    .filter((permission) => permission.isActive)
    .map((permission) => permission.id);

  // TODO: Decide what to do with Noum-level permissions
  if (
    permissionGroup.level !== NoumRolePermissionLevel.Element ||
    activePermissionIds.length === 0
  ) {
    return null;
  }

  const title = t(
    `noumena.noums.permissions_info.group.${permissionGroup.elementType}`,
  );
  const permissionsList = activePermissionIds
    .map((permissionId) =>
      t(`noumena.noums.permissions_info.permission.${permissionId}`),
    )
    .join(', ');

  return (
    <Tag size="small" tertiary contentFont="footnote" contentMaxWidth="none">
      <b>{title}</b>: {permissionsList}
    </Tag>
  );
}
