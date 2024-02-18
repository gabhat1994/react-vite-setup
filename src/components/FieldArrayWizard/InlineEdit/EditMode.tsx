import React from 'react';
import {
  type FieldErrorsImpl,
  type FieldValues,
  FormProvider,
  useFormContext,
  type UseFormReturn,
} from 'react-hook-form';
import { Stack } from '@/layout';
import * as Shared from '../shared';
import { useFieldArrayWizardFormContext } from '../shared/context';

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
        canDelete ? (
          <Shared.DeleteButton onClick={() => deleteItem(index)} />
        ) : null
      }
      hasInputs
    >
      {children}
    </Shared.MainRow>
  );
}

export const FormSecondaryRow = Shared.SecondaryRow;

interface FormErrorMessageProps {
  index: number;
}

export function FormErrorMessage({ index }: FormErrorMessageProps) {
  const {
    formState: { errors: allErrors },
  } = useFormContext();

  const { name } = useFieldArrayWizardFormContext();

  // TS can't know this is an array of fields, because the library's typing is inaccurate.
  const wizardErrors = allErrors[name] as unknown as
    | FieldErrorsImpl
    | undefined;
  const rowErrors = wizardErrors?.[index];

  if (!rowErrors) {
    return null;
  }

  const error = Object.values(rowErrors)[0];

  return <Shared.ErrorMessage message={error.message} />;
}

interface EditModeProps<Values extends FieldValues> {
  children: (options: UseFormReturn<Values>) => React.ReactNode;
}

export function EditMode<Values extends FieldValues>({
  children,
}: EditModeProps<Values>) {
  const form = useFormContext<Values>();

  return (
    <FormProvider {...form}>
      <Stack gap={16} vertical align="stretch">
        {children(form)}
      </Stack>
    </FormProvider>
  );
}
