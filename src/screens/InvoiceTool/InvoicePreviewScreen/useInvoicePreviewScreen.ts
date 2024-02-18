import useInvoice from '@/features/invoices/hooks/useInvoice';
import { InvoiceUtils } from '@/features/invoices/utils/invoice';
import { useToast } from '@/hooks';
import { useCallback } from 'react';

type UseInvoicePreviewScreenOptions = {
  invoiceId?: string;
};
export default function useInvoicePreviewScreen({
  invoiceId,
}: UseInvoicePreviewScreenOptions) {
  const {
    deleteInvoice,
    sendInvoice,
    duplicateInvoice,
    refetchInvoice,
    invoice,
    loading,
  } = useInvoice({
    invoiceId,
  });
  const { addErrorToast } = useToast();

  const handleDuplicate = useCallback(async () => {
    try {
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
  }, [addErrorToast, duplicateInvoice]);

  return {
    invoice,
    loading,
    sendInvoice,
    deleteInvoice,
    handleDuplicate,
    refetchInvoice,
  };
}
