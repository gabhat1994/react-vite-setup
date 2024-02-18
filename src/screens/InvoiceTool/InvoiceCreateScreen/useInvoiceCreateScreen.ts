import { generatePath, useNavigate } from 'react-router';
import { useCallback, useEffect, useState } from 'react';
import { InvoiceFormMapper } from '@/features/invoices/utils/invoiceFormMapper';
import { InvoiceUtils } from '@/features/invoices/utils/invoice';
import { useInvoiceForm } from '@/features/invoices/hooks/useInvoiceForm';
import routes from '@/constants/routes';
import useInvoice from '@/features/invoices/hooks/useInvoice';
import { type InvoiceOutput } from '@/apollo/generated/types';
import { useInvoiceContext } from '@/features/invoices/hooks/useInvoiceContext';
import { mapToSelectedContact } from '@/features/noumContacts/components/ContactSelector/mapper';
import useCurrentUserContact from '@/features/invoices/hooks/useCurrentUserContact';
import { useToast } from '@/hooks';
import { useSearchParams } from 'react-router-dom';

type UseInvoiceCreateScreenOptions = {
  id?: string;
  noumId?: string;
};

export default function useInvoiceCreateScreen({
  id,
  noumId,
}: UseInvoiceCreateScreenOptions) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(!!id);
  const { setSelectedBuyer, setSelectedServiceProvider } = useInvoiceContext();
  const currentUserContact = useCurrentUserContact();
  const { addErrorToast, addSuccessIconToast } = useToast();
  const [searchParams] = useSearchParams();
  const isDuplicated = Boolean(searchParams.get('duplicate')) ?? false;

  const form = useInvoiceForm({
    defaultValues: InvoiceFormMapper.getDefaultValues({
      id,
      noumId,
    }),
  });

  const serviceProviderId = form.watch('serviceProviderId');

  useEffect(() => {
    if (currentUserContact && !serviceProviderId) {
      form.setValue('serviceProviderId', currentUserContact._id);
      setSelectedServiceProvider(mapToSelectedContact(currentUserContact));
    }
  }, [currentUserContact, form, serviceProviderId, setSelectedServiceProvider]);

  const onDraftCreated = useCallback(
    (data: InvoiceOutput) => {
      if (data.id) {
        navigate(
          {
            pathname: generatePath(routes.INVOICE_EDIT, { id: data.id }),
            search: `?draft=true`,
          },
          {
            replace: true,
          },
        );
      }
    },
    [navigate],
  );

  const { saveDraft, deleteInvoice, duplicateInvoice, invoiceId, invoice } =
    useInvoice({
      invoiceId: id,
      onCreated: onDraftCreated,
      onLoad: (data) => {
        if (!InvoiceUtils.isInvoiceEditable(data?.status)) {
          navigate(routes.INVOICE_MANAGER);
        }
        if (data) {
          form.reset(InvoiceFormMapper.fromInvoice(data));

          setSelectedServiceProvider(
            data.invoiceFrom ? mapToSelectedContact(data.invoiceFrom) : null,
          );
          setSelectedBuyer(
            data.invoiceTo ? mapToSelectedContact(data.invoiceTo) : null,
          );

          if (isDuplicated && !!data.duplicatedFromInvoiceId) {
            addSuccessIconToast('Your invoice has been duplicated.');
          }

          setIsLoading(false);
        }
      },
    });

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
    form,
    isLoading,
    invoiceId,
    invoice,
    duplicateInvoice,
    saveDraft,
    deleteInvoice,
    handleDuplicate,
  };
}
