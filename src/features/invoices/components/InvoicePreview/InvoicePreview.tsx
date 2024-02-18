import { useFormContext, useWatch } from 'react-hook-form';
import { useInvoiceContext } from '../../hooks/useInvoiceContext';
import { type InvoiceFormValues } from '../../hooks/useInvoiceForm';
import useInvoicePDFPreview from '../../hooks/useInvoicePDFPreview';
import S from './styles';

const InvoicePreview = () => {
  const { setShowInvoicePreview } = useInvoiceContext();
  const { control } = useFormContext<InvoiceFormValues>();

  const values = useWatch({ control });
  const { data, loading } = useInvoicePDFPreview({ values });

  return (
    <S.InvoicePdfPreview
      data={data}
      fitBy="height"
      isLoading={loading}
      $isEmpty={!data}
      onClick={() => setShowInvoicePreview(true)}
    />
  );
};

export default InvoicePreview;
