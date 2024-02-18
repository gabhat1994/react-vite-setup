import { type SearchableNoumContactFragment } from '@/apollo/graphql';
import { DataGrid } from '@/components/DataGrid';
import { TSpan } from '@/components/Typography';
import { formatDateString } from '@/utils/getTimeStampForDisplaying';
import { ApiPayloadParser } from '@/utils/api/payloadParser';
import { Stack } from '@/layout';
import { Avatar } from '@/components/Avatar/Avatar';
import { ContactDetailsUtils } from '@/features/noumContacts/utils/contactDetails';
import { UserUtil } from '@/utils/user';
import S from './styles';
import { ActionMenu } from './ActionMenu';

interface InvoicesCollapsibleListProps {
  contacts: SearchableNoumContactFragment[];
  loading?: boolean;
  onEdit: (contact: SearchableNoumContactFragment) => void;
  onArchive: (id: string) => void;
  onUnarchive: (id: string) => void;
}

export function ContactsCollapsibleList({
  contacts,
  loading,
  onEdit,
  onArchive,
  onUnarchive,
}: InvoicesCollapsibleListProps) {
  return (
    <>
      <DataGrid.CollapsibleList<SearchableNoumContactFragment>
        data={contacts}
        loading={loading}
        renderLeft={(item) => (
          <Stack align="center" gap={8}>
            <Avatar size="M" url={UserUtil.getProfilePicture(item.user)} />
            <TSpan
              font="body-m-bold"
              colorToken="--text-card-neutral-highlighted"
            >
              {item.displayName}
            </TSpan>
          </Stack>
        )}
        renderRight={(item) => (
          <ActionMenu
            contact={item}
            onEdit={onEdit}
            onArchive={onArchive}
            onUnarchive={onUnarchive}
          />
        )}
        keyExtractor={(item) => item._id ?? ''}
        enableRowSelection
        renderContent={(item) => (
          <Stack gap={8} vertical fullWidth padding="0 0 8px 0">
            <S.ItemRow>
              <S.KeyText>Email Address</S.KeyText>
              <S.ValueText>{item.email}</S.ValueText>
            </S.ItemRow>
            <S.ItemRow>
              <S.KeyText>Title</S.KeyText>
              <S.ValueText>{item.title}</S.ValueText>
            </S.ItemRow>
            <S.ItemRow>
              <S.KeyText>Company</S.KeyText>
              <S.ValueText>{item.companyName}</S.ValueText>
            </S.ItemRow>
            <S.ItemRow>
              <S.KeyText>Contact / Billing Details</S.KeyText>
              <S.ValueText>
                {ContactDetailsUtils.formatAddress(item)}
              </S.ValueText>
            </S.ItemRow>
            <S.ItemRow>
              <S.KeyText>Added</S.KeyText>
              <S.ValueText>
                {item.createdAt
                  ? formatDateString(
                      ApiPayloadParser.parseDateString(item.createdAt),
                    )
                  : '--'}
              </S.ValueText>
            </S.ItemRow>
          </Stack>
        )}
      />
    </>
  );
}
