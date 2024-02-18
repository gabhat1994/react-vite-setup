import { type FC } from 'react';
import { Stack } from '@/layout';
import { type NoumMemberWithInvitationFragment } from '@/apollo/graphql/fragments';
import { DataGrid } from '@/components/DataGrid';
import useActionMenuOptions from './hooks/useActionMenuOptions';
import { type RowActionType } from './types';

type MemberActionMenu = {
  item: NoumMemberWithInvitationFragment;
  onRowActionSelect: (
    value: RowActionType,
    item: NoumMemberWithInvitationFragment,
  ) => void;
};

const MembersActionMenu: FC<MemberActionMenu> = ({
  item,
  onRowActionSelect,
}) => {
  const { menuOptions } = useActionMenuOptions({ item });
  if (menuOptions.length === 0) return null;
  return (
    <Stack justify="flex-end">
      <DataGrid.ActionsMenu<RowActionType>
        size="small"
        onClick={(value) => onRowActionSelect(value, item)}
        menuOptions={menuOptions}
      />
    </Stack>
  );
};

export default MembersActionMenu;
