import { type NoumMemberWithInvitationFragment } from '@/apollo/graphql';
import { TSpan } from '@/components';
import { Avatar } from '@/components/Avatar/Avatar';
import { type TableColumn } from '@/components/DataGrid/Table/Table';
import { MemberRoleTag } from '@/features/noums/components/MemberRoleTag';
import { MemberStatusTag } from '@/features/noums/components/MemberStatusTag';
import { Stack } from '@/layout';
import { getLocalTimeFormatted } from '@/utils/date';
import { UserUtil } from '@/utils/user';

export const desktopColumns: TableColumn<NoumMemberWithInvitationFragment>[] = [
  {
    id: 'name',
    renderValue: (item) => (
      <Stack align="center" gap={8} fullWidth>
        <Avatar url={UserUtil.getProfilePicture(item.user)} size="M" />
        <TSpan font="body-m-bold">{`${item?.user?.firstName} ${item?.user?.lastName}`}</TSpan>
      </Stack>
    ),
    title: 'Name',
    width: '30%',
  },
  {
    id: 'role',
    renderValue: (item) => <MemberRoleTag member={item} />,
    title: 'Role',
    width: 'auto',
  },
  {
    id: 'status',
    renderValue: (item) => <MemberStatusTag member={item} />,
    title: 'Status',
    width: 'auto',
  },
  {
    id: 'connected',
    renderValue: (item) => (
      <TSpan font="body-m" colorToken="--text-tablecell-header-neutral-default">
        {item?.connectedAt
          ? getLocalTimeFormatted({
              dateTime: item?.connectedAt,
              returnFormat: 'dd/MM/yyyy, hh:mm a',
            })
          : '-'}
      </TSpan>
    ),
    title: 'Connected',
    wordWrap: false,
    width: '20%',
  },
];

export const mobileColumns: TableColumn<NoumMemberWithInvitationFragment>[] = [
  {
    id: 'name',
    renderValue: () => <></>,
    title: 'Name',
    width: 'calc(100% - 157px)',
  },

  {
    id: 'role',
    renderValue: () => <></>,
    title: 'Role',
    width: 'auto',
  },
];
