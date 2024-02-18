import { useCallback } from 'react';
import { useInvoicePdfPreviewByIdLazyQuery } from '@/apollo/graphql';
import { downloadFileFromUrl } from '@/utils/file';
import { base64ToDataString } from '@/utils/base64ToBlob';
import { InvoiceUtils } from '../utils/invoice';

export default function useInvoicePdfDownload() {
  const [getInvoiceDownloadUrlQuery, { loading }] =
    useInvoicePdfPreviewByIdLazyQuery();

  const download = useCallback(
    async (id: string, invoiceNumber: string) => {
      const response = await getInvoiceDownloadUrlQuery({
        variables: {
          id,
        },
        fetchPolicy: 'network-only',
      });
      const base64 = response.data?.invoicePDFPreviewByID.base64;
      const pdfData = base64
        ? base64ToDataString(base64, 'application/pdf')
        : null;

      if (pdfData) {
        downloadFileFromUrl(
          pdfData,
          'application/pdf',
          InvoiceUtils.getInvoiceFileName(invoiceNumber),
        );
      }
    },
    [getInvoiceDownloadUrlQuery],
  );

  return {
    loading,
    download,
  };
}
