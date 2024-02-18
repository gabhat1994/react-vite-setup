import React, { Fragment } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { Button } from '@/components/Button';
import { Stack } from '@/layout';
import {
  type AllCurrencyEnum,
  type InvoiceStatusEnum,
  InvoiceStatusEnumInput,
} from '@/apollo/generated/types';
import { Separator } from '@/components/Separator/Separator';
import { Radiobox } from '@/components/Radiobox';
import { Icon } from '@/components/Icon';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { TextField } from '@/components/TextField';
import getCurrencySymbol from '@/utils/getCurrencySymbol';
import { getErrorProps, numberTransformer } from '@/utils/forms';
import convertToCurrency from '@/utils/currencyToCurrency';
import { useGetInvoiceAmountQuery } from '@/apollo/graphql';
import { Infobox } from '@/components/Infobox';
import { InvoiceStatusUtils } from '../../utils/statuses';
import S from './styles';
import { createStatusSchema, type StatusSchemaValues } from './utils';

type ChangeInvoiceStatusModalProps = {
  isOpenModal: boolean;
  currentStatus?: InvoiceStatusEnum;
  currency?: AllCurrencyEnum;
  invoiceId: string;
  onConfirm: (status: InvoiceStatusEnumInput, amount?: number) => void;
  onCancel: () => void;
};

const ChangeInvoiceStatusModal: React.FC<ChangeInvoiceStatusModalProps> = ({
  isOpenModal,
  onConfirm,
  onCancel,
  currentStatus,
  currency,
  invoiceId,
}) => {
  const { data: outstandingAmountData, refetch } = useGetInvoiceAmountQuery({
    variables: {
      invoiceId,
    },
    fetchPolicy: 'cache-and-network',
  });
  const outstandingAmount =
    outstandingAmountData?.getInvoiceAmount?.remainingAmount ?? 0;

  const { control, handleSubmit, formState, watch } =
    useForm<StatusSchemaValues>({
      mode: 'onChange',
      defaultValues: {
        partialAmount: 0,
        selectedStatus: currentStatus
          ? InvoiceStatusUtils.mapStatusToStatusInput(currentStatus)
          : undefined,
      },
      resolver: yupResolver(createStatusSchema(outstandingAmount)),
    });

  const [selectedStatus, partialAmount] = watch([
    'selectedStatus',
    'partialAmount',
  ]);
  const { isMobile } = useBreakpoints();

  const handleConfirm = () => {
    handleSubmit((data) => {
      refetch();
      onConfirm(data.selectedStatus, data.partialAmount);
    })();
  };

  return (
    <Modal
      isFullScreen={isMobile}
      open={isOpenModal}
      testId="add_new_customer_modal"
      size={ModalSize.L}
    >
      <ModalHeader>Change Invoice Status</ModalHeader>
      <ModalBody gap={16} maxHeight={600}>
        <Stack vertical fullWidth>
          {InvoiceStatusUtils.allStatuses.map((status) =>
            InvoiceStatusUtils.canChangeTo(currentStatus, status) ? (
              <Fragment key={status}>
                <S.StatusItem fullWidth justify="space-between">
                  <Stack vertical>
                    <S.StatusTitle>
                      {InvoiceStatusUtils.getStatusTitle(status)}
                    </S.StatusTitle>
                    <S.StatusDescription>
                      {InvoiceStatusUtils.getStatusDescription(status)}
                    </S.StatusDescription>
                  </Stack>

                  <Controller
                    control={control}
                    name="selectedStatus"
                    render={({ field: { onChange, value } }) => (
                      <Radiobox
                        isChecked={value === status}
                        icon={
                          <Icon
                            name="radio_btn_m"
                            size={12}
                            color={
                              selectedStatus === status
                                ? '--icon-radiobutton-brand-primary-default'
                                : '--icon-radiobutton-inactive-default'
                            }
                          />
                        }
                        onChange={() => {
                          onChange(status);
                        }}
                      />
                    )}
                  />
                </S.StatusItem>
                {selectedStatus === InvoiceStatusEnumInput.PartiallyPaid &&
                  status === InvoiceStatusEnumInput.PartiallyPaid && (
                    <S.PartialAmountWrapper>
                      <S.OutstandingAmount>
                        Outstanding Amount:{' '}
                        <S.OutstandingAmountBolded>
                          {convertToCurrency(outstandingAmount)}
                        </S.OutstandingAmountBolded>
                      </S.OutstandingAmount>
                      <S.TextInputWrapper>
                        <Controller
                          control={control}
                          name="partialAmount"
                          render={({ field, fieldState }) => (
                            <TextField
                              label="Partial Amount"
                              contentEditable={false}
                              isCurrency
                              numberOnly
                              prefix={getCurrencySymbol(currency)}
                              {...numberTransformer.fieldProps(field)}
                              {...getErrorProps(fieldState)}
                            />
                          )}
                        />
                      </S.TextInputWrapper>

                      {(partialAmount ?? 0) >= outstandingAmount && (
                        <S.InfoboxWrapper>
                          <Infobox type="secondary">
                            Paid Amount is equal to Outstanding Amount, so the
                            Invoice Status will be automatically changed to{' '}
                            <S.OutstandingAmountBolded>
                              Paid
                            </S.OutstandingAmountBolded>
                          </Infobox>
                        </S.InfoboxWrapper>
                      )}
                    </S.PartialAmountWrapper>
                  )}
                <Separator fullWidth noMargin />
              </Fragment>
            ) : null,
          )}
        </Stack>
      </ModalBody>
      <ModalFooter>
        <Stack gap={16} fullWidth>
          <Button size="full" tertiary onClick={onCancel}>
            Cancel
          </Button>
          <Button
            size="full"
            primary
            disabled={!formState.isValid}
            onClick={handleConfirm}
          >
            Update Status
          </Button>
        </Stack>
      </ModalFooter>
    </Modal>
  );
};

export default ChangeInvoiceStatusModal;
