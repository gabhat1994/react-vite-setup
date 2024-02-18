import { DataGrid, useDataGrid } from '@/components/DataGrid';
import { useTranslation } from 'react-i18next';
import { type NoumMemberBasicFragment } from '@/apollo/graphql';
import { MembersManagerActionPermissions } from '@/features/noums/utils';
import { useNoumAuthorization } from '@/features/noums/contexts/NoumAuthorizationContext';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import { useBreakpoints } from '@/hooks';
import * as S from './styles';
import { type BulkActionType } from './types';

const keyGetter = (item: NoumMemberBasicFragment) => item._id;

interface BulkActionsPopoverProps {
  onBulkAction: (
    value: BulkActionType,
    members: NoumMemberBasicFragment[],
  ) => void;
}

export function BulkActionsPopover({ onBulkAction }: BulkActionsPopoverProps) {
  const { t } = useTranslation();
  const { isOwner } = useNoumContext();
  const { hasNoumPermission } = useNoumAuthorization();
  const { isMobile } = useBreakpoints();
  const { rowSelection, getRowSelectionItems } =
    useDataGrid<NoumMemberBasicFragment>();

  if (rowSelection.selectedItems.length === 0) {
    return null;
  }

  const selectedItems = getRowSelectionItems(keyGetter);
  const canEditRoles = selectedItems.every(
    MembersManagerActionPermissions.canEditRole,
  );
  const canDisconnect =
    selectedItems.every(MembersManagerActionPermissions.canDisconnect) &&
    hasNoumPermission('invite-users', isOwner);

  return (
    <S.BulkActionsCard>
      {!isMobile && (
        <DataGrid.SelectedRowsCounter
          render={(selectedItemsCount) =>
            t('noumena.chamber.member_management.bulk_selection.label', {
              count: selectedItemsCount,
            })
          }
        />
      )}
      <S.BulkActionButtons>
        <DataGrid.BulkActionButton
          disabled={!canEditRoles}
          onClick={() => onBulkAction('edit_role', selectedItems)}
          size={isMobile ? 'full_small' : 'small'}
          tooltipText={
            !canEditRoles ? "You can't edit a role for Non-NM" : undefined
          }
          tooltipPosition="top-center"
          tertiary
        >
          Edit Role
        </DataGrid.BulkActionButton>
        <DataGrid.BulkActionButton
          disabled={!canDisconnect}
          onClick={() => onBulkAction('disconnect', selectedItems)}
          secondary
          intent="negative"
          size="full_small"
        >
          Disconnect
        </DataGrid.BulkActionButton>
      </S.BulkActionButtons>
    </S.BulkActionsCard>
  );
}
