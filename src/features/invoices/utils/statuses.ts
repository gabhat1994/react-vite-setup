import {
  AllCurrencyEnum,
  InvoiceStatusEnum,
  InvoiceStatusEnumInput,
} from '@/apollo/generated/types';
import { type InvoiceOutputFragment } from '@/apollo/graphql';

function canEdit(invoice: InvoiceOutputFragment) {
  return invoice.status && invoiceStatusesPermissions[invoice.status].canEdit;
}
function canDelete(invoice: InvoiceOutputFragment) {
  return invoice.status && invoiceStatusesPermissions[invoice.status].canDelete;
}
function canSend(invoice: InvoiceOutputFragment) {
  return invoice.status && invoiceStatusesPermissions[invoice.status].canSend;
}
function canDownload(invoice: InvoiceOutputFragment) {
  return (
    invoice.status && invoiceStatusesPermissions[invoice.status].canDownload
  );
}
function canPay(invoice: InvoiceOutputFragment) {
  return (
    invoice.status &&
    invoiceStatusesPermissions[invoice.status].canPay &&
    invoice.currency === AllCurrencyEnum.Usd &&
    invoice.type === 'Received'
  );
}
function canChangeTo(status?: InvoiceStatusEnum, to?: InvoiceStatusEnumInput) {
  return (
    to && status && invoiceStatusesPermissions[status].canChangeTo.includes(to)
  );
}
function canChangeStatus(invoice: InvoiceOutputFragment) {
  return (
    invoice.status &&
    invoiceStatusesPermissions[invoice.status].canChangeTo.length > 0
  );
}

function canSendReminder(invoice: InvoiceOutputFragment) {
  return (
    invoice.status && invoiceStatusesPermissions[invoice.status].canSendReminder
  );
}

function canDuplicate(invoice: InvoiceOutputFragment) {
  return (
    invoice.status && invoiceStatusesPermissions[invoice.status].canDuplicate
  );
}

type StatusPermissionsMap = {
  [key in InvoiceStatusEnum]: {
    canEdit: boolean;
    canDelete: boolean;
    canSend: boolean;
    canDownload: boolean;
    canChangeTo: InvoiceStatusEnumInput[];
    canPay?: boolean;
    canSendReminder?: boolean;
    canDuplicate?: boolean;
  };
};

const invoiceStatusesPermissions: StatusPermissionsMap = {
  [InvoiceStatusEnum.Draft]: {
    canEdit: true,
    canDelete: true,
    canSend: true,
    canDownload: false,
    canChangeTo: [InvoiceStatusEnumInput.Cancelled],
    canSendReminder: false,
    canDuplicate: true,
  },
  [InvoiceStatusEnum.Cancelled]: {
    canEdit: false,
    canDelete: false,
    canSend: false,
    canDownload: false,
    canChangeTo: [],
    canSendReminder: false,
  },
  [InvoiceStatusEnum.Issued]: {
    canEdit: true,
    canDelete: false,
    canSend: false,
    canDownload: true,
    canPay: true,
    canSendReminder: false,
    canDuplicate: true,
    canChangeTo: [
      InvoiceStatusEnumInput.Overdue,
      InvoiceStatusEnumInput.Paid,
      InvoiceStatusEnumInput.PartiallyPaid,
      InvoiceStatusEnumInput.Cancelled,
    ],
  },
  [InvoiceStatusEnum.Overdue]: {
    canEdit: false,
    canDelete: false,
    canSend: false,
    canDownload: true,
    canPay: true,
    canSendReminder: true,
    canDuplicate: true,
    canChangeTo: [
      InvoiceStatusEnumInput.Paid,
      InvoiceStatusEnumInput.PartiallyPaid,
    ],
  },
  [InvoiceStatusEnum.Paid]: {
    canEdit: false,
    canDelete: false,
    canSend: false,
    canDownload: true,
    canDuplicate: true,
    canSendReminder: false,
    canChangeTo: [InvoiceStatusEnumInput.Overdue],
  },
  [InvoiceStatusEnum.PartiallyPaid]: {
    canEdit: false,
    canDelete: false,
    canSend: false,
    canDownload: true,
    canPay: true,
    canDuplicate: true,
    canSendReminder: true,
    canChangeTo: [
      InvoiceStatusEnumInput.Overdue,
      InvoiceStatusEnumInput.Paid,
      InvoiceStatusEnumInput.PartiallyPaid,
    ],
  },
  [InvoiceStatusEnum.WriteOff]: {
    canEdit: false,
    canDelete: false,
    canSend: false,
    canDownload: true,
    canChangeTo: [],
    canSendReminder: false,
  },
};

const StatusesMap = {
  [InvoiceStatusEnumInput.Cancelled]: {
    title: 'Cancelled',
    description:
      'This invoice was accidentally finalized or contains a mistake.',
  },
  [InvoiceStatusEnumInput.Overdue]: {
    title: 'Overdue',
    description: 'This invoice is not paid and is past due',
  },
  [InvoiceStatusEnumInput.Paid]: {
    title: 'Paid',
    description: 'Payment was collected in full outside of Noumena.',
  },
  [InvoiceStatusEnumInput.PartiallyPaid]: {
    title: 'Partially Paid',
    description: 'Part of payment was collected outside of Noumena.',
  },
  [InvoiceStatusEnumInput.WriteOff]: {
    title: 'Open',
    description: 'The invoice is ready for the customer',
  },
};

const getStatusTitle = (status: InvoiceStatusEnumInput) =>
  StatusesMap[status].title;

const getStatusDescription = (status: InvoiceStatusEnumInput) =>
  StatusesMap[status].description;

const allStatuses = Object.values(InvoiceStatusEnumInput);

const mapStatusToStatusInput = (status: InvoiceStatusEnum) =>
  InvoiceStatusUtils.invoiceStatusToInvoiceStatusInputMap[status];

const invoiceStatusToInvoiceStatusInputMap = {
  [InvoiceStatusEnum.Cancelled]: InvoiceStatusEnumInput.Cancelled,
  [InvoiceStatusEnum.Overdue]: InvoiceStatusEnumInput.Overdue,
  [InvoiceStatusEnum.Paid]: InvoiceStatusEnumInput.Paid,
  [InvoiceStatusEnum.PartiallyPaid]: InvoiceStatusEnumInput.PartiallyPaid,
  [InvoiceStatusEnum.WriteOff]: InvoiceStatusEnumInput.WriteOff,
  [InvoiceStatusEnum.Draft]: undefined,
  [InvoiceStatusEnum.Issued]: undefined,
};

export const InvoiceStatusUtils = {
  canEdit,
  canDelete,
  canSend,
  canChangeTo,
  canChangeStatus,
  invoiceStatusesPermissions,
  allStatuses,
  getStatusDescription,
  getStatusTitle,
  invoiceStatusToInvoiceStatusInputMap,
  mapStatusToStatusInput,
  canDownload,
  canPay,
  canSendReminder,
  canDuplicate,
};
