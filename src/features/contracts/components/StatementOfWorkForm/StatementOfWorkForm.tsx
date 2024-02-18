import { Controller } from 'react-hook-form';
import { DatePicker } from '@/components/DatePicker';
import { FormControl } from '@/components/FormControl';
import { TextField } from '@/components/TextField';
import { TSpan } from '@/components/Typography';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { Stack, StackItem } from '@/layout';
import { getErrorProps } from '@/utils/forms';
import { TextArea } from '@/components/TextArea';
import { type SowStatus } from '@/apollo/generated/types';
import { type SowFragment } from '@/apollo/graphql';
import { type Maybe } from '@/common/types';
import { FormError } from '@/components/FormError';
import {
  type StatementOfWorkFormValues,
  useStatementOfWorkFormContext,
} from '../../hooks/statementOfWorkForm';
import { ContractSelector } from '../ContractSelector/ContractSelector';
import { DocumentStatusTag } from '../DocumentStatusTag/DocumentStatusTag';
import { ProjectNoumSelector } from '../ProjectNoumSelector/ProjectNoumSelector';
import { Section } from '../Section/Section';
import { BonusCommissionWizard } from './BonusCommissionsWizard/BonusCommissionWizard';
import { DeliverablesWizard } from './DeliverablesWizard/DeliverablesWizard';
import { ExpenseReimbursementWizard } from './ExpenseReimbursementWizard/ExpenseReimbursementWizard';
import { FeesWizard } from './FeesWizard/FeesWizard';
import { MilestonesWizard } from './MilestonesWizard/MilestonesWizard';
import S from './styles';

interface StatementOfWorkFormProps {
  documentStatus: SowStatus;
  isCreating: boolean;
  onNoumChange(): void;
  disableNoum?: boolean;
  statementOfWork?: Maybe<SowFragment>;
}

export function StatementOfWorkForm({
  documentStatus,
  isCreating,
  onNoumChange,
  disableNoum = false,
  statementOfWork,
}: StatementOfWorkFormProps) {
  const {
    control,
    getValues,
    formState: { errors },
  } = useStatementOfWorkFormContext();
  const { isDesktop } = useBreakpoints();

  return (
    <Stack gap={isDesktop ? 24 : 8} vertical align="stretch">
      <S.Card>
        <Stack gap={16} vertical align="stretch">
          <Stack gap={16} justify="stretch" align="center">
            <TSpan font="heading-xs-bold">Title:</TSpan>
            <StackItem grow>
              <Controller<StatementOfWorkFormValues, 'title'>
                name="title"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    inputSize="small"
                    disabled={isCreating}
                    {...field}
                    {...getErrorProps(fieldState)}
                  />
                )}
              />
            </StackItem>
            <DocumentStatusTag status={documentStatus} size="medium" />
          </Stack>

          <S.Separator />

          <Stack gap={16} vertical align="stretch">
            <FormControl label="Noum Assignment">
              <Controller<StatementOfWorkFormValues, 'noumId'>
                name="noumId"
                render={({ field: { ref, ...fieldProps }, fieldState }) => (
                  <ProjectNoumSelector
                    disabled={disableNoum || isCreating}
                    label=""
                    preselectedItem={statementOfWork?.linkedNoum}
                    inputSize="small"
                    placeholderText="Find a Noum..."
                    {...fieldProps}
                    onChange={(newNoumId) => {
                      fieldProps.onChange(newNoumId);
                      onNoumChange();
                    }}
                    {...getErrorProps(fieldState)}
                  />
                )}
              />
            </FormControl>
            <Stack gap={16} fullWidth>
              <StackItem grow>
                <FormControl label="Scope of Work">
                  <Controller<StatementOfWorkFormValues, 'scopeOfWork'>
                    name="scopeOfWork"
                    render={({
                      field: { ref, value, ...fieldProps },
                      fieldState,
                    }) => (
                      <TextArea
                        disabled={isCreating}
                        label=""
                        maxLength={3000}
                        placeholder="Description"
                        value={value ?? ''}
                        {...fieldProps}
                        {...getErrorProps(fieldState)}
                      />
                    )}
                  />
                </FormControl>
              </StackItem>
              <StackItem>
                <FormControl label="Effective Date">
                  <Controller<StatementOfWorkFormValues, 'effectiveDate'>
                    name="effectiveDate"
                    render={({ field: { ref, ...fieldProps }, fieldState }) => (
                      <DatePicker
                        disabled={isCreating}
                        label=""
                        placeholder="MM/DD/YYYY"
                        size="small"
                        {...fieldProps}
                        {...getErrorProps(fieldState)}
                        required
                      />
                    )}
                  />
                </FormControl>
              </StackItem>
            </Stack>
          </Stack>
        </Stack>
      </S.Card>
      <S.Card>
        <Section title="Contract Attachment" hasSeparator>
          <Controller<StatementOfWorkFormValues, 'contractId'>
            name="contractId"
            render={({ field: { ref, ...fieldProps }, fieldState }) => (
              <ContractSelector
                disabled={isCreating}
                noumId={getValues('noumId')}
                inputSize="small"
                label=""
                placeholderText="Find a Contract..."
                noSearchOptionsText="No contract exists for this Noum. Create a new one or choose a different Noum."
                {...fieldProps}
                {...getErrorProps(fieldState)}
              />
            )}
          />
        </Section>
      </S.Card>

      <S.Card hasError={!!errors.deliverables?.message}>
        <Stack vertical align="stretch" gap={8}>
          <DeliverablesWizard disabled={isCreating} />
          <FormError message={errors.deliverables?.message} />
        </Stack>
      </S.Card>

      <S.Card hasError={!!errors.milestones?.message}>
        <Stack vertical align="stretch" gap={8}>
          <MilestonesWizard disabled={isCreating} />
          <FormError message={errors.milestones?.message} />
        </Stack>
      </S.Card>

      <S.Card hasError={!!errors.fees?.feeCategory?.message}>
        <FeesWizard />
        <FormError message={errors.fees?.feeCategory?.message} />
      </S.Card>

      <S.Card>
        <ExpenseReimbursementWizard disabled={isCreating} />
      </S.Card>

      <S.Card>
        <BonusCommissionWizard disabled={isCreating} />
      </S.Card>

      {/* <S.Card>
        <Section title="Upload your own logo" optional>
          TBA
        </Section>
      </S.Card> */}
    </Stack>
  );
}
