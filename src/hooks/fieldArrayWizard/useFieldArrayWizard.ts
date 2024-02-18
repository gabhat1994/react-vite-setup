import { useReducer } from 'react';
import {
  type Control,
  type FieldArray,
  type FieldArrayPath,
  type FieldValues,
  useFieldArray,
  type UseFieldArrayReturn,
  useFormContext,
} from 'react-hook-form';

export type WizardMode = 'preview' | 'edit' | 'create';

interface WizardState {
  mode: WizardMode;
  editedIndex: number | null;
}

type WizardStateAction =
  | {
      mode: 'preview';
    }
  | {
      mode: 'edit';
      editedIndex: number;
    }
  | {
      mode: 'create';
    };

function wizardStateReducer(
  state: WizardState,
  action: WizardStateAction,
): WizardState {
  switch (action.mode) {
    case 'create':
      return { mode: 'create', editedIndex: null };
    case 'preview':
      return { mode: 'preview', editedIndex: null };
    case 'edit':
      return { mode: 'edit', editedIndex: action.editedIndex };
    default:
      return state;
  }
}

interface UseFieldArrayWizardOptions<
  Values extends FieldValues,
  Name extends FieldArrayPath<Values>,
> {
  name: Name;
  initialMode?: Exclude<WizardMode, 'edit'>;
}

export interface FieldArrayWizardApi<
  Values extends FieldValues,
  Name extends FieldArrayPath<Values>,
> {
  mode: WizardMode;
  editedIndex: number | null;
  fields: UseFieldArrayReturn<Values, Name>['fields'];
  control: Control<Values>;
  showNewItemForm(): void;
  hideNewItemForm(): void;
  addNewItem(values: FieldArray<Values, Name>): void;
  deleteItem(index: number): void;
  cancelItemEditing(): void;
  saveItem(index: number, values: FieldArray<Values, Name>): void;
  editItem(index: number): void;
  insertItemAt(index: number, values: FieldArray<Values, Name>): void;
}

export function useFieldArrayWizard<
  Values extends FieldValues,
  Name extends FieldArrayPath<Values>,
>({
  name,
  initialMode = 'preview',
}: UseFieldArrayWizardOptions<Values, Name>): FieldArrayWizardApi<
  Values,
  Name
> {
  const [{ mode, editedIndex }, dispatch] = useReducer(wizardStateReducer, {
    mode: initialMode,
    editedIndex: null,
  });

  const { control } = useFormContext<Values>();

  const { fields, append, update, remove, insert } = useFieldArray<
    Values,
    Name
  >({
    name,
    control,
  });

  const showNewItemForm = () => {
    dispatch({ mode: 'create' });
  };

  const hideNewItemForm = () => {
    dispatch({ mode: 'preview' });
  };

  const addNewItem = (values: FieldArray<Values, Name>) => {
    append(values);
    dispatch({ mode: 'preview' });
  };

  const deleteItem = (index: number) => {
    remove(index);
    dispatch({ mode: 'preview' });
  };

  const cancelItemEditing = () => {
    dispatch({ mode: 'preview' });
  };

  const saveItem = (index: number, values: FieldArray<Values, Name>) => {
    update(index, values);
    dispatch({ mode: 'preview' });
  };

  const editItem = (index: number) => {
    dispatch({ mode: 'edit', editedIndex: index });
  };

  const insertItemAt = (index: number, values: FieldArray<Values, Name>) => {
    insert(index, values);
  };

  return {
    mode,
    editedIndex,
    fields,
    control,
    showNewItemForm,
    hideNewItemForm,
    addNewItem,
    deleteItem,
    cancelItemEditing,
    saveItem,
    editItem,
    insertItemAt,
  };
}
