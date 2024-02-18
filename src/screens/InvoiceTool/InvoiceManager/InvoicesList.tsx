import {
  InvoiceSortColumn,
  type InvoiceStatusEnumInput,
} from '@/apollo/generated/types';
import {
  useDeleteInvoiceMutation,
  useGetInvoiceListQuery,
  useSendInvoiceReminderMutation,
  type InvoiceOutputFragment,
} from '@/apollo/graphql';
import { Button } from '@/components/Button';
import { DataGrid, useDataGrid } from '@/components/DataGrid';
import { type PaginationProps } from '@/components/DataGrid/Pagination';
import { type TableColumn } from '@/components/DataGrid/Table/Table';
import routes from '@/constants/routes';
import ChangeInvoiceStatusModal from '@/features/invoices/components/ChangeInvoiceStatusModal/ChangeInvoiceStatusModal';
import DeleteDraftModal from '@/features/invoices/components/DeleteDraftModal/DeleteDraftModal';
import DuplicateInvoiceModal from '@/features/invoices/components/DuplicateInvoiceModal/DuplicateInvoiceModal';
import InvoiceStatusBadge from '@/features/invoices/components/InvoiceStatusBadge/InvoiceStatusBadge';
import MakeInvoicePaymentWizard from '@/features/invoices/components/MakeInvoicePaymentWizard/MakeInvoicePaymentWizard';
import SendInvoiceReminderModal from '@/features/invoices/components/SendInvoiceReminderModal/SendInvoiceReminderModal';
import useInvoiceHandlers from '@/features/invoices/hooks/useInvoiceHandlers';
import useInvoicePermissions from '@/features/invoices/hooks/useInvoicePermissions';
import useInvoiceStatusChange from '@/features/invoices/hooks/useInvoiceStatusChange';
import { InvoiceManagerUtils } from '@/features/invoices/utils/manager';
import { useError, useToast } from '@/hooks';
import { useModalManager } from '@/hooks/modal/useModalManager';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { Stack } from '@/layout';
import { ApiPayloadParser } from '@/utils/api/payloadParser';
import { formatDateString } from '@/utils/getTimeStampForDisplaying';
import { cleanList } from '@/utils/list';
import { useCallback, useMemo } from 'react';
import { generatePath, useNavigate } from 'react-router';
import { InvoiceUtils } from '@/features/invoices/utils/invoice';
import { ActionMenu } from './ActionMenu';
import { InvoicesCollapsibleList } from './InvoicesCollapsibleList';
import S from './styles';
import { type Filters } from './types';
import { InvoiceFiltersUtils } from './utils';

type ModalType =
  | 'delete'
  | 'change-status'
  | 'make-payment'
  | 'send-reminder'
  | 'duplicate-invoice';

interface InvoicesListProps {
  offset: number;
  filters: Filters;
  onPaginationChange: PaginationProps['onChange'];
}

