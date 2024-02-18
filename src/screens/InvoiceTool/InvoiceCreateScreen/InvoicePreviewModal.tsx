import { type DeepPartialSkipArrayKey } from 'react-hook-form';
import { useInvoiceContext } from '@/features/invoices/hooks/useInvoiceContext';
import { type InvoiceFormValues } from '@/features/invoices/hooks/useInvoiceForm';
import { DocViewer } from '@/components/LightBox/DocViewer';
import { useInvoicePdfPreviewQuery } from '@/apollo/graphql';
import { InvoicePreviewUtils } from '@/features/invoices/utils/preview';
import useInvoicePdfDownload from '@/features/invoices/hooks/useInvoicePdfDownload';

type InvoicePreviewModalProps = {
  values?: DeepPartialSkipArrayKey<InvoiceFormValues>;
};

const InvoicePreviewModal: React.FC<InvoicePreviewModalProps> = ({
  values,
}) => {
  const {
    shouldShowInvoicePreview,
    setShowInvoicePreview,
    selectedServiceProvider,
    selectedBuyer,
  } = useInvoiceContext();

  const { data } = useInvoicePdfPreviewQuery({
    variables: {
      data:
        values && shouldShowInvoicePreview
          ? InvoicePreviewUtils.toInvoicePDFPreview(
              values,
              selectedBuyer,
              selectedServiceProvider,
            )
          : undefined,
    },
    skip: !shouldShowInvoicePreview || !values,
  });

  const { download } = useInvoicePdfDownload();

  const handleDownload = () => {
    if (values?.id && values.invoiceNumber) {
      download(values.id, values.invoiceNumber);
    }
  };

  const base64Data = InvoicePreviewUtils.toBase64Data(
    data?.invoicePDFPreview.base64,
  );

  return base64Data && shouldShowInvoicePreview ? (
    <DocViewer
      isOpen={shouldShowInvoicePreview}
      handleClose={() => setShowInvoicePreview(false)}
      handleDownload={values?.id ? handleDownload : undefined}
      setDocError={() => {}}
      url={base64Data || ''}
    />
  ) : null;
};

export default InvoicePreviewModal;
