import { type InvoiceOutputFragment } from '@/apollo/graphql';
import { DataGrid } from '@/components/DataGrid';
import { TSpan } from '@/components/Typography';
import { formatDateString } from '@/utils/getTimeStampForDisplaying';
import { ApiPayloadParser } from '@/utils/api/payloadParser';
import { Stack } from '@/layout';
import { InvoiceManagerUtils } from '@/features/invoices/utils/manager';
import InvoiceStatusBadge from '@/features/invoices/components/InvoiceStatusBadge/InvoiceStatusBadge';
import { useAuth } from '@/features/auth/contexts';
import S from './styles';
import { ActionMenu } from './ActionMenu';

interface InvoicesCollapsibleListProps {
  invoices: InvoiceOutputFragment[];
  loading?: boolean;
  onOpenChangeStatusModal: (invoice: InvoiceOutputFragment) => void;
  onOpenDeleteModal: (invoice: InvoiceOutputFragment) => void;
  onOpenSendReminderModal: (invoice: InvoiceOutputFragment) => void;
  onOpenDuplicateInvoiceModal: (invoice: InvoiceOutputFragment) => void;
}

export function InvoicesCollapsibleList({
  invoices,
  loading,
  onOpenChangeStatusModal,
  onOpenSendReminderModal,
  onOpenDeleteModal,
  onOpenDuplicateInvoiceModal,
}: InvoicesCollapsibleListProps) {
  const { user: currentUser } = useAuth();

  return (
    <>
      <DataGrid.CollapsibleList<InvoiceOutputFragment>
        data={invoices}
        loading={loading}
        renderLeft={(item) => (
          <Stack align="center" gap={16}>
            <TSpan
              font="body-m-bold"
              colorToken="--text-card-neutral-highlighted"
            >
              {item.invoiceNumber}
            </TSpan>
            <InvoiceStatusBadge status={item.status} />
          </Stack>
        )}
        renderRight={(item) => (
          <ActionMenu
            invoice={item}
            onOpenChangeStatusModal={onOpenChangeStatusModal}
            onOpenDeleteModal={onOpenDeleteModal}
            onOpenSendReminderModal={onOpenSendReminderModal}
            onOpenDuplicateInvoiceModal={onOpenDuplicateInvoiceModal}
          />
        )}
        keyExtractor={(item) => item.id ?? ''}
        enableRowSelection
        renderContent={(item) => (
          <Stack gap={8} vertical fullWidth padding="16px 0">
            <S.ItemRow>
              <S.KeyText>Amount</S.KeyText>
              <S.ValueText>
                {InvoiceManagerUtils.formatAmount(
                  item.amount || 0,
                  item.currency ?? undefined,
                )}
              </S.ValueText>
            </S.ItemRow>
            <S.ItemRow>
              <S.KeyText>Type</S.KeyText>
              <S.ValueText>
                {item.invoiceTo?._id === currentUser?._id
                  ? 'Received'
                  : 'Issued'}
              </S.ValueText>
            </S.ItemRow>
            <S.ItemRow>
              <S.KeyText>Customer</S.KeyText>
              <S.ValueText>{item.invoiceTo?.displayName}</S.ValueText>
            </S.ItemRow>
            <S.ItemRow>
              <S.KeyText>Noum</S.KeyText>
              <S.ValueText>{item.noumId?.name}</S.ValueText>
            </S.ItemRow>
            <S.ItemRow>
              <S.KeyText>Due</S.KeyText>
              <S.ValueText>
                {item.dueDate
                  ? formatDateString(
                      ApiPayloadParser.parseDateString(item.dueDate),
                    )
                  : '--'}
              </S.ValueText>
            </S.ItemRow>
            <S.ItemRow>
              <S.KeyText>Created</S.KeyText>
              <S.ValueText>
                {item.issueDate
                  ? formatDateString(
                      ApiPayloadParser.parseDateString(item.issueDate),
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
