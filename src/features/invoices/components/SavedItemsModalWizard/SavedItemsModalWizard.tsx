import React, { useReducer } from 'react';
import { useApolloClient } from '@apollo/client';
import { type InvoiceLineItem } from '@/apollo/generated/types';
import { useError, useToast } from '@/hooks';
import {
  useDeleteUserInvoiceLineItemMutation,
  useUpdateUserInvoiceLineItemMutation,
} from '@/apollo/graphql';
import { EditModal } from './EditModal';
import { DeleteModal } from './DeleteModal';
import { ListModal } from './ListModal';
import { type InvoiceItemFormValues } from '../InvoiceItemForm/types';

type SavedItemsModalWizardProps = {
  isOpenModal: boolean;
  onClose: () => void;
  items: InvoiceLineItem[];
};

type WizardMode = 'preview' | 'edit' | 'delete';

interface WizardState {
  mode: WizardMode;
  editedId: string | null;
}

type WizardStateAction =
  | {
      mode: 'preview';
    }
  | {
      mode: 'edit';
      editedId: string;
    }
  | {
      mode: 'delete';
      editedId: string;
    };

function wizardStateReducer(
  state: WizardState,
  action: WizardStateAction,
): WizardState {
  switch (action.mode) {
    case 'delete':
      return { mode: 'delete', editedId: action.editedId };
    case 'preview':
      return { mode: 'preview', editedId: null };
    case 'edit':
      return { mode: 'edit', editedId: action.editedId };
    default:
      return state;
  }
}

export const SavedItemsModalWizard: React.FC<SavedItemsModalWizardProps> = ({
  isOpenModal,
  items,
  onClose,
}) => {
  const [{ mode, editedId }, dispatch] = useReducer(wizardStateReducer, {
    mode: 'preview',
    editedId: null,
  });
  const apolloClient = useApolloClient();
  const editedItem = items.find((item) => item.id === editedId);
  const { addPrimaryIconToast, addSuccessIconToast } = useToast();
  const [updateItemMutation] = useUpdateUserInvoiceLineItemMutation({
    onCompleted: () => {
      apolloClient.refetchQueries({
        include: ['getUserInvoiceLineItemList'],
      });
    },
  });
  const [deleteMutation] = useDeleteUserInvoiceLineItemMutation({
    onCompleted: () => {
      apolloClient.refetchQueries({
        include: ['getUserInvoiceLineItemList'],
      });
    },
  });

  const { logError } = useError();

  const editItem = (id: string) => {
    dispatch({ mode: 'edit', editedId: id });
  };

  const deleteItem = (id: string) => {
    dispatch({ mode: 'delete', editedId: id });
  };

  const cancelAction = () => {
    dispatch({ mode: 'preview' });
  };

  const confirmDelete = async () => {
    if (!editedItem) {
      return;
    }
    try {
      await deleteMutation({
        variables: {
          _id: editedItem.id,
        },
      });
      addPrimaryIconToast('Item has been deleted.');
    } catch (error) {
      logError(error, 'SavedItemsModalWizard');
    }

    cancelAction();
  };

  const confirmEdit = async (values: InvoiceItemFormValues) => {
    if (!editedItem) {
      throw Error('No edited item found.');
    }
    try {
      await updateItemMutation({
        variables: {
          _id: editedItem.id,
          input: {
            currency: values.currency,
            description: values.description,
            quantity: values.quantity,
            taxRate: values.taxRate,
            unitPrice: values.unitPrice,
            taxLabel: values.taxName,
          },
        },
      });
      addSuccessIconToast('Item has been edited.');
    } catch (error) {
      logError(error, 'SavedItemsModalWizard');
    }
    cancelAction();
  };

  return mode === 'edit' ? (
    <EditModal
      isOpenModal
      onClose={cancelAction}
      onConfirm={confirmEdit}
      item={editedItem}
    />
  ) : mode === 'delete' ? (
    <DeleteModal isOpenModal onClose={cancelAction} onConfirm={confirmDelete} />
  ) : isOpenModal && mode === 'preview' ? (
    <ListModal
      isOpenModal
      onDelete={deleteItem}
      onEdit={editItem}
      onClose={onClose}
      items={items}
    />
  ) : null;
};
