import {
  GetInvoiceByIdDocument,
  GetInvoiceListDocument,
  useCreateInvoiceDraftMutation,
  useDeleteInvoiceMutation,
  useDuplicateInvoiceMutation,
  useSendInvoiceMutation,
  useUpdateInvoiceMutation,
  type GetInvoiceByIdQuery,
  type GetInvoiceByIdQueryVariables,
  type InvoiceOutputFragment,
} from '@/apollo/graphql';
import { InvoiceFormMapper } from '@/features/invoices/utils/invoiceFormMapper';
import { useError } from '@/hooks';
import { useApolloClient } from '@apollo/client';
import { useCallback } from 'react';
import { type InvoiceFormValues } from './useInvoiceForm';

type UseInvoiceHandlersOptions = {
  onCreated?(draft: InvoiceOutputFragment): void;
  invoiceId?: string;
};
export default function useInvoiceHandlers({
  onCreated,
  invoiceId,
}: UseInvoiceHandlersOptions) {
  const [createDraftMutation] = useCreateInvoiceDraftMutation();
  const [updateInvoiceMutation] = useUpdateInvoiceMutation();
  const [deleteInvoiceMutation] = useDeleteInvoiceMutation();
  const [sendInvoiceMutation] = useSendInvoiceMutation();
  const [duplicateInvoiceMutation] = useDuplicateInvoiceMutation();

  const apolloClient = useApolloClient();

  const { logError } = useError();

  const createDraft = useCallback(
    async (values: Partial<InvoiceFormValues>) => {
      if (!values?.noumId) {
        return;
      }
      try {
        const response = await createDraftMutation({
          variables: {
            input: InvoiceFormMapper.toDraftInput({
              noumId: values.noumId,
              ...values,
            }),
          },
          update: (cache, res) => {
            const resInvoice = res.data?.createInvoiceDraft;
            if (!resInvoice?.id) {
              return;
            }

            cache.writeQuery<GetInvoiceByIdQuery, GetInvoiceByIdQueryVariables>(
              {
                query: GetInvoiceByIdDocument,
                variables: {
                  id: resInvoice.id,
                },
                data: {
                  getInvoiceById: resInvoice,
                },
              },
            );
          },
          onCompleted: () => {
            apolloClient.refetchQueries({ include: [GetInvoiceListDocument] });
          },
        });

        const draftData = response?.data?.createInvoiceDraft;

        if (draftData?.id) {
          onCreated?.(draftData);
        }
      } catch (error) {
        logError(error, 'useInvoice', false);
        throw error;
      }
    },
    [apolloClient, createDraftMutation, logError, onCreated],
  );

  const updateInvoice = useCallback(
    async (values: Partial<InvoiceFormValues>) => {
      if (!values?.noumId || !invoiceId) {
        return;
      }

      try {
        const mapped = InvoiceFormMapper.toUpdateInvoiceInput({
          noumId: values.noumId,
          ...values,
        });
        await updateInvoiceMutation({
          variables: {
            id: invoiceId,
            input: mapped,
          },
        });
      } catch (error) {
        logError(error, 'useInvoice', false);
        throw error;
      }
    },
    [invoiceId, logError, updateInvoiceMutation],
  );

  const saveDraft = useCallback(
    async (values: Partial<InvoiceFormValues>) => {
      if (!invoiceId) {
        return createDraft(values);
      }
      return updateInvoice(values);
    },
    [createDraft, invoiceId, updateInvoice],
  );

  const deleteInvoice = useCallback(async () => {
    if (!invoiceId) {
      return;
    }
    try {
      await deleteInvoiceMutation({
        variables: {
          id: invoiceId,
        },
      });
    } catch (error) {
      logError(error, 'useInvoice', false);
      throw error;
    }
  }, [deleteInvoiceMutation, invoiceId, logError]);

  const sendInvoice = useCallback(async () => {
    if (!invoiceId) {
      return;
    }
    try {
      await sendInvoiceMutation({
        variables: {
          id: invoiceId,
        },
      });
    } catch (error) {
      logError(error, 'useInvoice', false);
      throw error;
    }
  }, [invoiceId, logError, sendInvoiceMutation]);

  const duplicateInvoice = useCallback(async () => {
    if (!invoiceId) {
      return null;
    }
    try {
      const res = await duplicateInvoiceMutation({
        variables: {
          invoiceId,
        },
      });
      return res.data?.duplicateInvoice;
    } catch (error) {
      logError(error, 'useInvoice', false);
      throw error;
    }
  }, [duplicateInvoiceMutation, invoiceId, logError]);

  return {
    createDraft,
    updateInvoice,
    saveDraft,
    deleteInvoice,
    sendInvoice,
    duplicateInvoice,
  };
}
