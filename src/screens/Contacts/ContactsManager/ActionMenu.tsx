import { useCallback } from 'react';
import { type SearchableNoumContactFragment } from '@/apollo/graphql';
import { DataGrid } from '@/components/DataGrid';
import { cleanList } from '@/utils/list';
import { NoumContactStatus } from '@/apollo/generated/types';

type ActionMenuProps = {
  contact: SearchableNoumContactFragment;
  onEdit: (contact: SearchableNoumContactFragment) => void;
  onArchive: (id: string) => void;
  onUnarchive: (id: string) => void;
};

enum RowAction {
  EDIT = 'EDIT',
  ARCHIVE = 'ARCHIVE',
  UNARCHIVE = 'UNARCHIVE',
}

export function ActionMenu({
  contact,
  onEdit,
  onArchive,
  onUnarchive,
}: ActionMenuProps) {
  const handleRowActionClick = useCallback(
    (action: RowAction) => {
      switch (action) {
        case RowAction.EDIT: {
          onEdit(contact);
          break;
        }
        case RowAction.ARCHIVE: {
          onArchive(contact._id);
          break;
        }
        case RowAction.UNARCHIVE: {
          onUnarchive(contact._id);
          break;
        }
        default: {
          // eslint-disable-next-line no-console
          console.log('Unsupported action', action, 'no contact', contact);
        }
      }
    },
    [contact, onArchive, onEdit, onUnarchive],
  );

  return (
    <DataGrid.ActionsMenu<RowAction>
      onClick={(value) => handleRowActionClick(value)}
      menuOptions={cleanList([
        {
          label: 'Edit',
          key: RowAction.EDIT,
          value: RowAction.EDIT,
          iconName: 'edit_m',
        },
        contact.status === NoumContactStatus.Active
          ? {
              label: 'Archive',
              key: RowAction.ARCHIVE,
              value: RowAction.ARCHIVE,
              iconName: 'delete_m',
              intent: 'danger',
            }
          : {
              label: 'Unarchive',
              key: RowAction.UNARCHIVE,
              value: RowAction.UNARCHIVE,
              iconName: 'revert_m',
            },
      ])}
    />
  );
}