export function InvoicesList({
  offset,
  filters,
  onPaginationChange,
}: InvoicesListProps) {
  const navigate = useNavigate();
  const { addToast, addErrorToast } = useToast();
  const { logError } = useError();
  const { isMobile } = useBreakpoints();
  const { sorting } = useDataGrid<InvoiceOutputFragment, InvoiceSortColumn>();

  const { data, loading, refetch } = useGetInvoiceListQuery({
    variables: {
      filter: InvoiceFiltersUtils.mapToInvoiceQueryInput(
        filters,
        offset,
        sorting,
      ),
    },
    fetchPolicy: 'cache-and-network',
  });

  const { canPay } = useInvoicePermissions();

  const [sendInvoiceReminder] = useSendInvoiceReminderMutation();
  const { changeStatus } = useInvoiceStatusChange();
  const invoices = cleanList(data?.getInvoiceList?.data);
  const totalCount = data?.getInvoiceList?.count ?? 0;

  const [deleteInvoiceMutation] = useDeleteInvoiceMutation();

  const { modalType, contextData, openModal, closeModal } = useModalManager<
    ModalType,
    InvoiceOutputFragment
  >();

  const { duplicateInvoice } = useInvoiceHandlers({
    invoiceId: contextData?.id,
  });

  const handleMakePayment = useCallback(
    async (invoice: InvoiceOutputFragment) => {
      openModal('make-payment', invoice);
    },
    [openModal],
  );

  const handleDuplicate = useCallback(async () => {
    if (!contextData?.id) {
      return;
    }
    try {
      closeModal();

      const duplicated = await duplicateInvoice();
      if (duplicated?.id) {
        window.open(
          InvoiceUtils.createInvoicePath.duplicateInvoice(duplicated.id),
          '_blank',
        );
      }
    } catch {
      addErrorToast('Failed to duplicate invoice');
    }
  }, [addErrorToast, closeModal, contextData?.id, duplicateInvoice]);

  const deleteInvoice = async () => {
    if (contextData) {
      if (!contextData.id) {
        return;
      }
      try {
        await deleteInvoiceMutation({
          variables: {
            id: contextData.id,
          },
        });
        refetch();
        addToast('primary', 'none', 'Invoice deleted successfully.');
      } catch (err) {
        logError(err, 'invoice-manager-delete-invoice', true);
      }
    }
    closeModal();
  };

  const handleStatusChange = useCallback(
    async (newStatus: InvoiceStatusEnumInput, amount?: number) => {
      const id = contextData?.id;
      if (!id) return;

      closeModal();
      await changeStatus({ invoice: contextData, status: newStatus, amount });
      refetch();
    },
    [changeStatus, closeModal, contextData, refetch],
  );

  const handleSendReminder = useCallback(
    (message: string) => {
      if (contextData?.id) {
        sendInvoiceReminder({
          variables: { id: contextData.id, customMessage: message },
        });
        closeModal();
      }
    },
    [closeModal, contextData?.id, sendInvoiceReminder],
  );

  const columns = useMemo<
    TableColumn<InvoiceOutputFragment, InvoiceSortColumn>[]
  >(
    () => [
      {
        id: 'amount',
        title: 'Amount',
        width: '10%',
        renderValue: (item) => (
          <>
            <S.CellText font="footnote-bold" status={item.status}>
              {InvoiceManagerUtils.formatAmount(
                item.amount || 0,
                item.currency ?? undefined,
              )}
            </S.CellText>
          </>
        ),
      },
      {
        id: 'status',
        title: 'Status',
        renderValue: (item) => <InvoiceStatusBadge status={item.status} />,
        width: '10%',
      },
      {
        id: 'invoiceNumber',
        title: 'Invoice Number',
        renderValue: (item) => item.invoiceNumber,
        width: '10%',
      },
      {
        id: 'type',
        title: 'Type',
        renderValue: (item) => item.type,
        width: '10%',
      },
      {
        id: 'customer',
        title: 'Customer',
        renderValue: (item) =>
          item.type === 'Received' ? 'You' : item.invoiceTo?.displayName,
        width: '20%',
      },
      {
        id: 'noum',
        title: 'Noum',
        renderValue: (item) => item.noumId?.name,
        width: '20%',
      },
      {
        id: 'dueDate',
        title: 'Due',
        renderValue: (item) =>
          item.dueDate
            ? formatDateString(ApiPayloadParser.parseDateString(item.dueDate))
            : '--',
        width: '10%',
      },
      {
        id: 'createdDate',
        sortName: InvoiceSortColumn.IssueDate,
        title: 'Created',
        renderValue: (item) =>
          item.issueDate
            ? formatDateString(ApiPayloadParser.parseDateString(item.issueDate))
            : '--',
        width: '10%',
      },
      {
        id: 'actions',
        title: '',
        renderValue: (item) =>
          canPay(item) ? (
            <Button
              secondary
              size="small"
              onClick={(event) => {
                event.stopPropagation();
                handleMakePayment(item);
              }}
            >
              Pay
            </Button>
          ) : (
            <Stack justify="end">
              <ActionMenu
                invoice={item}
                onOpenChangeStatusModal={() => openModal('change-status', item)}
                onOpenDeleteModal={() => openModal('delete', item)}
                onOpenSendReminderModal={() => openModal('send-reminder', item)}
                onOpenDuplicateInvoiceModal={() =>
                  openModal('duplicate-invoice', item)
                }
              />
            </Stack>
          ),
      },
    ],
    [canPay, handleMakePayment, openModal],
  );

  return (
    <>
      <Stack gap={24} vertical fullWidth align="stretch" padding="0 0 64px 0">
        {isMobile ? (
          <InvoicesCollapsibleList
            invoices={invoices}
            loading={loading}
            onOpenChangeStatusModal={(item) => openModal('change-status', item)}
            onOpenDeleteModal={(item) => openModal('delete', item)}
            onOpenSendReminderModal={(item) => openModal('send-reminder', item)}
            onOpenDuplicateInvoiceModal={(item) =>
              openModal('duplicate-invoice', item)
            }
          />
        ) : (
          <DataGrid.Table<InvoiceOutputFragment, InvoiceSortColumn>
            keyExtractor={(item) => item.id ?? ''}
            data={invoices}
            columns={columns}
            rowsPerPage={5}
            loading={loading}
            onRowClick={(item) =>
              navigate(generatePath(routes.INVOICE_DETAILS, { id: item.id }))
            }
            wordWrap
          />
        )}

        <DataGrid.Footer
          leftElement={
            <DataGrid.Pagination
              totalCount={totalCount}
              itemsPerPage={InvoiceFiltersUtils.ITEMS_PER_PAGE}
              currentOffset={offset}
              onChange={onPaginationChange}
            />
          }
          rightElement={null}
          // @TODO: Uncomment when bulk actions are implemented on the backend
          //
          // rightElement={
          //   <DataGrid.BulkAction
          //     label={t('noumena.contracts.cta.download')}
          //     rightIcon={<Icon name="download_m" size={24} />}
          //     onClick={(selectedItems) =>
          //       addPrimaryIconToast(
          //         `QA Note: Not implemented. Would download ${selectedItems.length} items.`,
          //       )
          //     }
          //   />
          // }
        />
      </Stack>

      {contextData?.id && (
        <ChangeInvoiceStatusModal
          isOpenModal={modalType === 'change-status'}
          onCancel={closeModal}
          onConfirm={handleStatusChange}
          currentStatus={contextData?.status ?? undefined}
          key={modalType}
          currency={contextData?.currency ?? undefined}
          invoiceId={contextData?.id ?? ''}
        />
      )}

      {contextData?.id && (
        <SendInvoiceReminderModal
          isOpenModal={modalType === 'send-reminder'}
          onClose={closeModal}
          onConfirm={handleSendReminder}
          invoice={contextData}
          key={contextData?.id ?? ''}
        />
      )}

      <DeleteDraftModal
        isOpenModal={modalType === 'delete'}
        onConfirm={deleteInvoice}
        onClose={() => closeModal()}
        isDraft={false}
      />

      {modalType === 'make-payment' && contextData && (
        <MakeInvoicePaymentWizard
          onClose={closeModal}
          invoice={contextData}
          onPaymentSuccess={refetch}
        />
      )}

      {modalType === 'duplicate-invoice' && contextData && (
        <DuplicateInvoiceModal
          onClose={closeModal}
          isOpenModal
          onConfirm={handleDuplicate}
        />
      )}
    </>
  );
}
