import { useCallback } from 'react';
import { useToast } from '@/hooks/toast';
import { useError } from '@/hooks';
import { useInvoiceDownloadUrlLazyQuery } from '@/apollo/graphql';

export function useInvoiceDownlaod() {
  const toast = useToast();

  const { logError } = useError();

  const [gqlInvoiceDownloadUrl] = useInvoiceDownloadUrlLazyQuery({
    fetchPolicy: 'network-only',
  });

  const downlaodInvoice = useCallback(
    async (externalInvoiceId?: string | null) => {
      if (externalInvoiceId) {
        await gqlInvoiceDownloadUrl({
          variables: {
            invoice_id: externalInvoiceId,
          },
          onError: (err: Error) => {
            logError(err, 'GetInvoiceDownloadURL');
          },
          onCompleted: ({ getInvoiceDownloadURL: url }) => {
            if (!url) return;
            const anchorTag = document.createElement('a');
            anchorTag.href = url;
            anchorTag.click();
            anchorTag.remove();
            toast.addSuccessIconToast('Invoice Dowbnlaoded');
          },
        });
      } else {
        toast.addErrorToast('External Invoice Id not found');
      }
    },
    [gqlInvoiceDownloadUrl, logError, toast],
  );

  return { downlaodInvoice };
}

export default useInvoiceDownlaod;
