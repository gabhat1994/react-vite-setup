import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import {
  type DeepPartial,
  type FieldValues,
  FormProvider,
  useForm,
  useFormContext,
  type UseFormReturn,
} from 'react-hook-form';
import { type AnyObjectSchema } from 'yup';
import { Stack } from '@/layout';
import * as Shared from '../shared';
import { useFieldArrayWizardFormContext } from '../shared/context';

interface PreviewMainRowProps {
  index: number;
  children: React.ReactNode;
  displayLineNumbers?: boolean;
}

export function PreviewMainRow({
  index,
  children,
  displayLineNumbers = false,
}: PreviewMainRowProps) {
  const { deleteItem, editItem, canEdit, canDelete } =
    useFieldArrayWizardFormContext();

  return (
    <Shared.MainRow
      index={index}
      displayLineNumbers={displayLineNumbers}
      actionButtons={
        <>
          {canEdit && <Shared.EditButton onClick={() => editItem(index)} />}
          {canDelete && (
            <Shared.DeleteButton onClick={() => deleteItem(index)} />
          )}
        </>
      }
    >
      {children}
    </Shared.MainRow>
  );
}

interface FormMainRowProps {
  index: number;
  children: React.ReactNode;
  displayLineNumbers?: boolean;
}

export function FormMainRow({
  index,
  children,
  displayLineNumbers = false,
}: FormMainRowProps) {
  const { deleteItem, canDelete } = useFieldArrayWizardFormContext();

  return (
    <Shared.MainRow
      index={index}
      displayLineNumbers={displayLineNumbers}
      actionButtons={
        <>
          {canDelete && (
            <Shared.DeleteButton onClick={() => deleteItem(index)} />
          )}
        </>
      }
      hasInputs
    >
      {children}
    </Shared.MainRow>
  );
}

export const FormSecondaryRow = Shared.SecondaryRow;

interface FormFooterProps {
  children: React.ReactNode;
  index: number;
}

export function FormFooter({ children, index }: FormFooterProps) {
  const { handleSubmit, formState } = useFormContext();
  const { saveItem, cancelItemEditing } = useFieldArrayWizardFormContext();

  const { isValid } = formState;

  return (
    <Shared.FooterRow
      actionButtons={
        <>
          <Shared.SaveButton
            softDisabled={!isValid}
            onClick={handleSubmit((data) => {
              saveItem(index, data);
            })}
          >
            Save Item
          </Shared.SaveButton>
          <Shared.CancelButton onClick={() => cancelItemEditing()}>
            Cancel
          </Shared.CancelButton>
        </>
      }
    >
      {children}
    </Shared.FooterRow>
  );
}

export function FormErrorMessage() {
  const {
    formState: { errors },
  } = useFormContext();

  if (Object.values(errors).length === 0) {
    return null;
  }

  const error = Object.values(errors)[0];

  return <Shared.ErrorMessage message={error?.message} />;
}

interface EditModeProps<Values extends FieldValues> {
  values: Values;
  children: (options: UseFormReturn<Values>) => React.ReactNode;
  schema: AnyObjectSchema;
}

export function EditMode<Values extends FieldValues>({
  values,
  children,
  schema,
}: EditModeProps<Values>) {
  const form = useForm<Values>({
    defaultValues: values as DeepPartial<Values>,
    resolver: yupResolver(schema),
    mode: 'all',
  });

  return (
    <FormProvider {...form}>
      <Stack gap={16} vertical align="stretch">
        {children(form)}
      </Stack>
    </FormProvider>
  );
}
