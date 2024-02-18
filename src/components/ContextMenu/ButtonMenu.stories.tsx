import { type Meta } from '@storybook/react';
import { Icon } from '../Icon';
import { ButtonMenu } from './ButtonMenu';

export default {
  title: 'Atoms/ContextMenu/ButtonMenu',
  component: ButtonMenu,
} as Meta<typeof ButtonMenu>;

export function EllipsisMenu() {
  return (
    <ButtonMenu<string>
      containerWidth="300px"
      tertiary
      menuOptions={[
        {
          key: 'view',
          label: 'View',
          type: 'value',
          value: 'view',
          icon: <Icon name="eye_on_m" size={24} />,
        },
        {
          key: 'edit',
          label: 'Edit',
          type: 'value',
          value: 'edit',
          icon: <Icon name="edit_m" size={24} />,
        },
        {
          key: 'delete',
          label: 'Delete',
          type: 'value',
          value: 'delete',
          intent: 'danger',
          icon: (
            <Icon
              name="delete_m"
              size={24}
              color="--icon-tablecell-danger-primary-default"
            />
          ),
        },
      ]}
      icon={<Icon name="more_m" size={24} />}
    />
  );
}
