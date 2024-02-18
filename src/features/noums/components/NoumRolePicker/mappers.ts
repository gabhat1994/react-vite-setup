import { type NoumRoleForDropdownFragment } from '@/apollo/graphql';
import { type DropdownValueType } from '@/components/Dropdown';

export function mapRoleOptionsFromList(
  noumRoles: NoumRoleForDropdownFragment[],
): DropdownValueType<string>[] {
  return noumRoles.map((role) => ({
    type: 'value',
    key: role._id,
    value: role._id,
    label: role.name,
  }));
}
