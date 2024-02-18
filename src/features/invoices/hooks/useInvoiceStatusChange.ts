import { InvoiceStatusEnumInput } from '@/apollo/generated/types';
import {
  useCreateInvoicePaymentMutation,
  useUpdateInvoiceStatusMutation,
  type InvoiceOutputFragment,
} from '@/apollo/graphql';
import { useError } from '@/hooks';
import { useCallback } from 'react';

function useInvoiceStatusChange() {
  const [updateStatusMutation] = useUpdateInvoiceStatusMutation();
  const [createInvoicePaymentMutation] = useCreateInvoicePaymentMutation();
  const { logError } = useError();

  const changeStatus = useCallback(
    async ({
      invoice,
      status,
      amount,
    }: {
      status: InvoiceStatusEnumInput;
      invoice: InvoiceOutputFragment;
      amount?: number;
    }) => {
      if (
        status === InvoiceStatusEnumInput.PartiallyPaid &&
        amount &&
        amount > 0
      ) {
        try {
          await createInvoicePaymentMutation({
            variables: {
              input: {
                amount,
                invoiceId: invoice.id,
                paidBy: invoice.invoiceTo?.displayName ?? '',
                paymentDate: new Date().toISOString(),
              },
            },
          });
        } catch (error) {
          logError(error, 'createInvoicePaymentMutation');
        }
      } else {
        try {
          await updateStatusMutation({
            variables: {
              id: invoice.id,
              status,
            },
          });
        } catch (error) {
          logError(error, 'updateStatusMutation');
        }
      }
    },
    [createInvoicePaymentMutation, logError, updateStatusMutation],
  );

  return {
    changeStatus,
  };
}

export default useInvoiceStatusChange;
