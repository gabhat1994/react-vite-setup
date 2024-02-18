import { DataGrid } from '@/components/DataGrid';
import { type NoumMemberWithInvitationFragment } from '@/apollo/graphql';
import { Stack } from '@/layout';
import { UserUtil } from '@/utils/user';
import { Avatar } from '@/components/Avatar/Avatar';
import { TSpan } from '@/components';
import { MemberRoleTag } from '@/features/noums/components/MemberRoleTag';
import { MemberStatusTag } from '@/features/noums/components/MemberStatusTag';
import { getLocalTimeFormatted } from '@/utils/date';
import { mobileColumns } from '../../membersColumns';
import MembersActionMenu from '../../MembersActionMenu';
import { type RowActionType } from '../../types';

type ManageMembersCollapsibleListProps = {
  data: NoumMemberWithInvitationFragment[];
  loading: boolean;
  rowsPerPage: number;
  onRowActionSelect: (
    value: RowActionType,
    item: NoumMemberWithInvitationFragment,
  ) => void;
};

export function ManageMembersCollapsibleList({
  data,
  loading,
  rowsPerPage,
  onRowActionSelect,
}: ManageMembersCollapsibleListProps) {
  return (
    <>
      <DataGrid.CollapsibleHeader
        columns={mobileColumns}
        keyExtractor={(item) => item._id}
      />
      <DataGrid.CollapsibleList
        data={data}
        loading={loading}
        keyExtractor={(item) => item._id}
        rowsPerPage={rowsPerPage}
        enableRowSelection
        renderLeft={(item) => (
          <Stack align="center" gap={8} overflow="hidden">
            <div>
              <Avatar url={UserUtil.getProfilePicture(item.user)} size="M" />
            </div>

            <TSpan font="footnote-bold" overflow="ellipsis">
              {UserUtil.renderFullName(item.user)}
            </TSpan>
          </Stack>
        )}
        renderRight={(item) => (
          <Stack align="center" gap={8}>
            <MemberRoleTag member={item} />{' '}
            <MembersActionMenu
              item={item}
              onRowActionSelect={onRowActionSelect}
            />
          </Stack>
        )}
        renderContent={(item) => (
          <Stack vertical fullWidth gap={8} padding="16px 0px">
            <Stack fullWidth justify="space-between">
              <TSpan font="footnote" colorToken="--text-card-neutral-default">
                Status
              </TSpan>
              <MemberStatusTag member={item} />
            </Stack>
            <Stack fullWidth justify="space-between">
              <TSpan font="footnote" colorToken="--text-card-neutral-default">
                Connected
              </TSpan>
              <TSpan
                font="body-m"
                colorToken="--text-tablecell-header-neutral-default"
              >
                {item?.connectedAt
                  ? getLocalTimeFormatted({
                      dateTime: item?.connectedAt,
                      returnFormat: 'dd/MM/yyyy, hh:mm a',
                    })
                  : '-'}
              </TSpan>
            </Stack>
          </Stack>
        )}
      />
    </>
  );
}
