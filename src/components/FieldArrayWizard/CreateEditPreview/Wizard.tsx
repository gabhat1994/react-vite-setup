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
import {
  FieldArrayWizardFormContextProvider,
  type FieldArrayWizardFormContextProviderProps,
} from '../shared/context';
import * as Shared from '../shared';
import {
  type CreateEditOptions,
  type RenderOptions,
  type SummaryOptions,
} from '../shared/types';

type WizardProps<
  Values extends FieldValues,
  Name extends FieldArrayPath<Values>,
> = FieldArrayWizardFormContextProviderProps<Values, Name> & {
  name: Name;
  newItemValues: Partial<FieldArrayWithId<Values, Name>>;
  hasSeparators?: boolean;
  EditModeComponent: ComponentType<CreateEditOptions<Values, Name>>;
  PreviewModeComponent: ComponentType<RenderOptions<Values, Name>>;
  CreateModeComponent?: ComponentType<CreateEditOptions<Values, Name>>;
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
  PreviewModeComponent,
  CreateModeComponent = EditModeComponent,
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
  const nextRowIndex = wizardApi.fields.length;

  return (
    <FieldArrayWizardFormContextProvider<Values, Name>
      name={name}
      canAdd={canAdd}
      canEdit={canEdit}
      canDelete={canDelete}
      {...wizardApi}
    >
      <Stack vertical gap={16} align="stretch">
        {wizardApi.fields.map((row, index) => {
          if (wizardApi.mode === 'edit' && wizardApi.editedIndex === index) {
            return (
              <React.Fragment key={row.id}>
                <EditModeComponent
                  values={row}
                  index={index}
                  name={name}
                  fieldNamePrefix={`${name}.${index}.`}
                />
                {hasSeparators && <Separator fullWidth noMargin />}
              </React.Fragment>
            );
          }

          return (
            <React.Fragment key={row.id}>
              <PreviewModeComponent
                values={row}
                index={index}
                name={name}
                fieldNamePrefix={`${name}.${index}.`}
              />
              {hasSeparators && <Separator fullWidth noMargin />}
            </React.Fragment>
          );
        })}

        <StackItem>
          {canAdd && wizardApi.mode === 'create' ? (
            <CreateModeComponent
              values={newItemValues}
              index={nextRowIndex}
              name={name}
              fieldNamePrefix={`${name}.${nextRowIndex}.`}
            />
          ) : (
            <Stack justify="space-between">
              {canAdd && (
                <Shared.AddButton onClick={() => wizardApi.showNewItemForm()}>
                  Add New Item
                </Shared.AddButton>
              )}
              {SummaryComponent && <SummaryComponent rows={allValues} />}
            </Stack>
          )}
        </StackItem>
      </Stack>
    </FieldArrayWizardFormContextProvider>
  );
}
