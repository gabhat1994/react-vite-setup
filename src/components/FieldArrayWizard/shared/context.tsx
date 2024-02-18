import { createContext, type PropsWithChildren, useContext } from 'react';
import { type FieldArrayPath, type FieldValues } from 'react-hook-form';
import { type FieldArrayWizardApi } from '@/hooks/fieldArrayWizard/useFieldArrayWizard';

type PickPartial<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

interface FieldArrayWizardFlags {
  canAdd: boolean;
  canEdit: boolean;
  canDelete: boolean;
}

interface FieldArrayWizardFormContextApi<
  Values extends FieldValues = FieldValues,
  Name extends FieldArrayPath<Values> = FieldArrayPath<Values>,
> extends FieldArrayWizardApi<Values, Name>,
    FieldArrayWizardFlags {
  name: Name;
}

const FieldArrayWizardFormContext =
  createContext<FieldArrayWizardFormContextApi | null>(null);

export type FieldArrayWizardFormContextProviderProps<
  Values extends FieldValues,
  Name extends FieldArrayPath<Values>,
> = PickPartial<
  FieldArrayWizardFormContextApi<Values, Name>,
  'canAdd' | 'canEdit' | 'canDelete'
>;

export function FieldArrayWizardFormContextProvider<
  Values extends FieldValues,
  Name extends FieldArrayPath<Values>,
>({
  children,
  ...value
}: PropsWithChildren<FieldArrayWizardFormContextProviderProps<Values, Name>>) {
  return (
    <FieldArrayWizardFormContext.Provider
      value={value as unknown as FieldArrayWizardFormContextApi}
    >
      {children}
    </FieldArrayWizardFormContext.Provider>
  );
}

export function useFieldArrayWizardFormContext<
  Values extends FieldValues,
  Name extends FieldArrayPath<Values>,
>() {
  const context = useContext(FieldArrayWizardFormContext);

  if (!context) {
    throw new Error(
      'useFieldArrayWizardFormContext must be called within FieldArrayWizardFormContext.',
    );
  }

  return context as unknown as FieldArrayWizardFormContextApi<Values, Name>;
}
