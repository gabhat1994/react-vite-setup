import { useCallback, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { usePrevious } from '@/hooks/previous';
import {
  useGetInvoiceSequenceQuery,
  useValidateInvoiceSequenceQuery,
} from '@/apollo/graphql';
import { type InvoiceFormValues } from '@/features/invoices/hooks/useInvoiceForm';
import useDebounce from '@/hooks/useDebounce';

type UseInvoiceNumberOptions = {
  disabled?: boolean;
};

export function useInvoiceNumber({ disabled }: UseInvoiceNumberOptions) {
  const { setValue, watch, setError, clearErrors, resetField } =
    useFormContext<InvoiceFormValues>();

  const [invoiceId, noumId, currentNumber] = watch([
    'id',
    'noumId',
    'invoiceNumber',
  ]);

  const prevNoumId = usePrevious(noumId);

  const [
    noumChangedAfterLastInvoiceNumberChange,
    setNoumChangedAfterLastInvoiceNumberChange,
  ] = useState(false);

  useEffect(() => {
    if (prevNoumId && noumId && prevNoumId !== noumId) {
      setNoumChangedAfterLastInvoiceNumberChange(true);
    }
  }, [noumId, prevNoumId]);

  const { data, refetch, loading } = useGetInvoiceSequenceQuery({
    variables: {
      noumId,
    },
    onCompleted(res) {
      const number = String(res.getInvoiceSequence.sequence ?? '');
      if (!currentNumber || noumChangedAfterLastInvoiceNumberChange) {
        setValue('invoiceNumber', number);
        setNoumChangedAfterLastInvoiceNumberChange(false);
      }
    },
    skip: !noumId || disabled,
    fetchPolicy: 'network-only',
  });

  const debouncedInvoiceNumber = useDebounce(currentNumber, 1000);

  const { loading: validationLoading } = useValidateInvoiceSequenceQuery({
    fetchPolicy: 'network-only',
    onCompleted(query) {
      const validationData = query?.validateInvoiceSequence;

      if (!validationData?.success && validationData?.message) {
        setError('invoiceNumber', {
          message: validationData.message,
          type: 'pattern',
        });
      } else {
        clearErrors('invoiceNumber');
      }
    },
    variables: {
      noumId,
      sequence: debouncedInvoiceNumber || '',
      invoiceId: invoiceId || '',
    },
    skip: !debouncedInvoiceNumber || disabled,
  });

  const resetInvoiceNumber = useCallback(async () => {
    const res = await refetch();
    resetField('invoiceNumber');
    setValue('invoiceNumber', String(res.data.getInvoiceSequence.sequence), {
      shouldDirty: true,
    });
  }, [refetch, resetField, setValue]);

  const suggestedSequenceNumber = String(
    data?.getInvoiceSequence?.sequence ?? '',
  );

  return {
    suggestedSequenceNumber,
    refetch,
    loading: loading || validationLoading,
    resetInvoiceNumber,
  };
}
