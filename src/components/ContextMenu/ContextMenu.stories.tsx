/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { type Meta } from '@storybook/react';
import { Icon } from '../Icon';
import { ContextMenu } from './ContextMenu';

export default {
  title: 'Atoms/ContextMenu/ContextMenu',
  component: ContextMenu,
} as Meta<typeof ContextMenu>;

export function Basic() {
  return (
    <ContextMenu<string, HTMLAnchorElement>
      containerWidth="300px"
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
    >
      {({ targetRef, toggle }) => (
        <a
          ref={targetRef}
          onClick={(event) => {
            event.stopPropagation();
            toggle();
          }}
          onKeyDown={(event) => {
            event.stopPropagation();
            toggle();
          }}
        >
          Anything can be the trigger
        </a>
      )}
    </ContextMenu>
  );
}
