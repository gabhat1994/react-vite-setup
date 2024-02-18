import {
  useGetInvoiceByIdQuery,
  type InvoiceOutputFragment,
} from '@/apollo/graphql';
import { useState } from 'react';
import useInvoiceHandlers from './useInvoiceHandlers';

type UseInvoiceDraftOptions = {
  onCreated?(draft: InvoiceOutputFragment): void;
  onLoad?(invoice?: InvoiceOutputFragment): void;
  invoiceId?: string;
};
export default function useInvoice({
  onCreated,
  onLoad,
  invoiceId,
}: UseInvoiceDraftOptions) {
  const [initialized, setInitialized] = useState(false);

  const { data, loading, refetch } = useGetInvoiceByIdQuery({
    variables: { id: invoiceId! },
    skip: !invoiceId,
    onCompleted: (query) => {
      if (!initialized) {
        onLoad?.(query?.getInvoiceById ?? undefined);
        setInitialized(true);
      }
    },
    fetchPolicy: 'cache-and-network',
  });

  const invoice = data?.getInvoiceById;

  const invoiceHandlers = useInvoiceHandlers({ invoiceId, onCreated });

  return {
    invoiceId,
    invoice,
    loading,
    refetchInvoice: refetch,
    ...invoiceHandlers,
  };
}
