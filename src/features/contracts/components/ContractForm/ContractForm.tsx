import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { DatePicker } from '@/components/DatePicker';
import { FormControl } from '@/components/FormControl';
import { IncrementalNumberField } from '@/components/IncrementalNumberField';
import { TextField } from '@/components/TextField';
import { TSpan } from '@/components/Typography';
import { ContactSelector } from '@/features/noumContacts/components/ContactSelector';
import { Stack, StackItem } from '@/layout';
import { getErrorProps } from '@/utils/forms';
import Tooltip, { TooltipMessage } from '@/components/Tooltip';
import { type ContractFragment } from '@/apollo/graphql';
import { type Maybe } from '@/common/types';
import { mapNoumContactToSearchableNoumContact } from '@/features/noumContacts/utils/contactMapper';
import {
  type ContractFormValues,
  useContractFormContext,
} from '../../hooks/contractForm';
import { type ContractStatus } from '../../types';
import { DocumentStatusTag } from '../DocumentStatusTag/DocumentStatusTag';
import { ProjectNoumSelector } from '../ProjectNoumSelector/ProjectNoumSelector';
import S from './styles';
import { ContractLegalRegionSelector } from '../ContractLegalSelectors/ContractLegalRegionSelector';

interface ContractFormProps {
  documentStatus: ContractStatus;
  isPreDraft: boolean;
  disableNoum?: boolean;
  contract?: Maybe<ContractFragment>;
  onContactDetailsUpdated?(): void;
}

export function ContractForm({
  documentStatus,
  isPreDraft,
  disableNoum = false,
  contract,
  onContactDetailsUpdated,
}: ContractFormProps) {
  const { t } = useTranslation();
  const { control, setValue, watch } = useContractFormContext();

  const [noumId, buyerId, serviceProviderId] = watch([
    'noumId',
    'buyerId',
    'serviceProviderId',
  ]);

  const preselectedBuyer = useMemo(
    () => mapNoumContactToSearchableNoumContact(contract?.buyer),
    [contract?.buyer],
  );
  const preselectedServiceProvider = useMemo(
    () => mapNoumContactToSearchableNoumContact(contract?.seller),
    [contract?.seller],
  );

  return (
    <>
      <S.Card>
        <Stack gap={16} justify="stretch" align="center">
          <TSpan font="heading-xs-bold">
            {t('noumena.contract_form.fields.title')}
          </TSpan>
          <StackItem grow>
            <Controller<ContractFormValues, 'title'>
              name="title"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  inputSize="small"
                  rightIcon={
                    <Tooltip top={30} left={20}>
                      <TooltipMessage>
                        {t('noumena.contract_form.title.tooltip')}
                      </TooltipMessage>
                    </Tooltip>
                  }
                  {...field}
                  {...getErrorProps(fieldState)}
                />
              )}
            />
          </StackItem>
          <DocumentStatusTag status={documentStatus} size="medium" />
        </Stack>
      </S.Card>
      <S.Card>
        <Stack vertical gap={16}>
          <FormControl
            label={t('noumena.contract_form.fields.noum_assignment')}
            description={
              disableNoum
                ? undefined
                : t('noumena.contract_form.fields.noum_assignment.description')
            }
          >
            <Controller<ContractFormValues, 'noumId'>
              name="noumId"
              render={({ field: { ref, ...fieldProps }, fieldState }) => (
                <ProjectNoumSelector
                  {...fieldProps}
                  {...getErrorProps(fieldState)}
                  disabled={disableNoum}
                  label=""
                  preselectedItem={contract?.linkedNoum}
                  inputSize="small"
                  placeholderText={t(
                    'noumena.contract_form.fields.noum_assignment.placeholder',
                  )}
                />
              )}
            />
          </FormControl>
          <FormControl label={t('noumena.contract_form.fields.buyer')}>
            <Controller<ContractFormValues, 'buyerId'>
              name="buyerId"
              render={({ field: { ref, ...fieldProps }, fieldState }) => (
                <ContactSelector
                  {...fieldProps}
                  {...getErrorProps(fieldState)}
                  noumId={noumId}
                  inputSize="small"
                  fullWidth
                  label=""
                  excludedIds={[serviceProviderId]}
                  placeholderText={t(
                    'noumena.contract_form.fields.buyer.placeholder',
                  )}
                  onContactInfoValidation={(isValid) => {
                    setValue('buyerDetailsComplete', isValid, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  }}
                  disabled={isPreDraft}
                  preselectedContact={preselectedBuyer}
                  onContactDetailsUpdate={onContactDetailsUpdated}
                />
              )}
            />
          </FormControl>
          <S.Separator />

          <FormControl
            label={t('noumena.contract_form.fields.service_provider')}
          >
            <Controller<ContractFormValues, 'serviceProviderId'>
              name="serviceProviderId"
              render={({ field: { ref, ...fieldProps }, fieldState }) => (
                <ContactSelector
                  {...fieldProps}
                  {...getErrorProps(fieldState)}
                  noumId={noumId}
                  inputSize="small"
                  label=""
                  fullWidth
                  excludedIds={[buyerId]}
                  placeholderText={t(
                    'noumena.contract_form.fields.buyer.placeholder',
                  )}
                  disabled={isPreDraft}
                  preselectedContact={preselectedServiceProvider}
                  onContactInfoValidation={(isValid) => {
                    setValue('serviceProviderDetailsComplete', isValid, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  }}
                  onContactDetailsUpdate={onContactDetailsUpdated}
                />
              )}
            />
          </FormControl>
          <S.Separator />

          <Stack gap={16} justify="stretch" fullWidth>
            <FormControl
              label={t('noumena.contract_form.fields.effective_date')}
            >
              <Controller<ContractFormValues, 'effectiveDate'>
                name="effectiveDate"
                control={control}
                render={({ field: { ref, ...fieldProps }, fieldState }) => (
                  <DatePicker
                    {...fieldProps}
                    fullSize
                    size="small"
                    disabled={isPreDraft}
                    {...getErrorProps(fieldState)}
                    required
                  />
                )}
              />
            </FormControl>
            <FormControl
              label={t('noumena.contract_form.fields.termination_notice')}
              optional
            >
              <Stack gap={12} align="center">
                <Controller<ContractFormValues, 'terminationNotice'>
                  name="terminationNotice"
                  control={control}
                  render={({ field, fieldState }) => (
                    <IncrementalNumberField
                      step={1}
                      min={0}
                      max={90}
                      inputSize="small"
                      disabled={isPreDraft}
                      {...field}
                      {...getErrorProps(fieldState)}
                    />
                  )}
                />
                <TSpan font="body-l" colorToken="--text-card-neutral-default">
                  {t('noumena.contract_form.fields.termination_notice.unit')}
                </TSpan>
              </Stack>
            </FormControl>
          </Stack>
          <S.Separator />

          <Stack gap={16} justify="stretch" fullWidth>
            <FormControl
              label={t('noumena.contract_form.fields.governing_law')}
            >
              <ContractLegalRegionSelector name="governingLaw" />
            </FormControl>
            <FormControl label={t('noumena.contract_form.fields.arbitration')}>
              <ContractLegalRegionSelector name="arbitration" />
            </FormControl>
          </Stack>
        </Stack>
      </S.Card>
    </>
  );
}
