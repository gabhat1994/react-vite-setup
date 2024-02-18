import { Controller } from 'react-hook-form';
import { FeesCategoryTypes } from '@/apollo/generated/types';
import { FormControl } from '@/components/FormControl';
import { OptionSelector } from '@/components/OptionSelector';
import { type OptionSelectorOption } from '@/components/OptionSelector/types';
import { TextField } from '@/components/TextField';
import { TSpan } from '@/components/Typography';
import { Stack, StackItem } from '@/layout';
import { getErrorProps } from '@/utils/forms';
import { DatePicker } from '@/components/DatePicker';
import {
  type StatementOfWorkFormValues,
  useStatementOfWorkFormContext,
} from '../../../hooks/statementOfWorkForm';
import { CurrencySelector } from '../../CurrencySelector/CurrencySelector';
import { Section } from '../../Section/Section';
import { InstalmentsWizard } from './InstalmentsWizard/InstalmentsWizard';
import { MilestonesWizard } from './MilestonesWizard/MilestonesWizard';

export function FeesWizard() {
  const { control, watch } = useStatementOfWorkFormContext();

  const feeCategory = watch('fees.feeCategory');

  const options: OptionSelectorOption<FeesCategoryTypes>[] = [
    {
      value: FeesCategoryTypes.Inadvance,
      label: 'In Advance',
    },
    {
      value: FeesCategoryTypes.Installments,
      label: 'Installments',
    },
    {
      value: FeesCategoryTypes.Milestones,
      label: 'Milestones',
    },
    {
      value: FeesCategoryTypes.Lumpsum,
      label: 'Lump Sum',
    },
  ];

  return (
    <Section
      title="Fees"
      titleSideAddon={
        <StackItem grow={0} shrink={0}>
          <Controller<StatementOfWorkFormValues, 'payments.currency'>
            name="payments.currency"
            control={control}
            render={({ field: { ref, ...fieldProps }, fieldState }) => (
              <CurrencySelector
                inputSize="small"
                disabled
                {...fieldProps}
                {...getErrorProps(fieldState)}
              />
            )}
          />
        </StackItem>
      }
    >
      <Stack vertical gap={16} align="stretch">
        <Controller<StatementOfWorkFormValues, 'fees.feeCategory'>
          name="fees.feeCategory"
          control={control}
          render={({ field: { ref, ...fieldProps } }) => (
            <OptionSelector<FeesCategoryTypes>
              size="small"
              {...fieldProps}
              options={options}
            />
          )}
        />
        <Stack vertical gap={16} align="stretch" fullWidth>
          {feeCategory === FeesCategoryTypes.Inadvance ? (
            <Stack gap={24} align="center" justify="start">
              <StackItem grow={0}>
                <FormControl label="Amount" horizontal>
                  <Stack gap={8} align="center">
                    <Controller<
                      StatementOfWorkFormValues,
                      'fees.inAdvance.amount'
                    >
                      name="fees.inAdvance.amount"
                      control={control}
                      render={({
                        field: { ref, ...fieldProps },
                        fieldState,
                      }) => (
                        <TextField
                          inputSize="small"
                          numberOnly
                          isCurrency
                          fullWidth={false}
                          {...fieldProps}
                          {...getErrorProps(fieldState)}
                        />
                      )}
                    />
                    <TSpan colorToken="--text-tablecell-header-neutral-default">
                      USD
                    </TSpan>
                  </Stack>
                </FormControl>
              </StackItem>

              <StackItem grow={0}>
                <FormControl label="Due:" horizontal>
                  <Controller<
                    StatementOfWorkFormValues,
                    'fees.inAdvance.dueDate'
                  >
                    name="fees.inAdvance.dueDate"
                    control={control}
                    render={({ field: { ref, ...fieldProps }, fieldState }) => (
                      <DatePicker
                        size="small"
                        placeholder="MM/DD/YYYY"
                        {...fieldProps}
                        {...getErrorProps(fieldState)}
                      />
                    )}
                  />
                </FormControl>
              </StackItem>
            </Stack>
          ) : feeCategory === FeesCategoryTypes.Installments ? (
            <InstalmentsWizard />
          ) : feeCategory === FeesCategoryTypes.Milestones ? (
            <MilestonesWizard />
          ) : feeCategory === FeesCategoryTypes.Lumpsum ? (
            <Stack gap={24} align="center" justify="start">
              <StackItem grow={0}>
                <FormControl label="Amount" horizontal>
                  <Stack gap={8} align="center">
                    <Controller<
                      StatementOfWorkFormValues,
                      'fees.lumpSum.amount'
                    >
                      name="fees.lumpSum.amount"
                      control={control}
                      render={({
                        field: { ref, ...fieldProps },
                        fieldState,
                      }) => (
                        <TextField
                          inputSize="small"
                          numberOnly
                          isCurrency
                          fullWidth={false}
                          {...fieldProps}
                          {...getErrorProps(fieldState)}
                        />
                      )}
                    />
                    <TSpan colorToken="--text-tablecell-header-neutral-default">
                      USD
                    </TSpan>
                  </Stack>
                </FormControl>
              </StackItem>

              <StackItem grow={0}>
                <FormControl label="Due:" horizontal>
                  <Controller<StatementOfWorkFormValues, 'fees.lumpSum.dueDate'>
                    name="fees.lumpSum.dueDate"
                    control={control}
                    render={({ field: { ref, ...fieldProps }, fieldState }) => (
                      <DatePicker
                        size="small"
                        placeholder="MM/DD/YYYY"
                        {...fieldProps}
                        {...getErrorProps(fieldState)}
                      />
                    )}
                  />
                </FormControl>
              </StackItem>
            </Stack>
          ) : null}
        </Stack>
      </Stack>
    </Section>
  );
}
