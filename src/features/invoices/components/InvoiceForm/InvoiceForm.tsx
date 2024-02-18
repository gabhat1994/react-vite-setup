import { type InvoiceOutputFragment } from '@/apollo/graphql';
import { type Maybe } from '@/common/types';
import { ApiEntityPickerFieldWithLocalSearch } from '@/components/ApiEntityPickerField';
import { DatePicker } from '@/components/DatePicker';
import { Infobox } from '@/components/Infobox';
import { SelectField } from '@/components/SelectField';
import { TSpan } from '@/components/Typography';
import { ProjectNoumSelector } from '@/features/contracts/components/ProjectNoumSelector/ProjectNoumSelector';
import { ContactSelector } from '@/features/noumContacts/components/ContactSelector';
import { mapNoumContactToSearchableNoumContact } from '@/features/noumContacts/utils/contactMapper';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { Stack } from '@/layout';
import { getErrorProps } from '@/utils/forms';
import { subDays } from 'date-fns';
import { useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import useCurrentUserContact from '../../hooks/useCurrentUserContact';
import { useInvoiceContext } from '../../hooks/useInvoiceContext';
import { type InvoiceFormValues } from '../../hooks/useInvoiceForm';
import { DueDateOption } from '../../types';
import { InvoiceUtils } from '../../utils/invoice';
import FormSection from '../FormSection/FormSection';
import InvoiceItemsWizard from '../InvoiceItemsWizard/InvoiceItemsWizard';
import InvoiceLateFeeField from '../InvoiceLateFeeField/InvoiceLateFeeField';
import InvoiceLogoUpload from '../InvoiceLogoUpload/InvoiceLogoUpload';
import InvoiceNumberField from '../InvoiceNumberField/InvoiceNumberField';
import InvoicePreview from '../InvoicePreview/InvoicePreview';
import InvoiceTextAreaFormField from '../InvoiceTextAreaFormField/InvoiceTextAreaFormField';
import S from './styles';

type InvoiceFormProps = {
  predefinedNoumId?: string;
  invoice: Maybe<InvoiceOutputFragment>;
};

const InvoiceForm: React.FC<InvoiceFormProps> = ({
  predefinedNoumId,
  invoice,
}) => {
  const { control, watch, getValues, setValue } =
    useFormContext<InvoiceFormValues>();
  const { isTablet, isDesktop } = useBreakpoints();
  const today = useRef(new Date());

  const [noumId, invoiceStatus, serviceProviderId, dueDate] = watch([
    'noumId',
    'status',
    'serviceProviderId',
    'dueDate',
  ]);

  const { setSelectedBuyer, setSelectedServiceProvider } = useInvoiceContext();
  const currentUserContact = useCurrentUserContact();

  return (
    <S.Container>
      <S.LeftContainer>
        <S.FormContent>
          <Stack vertical gap={16} fullWidth>
            <FormSection
              fullSize
              title="Noum Assignment"
              sectionSeparator={false}
            >
              <Controller
                control={control}
                name="noumId"
                render={({ field: { ref, ...fieldProps }, fieldState }) => (
                  <ProjectNoumSelector
                    label={fieldProps.value ? '' : 'Find a Noum...'}
                    inputSize="small"
                    preselectedItem={invoice?.noumId}
                    {...fieldProps}
                    disabled={
                      !!predefinedNoumId &&
                      !InvoiceUtils.canEditField(invoiceStatus, 'noumId')
                    }
                    onChange={(newValue) => {
                      fieldProps.onChange(newValue);

                      if (getValues('buyerId')) {
                        setValue('buyerId', '', {
                          shouldValidate: true,
                          shouldDirty: true,
                          shouldTouch: true,
                        });
                      }
                    }}
                    {...getErrorProps(fieldState)}
                  />
                )}
              />
            </FormSection>
            <Stack
              gap={isTablet ? 16 : 24}
              align="start"
              vertical={isTablet}
              fullWidth
            >
              <InvoiceNumberField
                disabled={
                  !noumId ||
                  !InvoiceUtils.canEditField(invoiceStatus, 'invoiceNumber')
                }
              />
              <Stack fullWidth={!isDesktop}>
                <Controller
                  control={control}
                  name="issueDate"
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <DatePicker
                      required
                      fullSize
                      placement="bottom-end"
                      dateFormat="MMM dd, yyyy"
                      size="small"
                      showIcon
                      minDate={subDays(today.current, 1)}
                      value={value ? new Date(value) : undefined}
                      onChange={onChange}
                      label="Invoice Issue Date"
                      error={!!error?.message}
                      disabled={{
                        before: today.current,
                      }}
                    />
                  )}
                />
              </Stack>
            </Stack>
          </Stack>

          <S.Separator />

          <FormSection title="Recipient" fullSize>
            <Controller
              control={control}
              name="buyerId"
              render={({ field: { value, onChange }, fieldState }) => (
                <>
                  <ContactSelector
                    noumId={noumId}
                    inputSize="small"
                    excludedIds={[serviceProviderId]}
                    label="Find or Add a Buyer..."
                    value={value}
                    excludeCurrentUser
                    preselectedContact={mapNoumContactToSearchableNoumContact(
                      invoice?.invoiceTo,
                    )}
                    disabled={
                      !InvoiceUtils.canEditField(invoiceStatus, 'buyerId')
                    }
                    onChange={(selected, item) => {
                      setSelectedBuyer(item);
                      onChange(selected);
                    }}
                    usePortal
                    renderContainerFromBottom
                    onContactInfoValidation={(isValid) => {
                      setValue('buyerDetailsComplete', isValid, {
                        shouldDirty: true,
                        shouldValidate: true,
                      });
                    }}
                    {...getErrorProps(fieldState)}
                  />
                </>
              )}
            />
          </FormSection>

          <S.Separator />

          <FormSection title="Service Provider" fullSize>
            <Controller
              control={control}
              name="serviceProviderId"
              render={({ field: { onChange, value }, fieldState }) => (
                <ContactSelector
                  noumId={noumId!}
                  inputSize="small"
                  addContactDisabled
                  label="Find or add a Service Provider..."
                  preselectedContact={
                    mapNoumContactToSearchableNoumContact(
                      invoice?.invoiceFrom,
                    ) ??
                    mapNoumContactToSearchableNoumContact(currentUserContact)
                  }
                  value={value}
                  disabled={
                    !InvoiceUtils.canEditField(
                      invoiceStatus,
                      'serviceProviderId',
                    )
                  }
                  onChange={(selected, item) => {
                    setSelectedServiceProvider(item);
                    onChange(selected);
                  }}
                  clearButtonDisabled
                  usePortal
                  renderContainerFromBottom
                  onContactInfoValidation={(isValid) => {
                    setValue('serviceProviderDetailsComplete', isValid, {
                      shouldDirty: true,
                      shouldValidate: true,
                    });
                  }}
                  {...getErrorProps(fieldState)}
                />
              )}
            />
          </FormSection>

          <S.Separator />

          <FormSection fullSize sectionSeparator={false}>
            <InvoiceTextAreaFormField
              disabled={!InvoiceUtils.canEditField(invoiceStatus, 'summary')}
              name="summary"
              title="Attention"
            />
          </FormSection>

          <S.Separator />

          <FormSection title="Items" fullSize>
            <InvoiceItemsWizard />
          </FormSection>

          <S.Separator />

          <Stack fullWidth vertical gap={16}>
            <FormSection fullSize title="Payment" sectionSeparator={false}>
              <TSpan font="body-m-bold">Currency</TSpan>
              <Controller
                control={control}
                name="currency"
                render={({ field: { value, onChange } }) => (
                  <ApiEntityPickerFieldWithLocalSearch
                    inputSize="small"
                    hideIcons
                    hideLeftIconPlace
                    maxContainerHeight="250px"
                    disabled={
                      !InvoiceUtils.canEditField(invoiceStatus, 'currency')
                    }
                    onChange={(option) => onChange(option?.value)}
                    inputValue={
                      InvoiceUtils.getCurrencyByCode(value)?.label as string
                    }
                    value={value}
                    leftIcon={<></>}
                    usePortal
                    renderContainerFromBottom
                    rightIcon={<></>}
                    options={InvoiceUtils.currencyOptions}
                  />
                )}
              />
            </FormSection>

            <FormSection
              fullSize
              title="Due Date"
              font="body-m-bold"
              sectionSeparator={false}
            >
              <Stack gap={8} vertical={isTablet}>
                <Controller
                  control={control}
                  name="dueDate"
                  render={({ field: { value, onChange } }) => (
                    <SelectField
                      inputSize="small"
                      onChange={(option) => {
                        if (option.value === DueDateOption.CUSTOM_DATE) {
                          setValue('customDueDate', new Date(), {
                            shouldDirty: true,
                            shouldValidate: true,
                          });
                        } else {
                          setValue('customDueDate', undefined);
                        }
                        onChange(option.value);
                      }}
                      value={value}
                      disabled={
                        !InvoiceUtils.canEditField(invoiceStatus, 'dueDate')
                      }
                      options={InvoiceUtils.dueDateOptions}
                      usePortal
                      renderContainerFromBottom
                    />
                  )}
                />
                {dueDate === DueDateOption.CUSTOM_DATE && (
                  <Controller
                    control={control}
                    name="customDueDate"
                    render={({
                      field: { value, onChange },
                      fieldState: { error },
                    }) => (
                      <DatePicker
                        required
                        fullSize
                        placement="bottom-end"
                        dateFormat="MMM dd, yyyy"
                        size="small"
                        showIcon
                        value={value ? new Date(value) : undefined}
                        onChange={onChange}
                        label="Due date"
                        error={!!error?.message}
                        minDate={subDays(today.current, 1)}
                        disabled={{
                          before: today.current,
                        }}
                      />
                    )}
                  />
                )}
              </Stack>
            </FormSection>

            <FormSection
              title="Payment Terms"
              font="body-m-bold"
              sectionSeparator={false}
              fullSize
            >
              <Controller
                control={control}
                name="paymentTerms"
                render={({ field: { value, onChange } }) => (
                  <SelectField
                    inputSize="small"
                    onChange={(option) => onChange(option.value)}
                    value={value}
                    disabled={
                      !InvoiceUtils.canEditField(invoiceStatus, 'paymentTerms')
                    }
                    options={InvoiceUtils.paymentTermsOptions}
                    usePortal
                    renderContainerFromBottom
                  />
                )}
              />
            </FormSection>

            <FormSection
              fullSize
              font="body-m-bold"
              title="Late Fee"
              sectionSeparator={false}
            >
              <InvoiceLateFeeField
                disabled={
                  !InvoiceUtils.canEditField(invoiceStatus, 'lateFeeType')
                }
              />
            </FormSection>
          </Stack>

          <S.Separator />

          <FormSection title="Upload your own logo" optional fullSize>
            <InvoiceLogoUpload />
          </FormSection>

          <S.Separator />

          <InvoiceTextAreaFormField
            disabled={!InvoiceUtils.canEditField(invoiceStatus, 'notes')}
            name="notes"
            title="Notes"
          >
            <Infobox type="tertiary">
              You may provide important information such as: bank account
              details, VAT number, or other relevant information
            </Infobox>
          </InvoiceTextAreaFormField>

          <S.Separator />
        </S.FormContent>

        {/* Hidden until backend support it */}
        {/* <S.PageCard>
          <FormSection
            title="Statement of Work"
            optional
            fullSize
            titleSeparator
            sectionSeparator={false}
          >
            <StatementOfWorkPicker />
          </FormSection>
        </S.PageCard> */}
      </S.LeftContainer>

      {isDesktop && (
        <S.PreviewContainer>
          <S.PreviewStickyContainer>
            <InvoicePreview />
          </S.PreviewStickyContainer>
        </S.PreviewContainer>
      )}
    </S.Container>
  );
};

export default InvoiceForm;
