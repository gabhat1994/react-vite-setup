import { generatePath, useNavigate } from 'react-router';
import { useCallback } from 'react';
import { type InvoiceOutputFragment } from '@/apollo/graphql';
import { DataGrid } from '@/components/DataGrid';
import routes from '@/constants/routes';
import { cleanList } from '@/utils/list';
import useInvoicePdfDownload from '@/features/invoices/hooks/useInvoicePdfDownload';
import useInvoicePermissions from '@/features/invoices/hooks/useInvoicePermissions';

type ActionMenuProps = {
  invoice: InvoiceOutputFragment;
  onOpenChangeStatusModal: (invoice: InvoiceOutputFragment) => void;
  onOpenDeleteModal: (invoice: InvoiceOutputFragment) => void;
  onOpenSendReminderModal: (invoice: InvoiceOutputFragment) => void;
  onOpenDuplicateInvoiceModal: (invoice: InvoiceOutputFragment) => void;
};

enum RowAction {
  View = 'VIEW',
  DownloadPdf = 'DOWNLOAD_PDF',
  ChangeStatus = 'CHANGE_STATUS',
  Edit = 'EDIT',
  Delete = 'DELETE',
  SendReminder = 'SEND_REMINDER',
  DuplicateInvoice = 'DUPLICATE_INVOICE',
}

export function ActionMenu({
  onOpenDeleteModal,
  onOpenChangeStatusModal,
  onOpenSendReminderModal,
  onOpenDuplicateInvoiceModal,
  invoice,
}: ActionMenuProps) {
  const navigate = useNavigate();
  const { download } = useInvoicePdfDownload();
  const invoiceUtils = useInvoicePermissions();

  const handleRowActionClick = useCallback(
    (action: RowAction) => {
      switch (action) {
        case RowAction.View: {
          navigate(generatePath(routes.INVOICE_DETAILS, { id: invoice.id! }));
          break;
        }
        case RowAction.Edit: {
          navigate(generatePath(routes.INVOICE_EDIT, { id: invoice.id! }));
          break;
        }
        case RowAction.Delete:
          onOpenDeleteModal(invoice);
          break;
        case RowAction.ChangeStatus:
          onOpenChangeStatusModal(invoice);
          break;
        case RowAction.DownloadPdf:
          download(invoice.id, invoice.invoiceNumber ?? '');
          break;
        case RowAction.SendReminder:
          onOpenSendReminderModal(invoice);
          break;
        case RowAction.DuplicateInvoice:
          onOpenDuplicateInvoiceModal(invoice);
          break;
        default: {
          // eslint-disable-next-line no-console
          console.log('Unsupported action', action, 'no invoice', invoice);
        }
      }
    },
    [
      download,
      invoice,
      navigate,
      onOpenChangeStatusModal,
      onOpenDeleteModal,
      onOpenSendReminderModal,
      onOpenDuplicateInvoiceModal,
    ],
  );

  return (
    <DataGrid.ActionsMenu<RowAction>
      onClick={(value) => handleRowActionClick(value)}
      menuOptions={cleanList([
        invoiceUtils.canEdit(invoice)
          ? {
              key: 'edit-invoice',
              label: 'Edit',
              value: RowAction.Edit,
              iconName: 'edit_m',
            }
          : undefined,
        {
          key: 'view-invoice',
          label: 'View',
          value: RowAction.View,
          iconName: 'eye_on_m',
        },
        invoiceUtils.canDownload(invoice)
          ? {
              key: 'download-invoice',
              label: 'Download PDF',
              value: RowAction.DownloadPdf,
              iconName: 'download_m',
            }
          : undefined,
        invoiceUtils.canChangeStatus(invoice)
          ? {
              key: 'change-status',
              label: 'Change Status',
              value: RowAction.ChangeStatus,
              iconName: 'transfer_m',
            }
          : undefined,
        invoiceUtils.canSendReminder(invoice)
          ? {
              key: 'send-reminder',
              label: 'Send Reminder',
              value: RowAction.SendReminder,
              iconName: 'notifications_m',
            }
          : undefined,
        invoiceUtils.canDuplicate(invoice)
          ? {
              key: 'duplicate-invoice',
              label: 'Duplicate Invoice',
              value: RowAction.DuplicateInvoice,
              iconName: 'copy_m',
            }
          : undefined,
        invoiceUtils.canDelete(invoice)
          ? {
              key: 'delete-invoice',
              label: 'Delete Draft',
              value: RowAction.Delete,
              intent: 'danger',
              iconName: 'delete_m',
            }
          : undefined,
      ])}
    />
  );
}
