import { type DeepPartialSkipArrayKey } from 'react-hook-form';
import { useEffect, useMemo } from 'react';
import { isEmpty, isEqual, xorWith } from 'lodash';
import { useInvoicePdfPreviewLazyQuery } from '@/apollo/graphql';
import { usePrevious } from '@/hooks/previous';
import useDebounce from '@/hooks/useDebounce';
import { type InvoiceFormValues } from './useInvoiceForm';
import { useInvoiceContext } from './useInvoiceContext';
import { InvoicePreviewUtils } from '../utils/preview';

type UseInvoicePreviewOptions = {
  values?: DeepPartialSkipArrayKey<InvoiceFormValues>;
  disabled?: boolean;
};

const isArrayEqual = (x: unknown[], y: unknown[]) =>
  isEmpty(xorWith(x, y, isEqual));

function useInvoicePDFPreview({ values, disabled }: UseInvoicePreviewOptions) {
  const { selectedBuyer, selectedServiceProvider } = useInvoiceContext();

  const debouncedValues = useDebounce(values, 4000);
  const prevValues = usePrevious(debouncedValues);

  const shouldUpdatePreview = useMemo(() => {
    const { lineItems = [], ...valuesDataWithoutArrays } =
      debouncedValues ?? {};

    const { lineItems: prevLineItems = [], ...prevDataWithoutArrays } =
      prevValues ?? {};

    return (
      !isEqual(valuesDataWithoutArrays, prevDataWithoutArrays) ||
      !isArrayEqual(lineItems, prevLineItems)
    );
  }, [prevValues, debouncedValues]);

  const [fetchInvoicePreview, { data, loading }] =
    useInvoicePdfPreviewLazyQuery();

  useEffect(() => {
    if (
      (shouldUpdatePreview || !data?.invoicePDFPreview) &&
      !loading &&
      !disabled &&
      !!values?.noumId
    ) {
      fetchInvoicePreview({
        variables: {
          data: InvoicePreviewUtils.toInvoicePDFPreview(
            values,
            selectedBuyer,
            selectedServiceProvider,
          ),
        },
      });
    }
  }, [
    data?.invoicePDFPreview,
    disabled,
    fetchInvoicePreview,
    selectedBuyer,
    loading,
    selectedServiceProvider,
    shouldUpdatePreview,
    values,
  ]);

  const base64 = InvoicePreviewUtils.toBase64Data(
    data?.invoicePDFPreview.base64,
  );
  const prev = usePrevious(base64);

  return { data: base64 || prev, loading };
}

export default useInvoicePDFPreview;
