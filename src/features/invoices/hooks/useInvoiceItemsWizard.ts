import { type FieldArrayWithId } from 'react-hook-form';
import { useApolloClient } from '@apollo/client';
import { useError } from '@/hooks';
import { useFieldArrayWizard } from '@/hooks/fieldArrayWizard/useFieldArrayWizard';
import { useCreateUserInvoiceLineItemMutation } from '@/apollo/graphql';
import { type InvoiceFormValues } from './useInvoiceForm';

export function useInvoiceItemsWizard() {
  const {
    fields,
    addNewItem: addNewItemOriginal,
    cancelItemEditing,
    deleteItem,
    editItem,
    editedIndex,
    hideNewItemForm,
    mode,
    saveItem,
    showNewItemForm,
  } = useFieldArrayWizard<InvoiceFormValues, 'lineItems'>({
    name: 'lineItems',
  });
  const apolloClient = useApolloClient();

  const [createInvoiceLineItemMutation] = useCreateUserInvoiceLineItemMutation({
    onCompleted: () => {
      apolloClient.refetchQueries({
        include: ['getUserInvoiceLineItemList'],
      });
    },
  });
  const { logError } = useError();

  const addNewItem = async (
    values: FieldArrayWithId<InvoiceFormValues, 'lineItems', 'id'>,
    shouldSaveNewItem?: boolean,
  ) => {
    if (!shouldSaveNewItem) {
      addNewItemOriginal(values);

      return;
    }

    try {
      await createInvoiceLineItemMutation({
        variables: {
          input: {
            description: values.description,
            quantity: values.quantity,
            currency: values.currency,
            unitPrice: values.unitPrice,
            taxRate: values.taxRate,
            taxLabel: values.taxName,
          },
        },
      });
      addNewItemOriginal(values);
    } catch (error) {
      logError(error, 'useInvoiceItemsWizard');
    }
  };

  return {
    mode,
    editedIndex,
    fields,
    showNewItemForm,
    hideNewItemForm,
    addNewItem,
    deleteItem,
    cancelItemEditing,
    saveItem,
    editItem,
  };
}
