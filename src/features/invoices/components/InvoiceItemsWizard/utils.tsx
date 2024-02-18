import { type DropdownValueType } from '@/components/Dropdown';
import { Icon } from '@/components/Icon';

export const tableItemContextMenuOptions: DropdownValueType<string>[] = [
  {
    key: 'edit',
    value: 'edit',
    label: 'Edit Item',
    type: 'value',
    icon: <Icon name="edit_m" size={16} />,
  },
  {
    key: 'delete',
    value: 'delete',
    label: 'Delete Item',
    type: 'value',
    icon: (
      <Icon
        name="delete_m"
        color="--icon-tablecell-danger-primary-default"
        size={16}
      />
    ),
    intent: 'danger',
  },
];
