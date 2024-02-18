import { type InvoiceOutputFragment } from '@/apollo/graphql';
import { useAuth } from '@/features/auth/contexts';
import { InvoiceStatusUtils } from '../utils/statuses';

function useInvoicePermissions() {
  const { user } = useAuth();

  function isNoumOwner(invoice: InvoiceOutputFragment) {
    return invoice.createdBy?._id === user?._id;
  }

  const canEdit = (invoice: InvoiceOutputFragment) =>
    InvoiceStatusUtils.canEdit(invoice) && isNoumOwner(invoice);

  const canDelete = (invoice: InvoiceOutputFragment) =>
    InvoiceStatusUtils.canDelete(invoice) && isNoumOwner(invoice);

  const canSend = (invoice: InvoiceOutputFragment) =>
    InvoiceStatusUtils.canSend(invoice) && isNoumOwner(invoice);

  const canPay = (invoice: InvoiceOutputFragment) =>
    InvoiceStatusUtils.canPay(invoice) && !isNoumOwner(invoice);

  const canChangeStatus = (invoice: InvoiceOutputFragment) =>
    InvoiceStatusUtils.canChangeStatus(invoice) && isNoumOwner(invoice);

  const canSendReminder = (invoice: InvoiceOutputFragment) =>
    InvoiceStatusUtils.canSendReminder(invoice) && isNoumOwner(invoice);

  const canDuplicate = (invoice?: InvoiceOutputFragment | null) =>
    invoice && InvoiceStatusUtils.canDuplicate(invoice) && isNoumOwner(invoice);

  return {
    ...InvoiceStatusUtils,
    canEdit,
    canDelete,
    canSend,
    canPay,
    canChangeStatus,
    canSendReminder,
    canDuplicate,
    isNoumOwner,
  };
}

export default useInvoicePermissions;
