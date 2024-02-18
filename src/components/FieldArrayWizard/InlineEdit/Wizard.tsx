import React, { type ComponentType } from 'react';
import {
  type FieldArrayPath,
  type FieldArrayPathValue,
  type FieldArrayWithId,
  type FieldValues,
  useFormContext,
} from 'react-hook-form';
import { Separator } from '@/components/Separator/Separator';
import { Stack, StackItem } from '@/layout';
import * as Shared from '../shared';
import {
  FieldArrayWizardFormContextProvider,
  type FieldArrayWizardFormContextProviderProps,
} from '../shared/context';
import { type RenderOptions, type SummaryOptions } from '../shared/types';

type WizardProps<
  Values extends FieldValues,
  Name extends FieldArrayPath<Values>,
> = FieldArrayWizardFormContextProviderProps<Values, Name> & {
  newItemValues: FieldArrayWithId<Values, Name>;
  hasSeparators?: boolean;
  EditModeComponent: ComponentType<RenderOptions<Values, Name>>;
  SummaryComponent?: ComponentType<SummaryOptions<Values, Name>>;
};

export function Wizard<
  Values extends FieldValues,
  Name extends FieldArrayPath<Values>,
>({
  name,
  newItemValues,
  hasSeparators = false,
  EditModeComponent,
  SummaryComponent,
  canAdd = true,
  canEdit = true,
  canDelete = true,
  ...wizardApi
}: WizardProps<Values, Name>) {
  const { watch } = useFormContext<Values>();

  // React Hook Form library has an issue with infinite recursion of types.
  // Throws: "Type instantiation is excessively deep and possibly infinite.ts(2589)"
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const allValues = watch(name as any) as FieldArrayPathValue<Values, Name>;

  return (
    <FieldArrayWizardFormContextProvider<Values, Name>
      name={name}
      canAdd={canAdd}
      canEdit={canEdit}
      canDelete={canDelete}
      {...wizardApi}
    >
      <Stack vertical gap={16} align="stretch">
        {wizardApi.fields.map((row, index) => (
          <React.Fragment key={row.id}>
            <EditModeComponent
              values={row}
              index={index}
              name={name}
              fieldNamePrefix={`${name}.${index}.`}
            />
            {hasSeparators && <Separator fullWidth noMargin />}
          </React.Fragment>
        ))}

        <StackItem>
          <Stack justify="space-between">
            <StackItem>
              {canAdd && (
                <Shared.AddButton
                  onClick={() => wizardApi.addNewItem(newItemValues)}
                >
                  Add New Item
                </Shared.AddButton>
              )}
            </StackItem>
            {SummaryComponent && <SummaryComponent rows={allValues} />}
          </Stack>
        </StackItem>
      </Stack>
    </FieldArrayWizardFormContextProvider>
  );
}
