/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { type FC, Fragment, useContext, useEffect, useState } from 'react';
import { t } from 'i18next';
import { useForm, type ValidateResult } from 'react-hook-form';
import { TextField } from '@/components/TextField';
import { Button } from '@/components/Button';
import { Spacer, Stack } from '@/layout';
import {
  AllCurrencyEnum,
  CurrencyEnum,
  SettlementPeriodEnum,
} from '@/apollo/generated/types';
import { useDeviceType, useToast, DeviceTypeEnum } from '@/hooks';
import convertToCurrency from '@/utils/currencyToCurrency';
import { useTransactionLimitsQuery } from '@/apollo/graphql';
import { TSpan } from '@/components/Typography';
import { Icon } from '@/components/Icon';
import { getAccountId } from '@/features/TransactionModal/helpers';
import { PaymentDataContext } from '@/features/TransactionModal/contexts/PaymentDataContext';
import { PaymentStateContext } from '@/features/TransactionModal/contexts/PaymentStateContext';
import { Tooltip } from './styles';
import { Label, Footer, ModalContent } from '../../styles';
import { type FormValus } from './types';

const PaymentDescription: FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  // const { isUnregistered: isNonNoumenaMember } = useAuth();
  const deviceType = useDeviceType();
  const { addToast } = useToast();
  const isTouchDevice =
    deviceType === DeviceTypeEnum.MOBILE ||
    deviceType === DeviceTypeEnum.TABLET;

  const {
    handleTransactionChange,
    source,
    isStripeFlow,
    maxTransactionAmount,
    destination,
    transactions,
    disableAmountsField,
    invoice,
  } = useContext(PaymentDataContext);

  const {
    handleForwardStateChange,
    handleBackwardsStateChange,
    isMobile,
    type,
  } = useContext(PaymentStateContext);

  const isSourceCard = source === 'PAY_BY_CARD';
  const isSourceBank = !isSourceCard && source?.accountType === 'BANK';

  // const skipLimitValidation =
  //   (!isNonNoumenaMember && (isSourceBank || isStripeFlow)) ||
  //   (isNonNoumenaMember && (!isSourceBank || isStripeFlow));
  const skipLimitValidation = isStripeFlow;

  // const { data: customerLimit } = useTransactionLimitsQuery({
  //   skip: skipLimitValidation,
  //   fetchPolicy: 'network-only',
  // });

  const { data: customerLimit } = useTransactionLimitsQuery({
    skip: skipLimitValidation,
    fetchPolicy: 'network-only',
    variables: {
      sourceAccountId: isStripeFlow
        ? 'CARD'
        : typeof source !== 'string' && source?.id
        ? source?.id
        : '',
      destinationAccountId: getAccountId(type, destination),
      invoicePayment: !!invoice?.id,
    },
  });

  const weeklyLimit =
    customerLimit?.getCustomerLimitsV2?.weeklyLimit !== undefined
      ? customerLimit?.getCustomerLimitsV2?.weeklyLimit
      : -1;
  const availableWeeklyLimit =
    customerLimit?.getCustomerLimitsV2?.availableWeeklyLimit || 0;
  const transactionLimit =
    customerLimit?.getCustomerLimitsV2?.transactionLimit !== undefined
      ? customerLimit?.getCustomerLimitsV2?.transactionLimit
      : -1;

  const amount = convertToCurrency(
    (!isSourceCard && source?.balance) || 0,
    CurrencyEnum.Usd,
    2,
  );
  const [blured, setBlured] = useState(false);

  const showBalanceLable = !isStripeFlow && !isSourceBank;

  const {
    register,
    formState: { errors, isDirty, isValid },
    getValues,
    setValue,
    handleSubmit,
    watch,
    trigger,
  } = useForm<FormValus>({
    mode: 'onChange',
    defaultValues: {
      amount: maxTransactionAmount ? String(maxTransactionAmount) : '',
      transactionReason: '',
      settlementPeriod: SettlementPeriodEnum.Sameday,
    },
  });

  const convertToNumberString = (value: string) =>
    value.replaceAll(',', '').replaceAll('$', '');

  const submit = (data: FormValus) => {
    const formattedData = {
      ...data,
      amount: convertToNumberString(data.amount),
    };
    if (formattedData.amount && !isSourceCard) {
      if (isSourceBank) {
        if (handleTransactionChange) {
          handleTransactionChange(formattedData);
          handleForwardStateChange();
        }
      } else if (Number(formattedData.amount) <= Number(source.balance || 0)) {
        if (handleTransactionChange) {
          handleTransactionChange(formattedData);
          handleForwardStateChange();
        }
      } else {
        addToast(
          'error',
          'none',
          `${t('noumena.money.transaction.insufficient.balance')}`,
        );
      }
    }
    if (isSourceCard) {
      if (handleTransactionChange) {
        handleTransactionChange(formattedData);
        handleForwardStateChange();
      }
    }
  };

  useEffect(() => {
    setValue('settlementPeriod', SettlementPeriodEnum.Sameday);
    if (transactions.amount) {
      setValue('amount', transactions.amount);
    }
  }, [setValue, transactions.amount]);

  const amountValue = watch('amount');

  const textAreaWidth =
    amountValue.length > 6 ? `${amountValue.length + 2}ch` : '8ch';

  const formatAmountValue = (val: string) => {
    if (/^[0-9]*\.?[0-9]*$/.test(convertToNumberString(val))) {
      return convertToCurrency(
        Number(convertToNumberString(val)),
        undefined,
        blured ? 2 : 0,
      );
    }
    const removedNumber = val.replace(/[^\d.-]/g, '');
    return convertToCurrency(Number(removedNumber), undefined, blured ? 2 : 0);
  };

  const validateDescription = (v: string): ValidateResult => {
    if (v.trim().length > 0) {
      return true;
    }
    return 'Description should contain atleast 1 character';
  };

  const validateAmount = (v: string): ValidateResult => {
    if (/^[0-9]*\.?[0-9]*$/.test(convertToNumberString(v))) {
      return true;
    }
    return 'Invalid amount';
  };

  const validateMaxAmount = (v: string): ValidateResult => {
    const maxAmountExceeded = Boolean(
      maxTransactionAmount &&
        maxTransactionAmount > 0 &&
        Number(convertToNumberString(v)) > maxTransactionAmount,
    );

    if (maxAmountExceeded) {
      return 'Exceeded max amount limit';
    }
    return true;
  };

  const greatherThanZero = (v: string): ValidateResult => {
    if (Number.parseFloat(convertToNumberString(v)) > 0) {
      return true;
    }
    return 'Invalid amount';
  };

  const greatherThanMaxValue = (v: string): ValidateResult => {
    if (!skipLimitValidation) return true;
    if (Number.parseFloat(convertToNumberString(v)) <= 999999.99) return true;
    return 'Invalid amount';
  };

  const validateTransactionLimit = (v: string) => {
    if (skipLimitValidation) return true;
    const enteredAmount = Number.parseFloat(convertToNumberString(v));
    return (
      (weeklyLimit === -1 && transactionLimit === -1) ||
      (transactionLimit === -1 && enteredAmount <= availableWeeklyLimit) ||
      (weeklyLimit === -1 && enteredAmount <= transactionLimit) ||
      (enteredAmount <= availableWeeklyLimit &&
        enteredAmount <= transactionLimit)
    );

    // if (
    //   availableWeeklyLimit &&
    //   transactionLimit &&
    //   enteredAmount <= availableWeeklyLimit &&
    //   enteredAmount <= transactionLimit
    // ) {
    //   return true;
    // }
    // return '';
  };

  const handelDecimalAfterBlur = () => {
    const amountWithoutCharacters = getValues('amount').replaceAll(
      /[^\d.-]/g,
      '',
    );
    const isNotDecimalAmount = !amountWithoutCharacters.includes('.');
    const isAmountWithoutDecimalDigits =
      amountWithoutCharacters.includes('.') &&
      !amountWithoutCharacters.split('.')[1].length; // *Example $777. instead of $777.00

    if (isNotDecimalAmount) {
      setBlured(true);
      const modifiedValue = `${amountWithoutCharacters}.00`; // Make it decimal by adding .00
      setValue('amount', modifiedValue);
      trigger('amount');
      return;
    }
    if (isAmountWithoutDecimalDigits) {
      setBlured(true);
      const modifiedValue = `${amountWithoutCharacters}00`; // *Add 00 as dot is already there $777.00
      setValue('amount', modifiedValue);
      trigger('amount');
      return;
    }
    setValue('amount', amountWithoutCharacters);
    trigger('amount');
  };

  const handleDecimalAfterFocus = () => {
    const inputValue = getValues('amount');
    if (inputValue.includes('.00')) {
      setValue('amount', getValues('amount').replace('.00', ''));
    }
    setBlured(false);
  };

  return (
    <Fragment>
      <form
        onSubmit={handleSubmit(submit)}
        style={{ width: '100%', height: '100%' }}
      >
        <ModalContent align="center">
          <Label font="body-l" colorToken="--text-input-neutral-default">
            Amount
          </Label>
          <Spacer height={8} />
          <Stack fullWidth align="center" justify="center" vertical>
            <TextField
              {...register('amount', {
                required: {
                  value: true,
                  message: t('noumena.input.not_empty'),
                },
                validate: {
                  validAmount: (v) => validateAmount(v),
                  validateMaxAmount: (v) => validateMaxAmount(v),
                  greatherThanZero: (v) => greatherThanZero(v),
                  greatherThanMaxValue: (v) => greatherThanMaxValue(v),
                  validateTransactionLimit: (v) => validateTransactionLimit(v),
                },
              })}
              readOnly={disableAmountsField}
              autoFocus
              noBorder
              isCurrency
              placeholder={t('noumena.money.payment.amount.placeholder')}
              value={formatAmountValue(getValues('amount'))}
              onBlur={handelDecimalAfterBlur}
              onFocus={handleDecimalAfterFocus}
              error={!!errors.amount}
              helperText={errors.amount?.message as string}
              centerHelperText
              fullWidth={false}
              style={{
                width: textAreaWidth,
                height: '66px',
                fontSize: '44px',
                textAlign: 'center',
                borderBottom: '2px solid var(--text-input-neutral-default)',
                backgroundColor: 'var(--bg-modal-neutral-alt-default)',
                borderRadius: '0',
                maxWidth: '15ch',
              }}
            />

            {errors.amount?.type === 'validateTransactionLimit' && (
              <>
                <Spacer height={4} />
                <Stack
                  style={{ width: '172px', position: 'relative' }}
                  justify="space-between"
                >
                  <TSpan
                    colorToken="--text-input-danger-primary-default"
                    font="footnote"
                  >
                    Transaction limit exceeded.
                  </TSpan>
                  <div
                    onMouseOver={() => {
                      if (isTouchDevice) return;
                      setShowTooltip(true);
                    }}
                    onMouseLeave={() => {
                      if (isTouchDevice) return;
                      setShowTooltip(false);
                    }}
                    onClick={() => {
                      if (!isTouchDevice) return;
                      setShowTooltip(!showTooltip);
                    }}
                  >
                    <Icon
                      name="info_m"
                      size={16}
                      color="--icon-input-danger-primary-default"
                      style={{ cursor: 'pointer' }}
                    />
                  </div>

                  {showTooltip &&
                    (transactionLimit >= -1 || weeklyLimit >= -1) && (
                      <Tooltip>
                        {transactionLimit !== -1 && (
                          <Stack
                            fullWidth
                            align="center"
                            justify="space-between"
                          >
                            <TSpan
                              colorToken="--text-tooltip-neutral-alt-default"
                              font="body-m"
                            >
                              Transaction Limit
                            </TSpan>
                            <TSpan
                              font="body-m"
                              colorToken="--text-tooltip-neutral-alt-default"
                            >
                              {convertToCurrency(
                                transactionLimit,
                                AllCurrencyEnum.Usd,
                                2,
                              )}
                            </TSpan>
                          </Stack>
                        )}
                        {weeklyLimit !== -1 && (
                          <Stack
                            fullWidth
                            align="center"
                            justify="space-between"
                          >
                            <TSpan
                              colorToken="--text-tooltip-neutral-alt-default"
                              font="body-m"
                            >
                              Weekly Limit
                            </TSpan>
                            <TSpan
                              colorToken="--text-tooltip-neutral-alt-default"
                              font="body-m"
                            >
                              {convertToCurrency(
                                weeklyLimit,
                                AllCurrencyEnum.Usd,
                                2,
                              )}
                            </TSpan>
                          </Stack>
                        )}
                      </Tooltip>
                    )}
                </Stack>
                <Stack style={{ position: 'relative' }} justify="space-between">
                  <TSpan
                    colorToken="--text-input-danger-primary-default"
                    font="footnote"
                  >
                    Please contact{' '}
                    <TSpan
                      colorToken="--text-input-danger-primary-default"
                      font="link-s"
                      cursor="pointer"
                      onClick={() => {
                        window.open('mailto:support@noumena.pro', '_blank');
                      }}
                    >
                      support@noumena.pro
                    </TSpan>{' '}
                    for any inquiries.
                  </TSpan>
                </Stack>
              </>
            )}
          </Stack>
          {showBalanceLable && (
            <Label
              font="body-l"
              colorToken="--text-input-neutral-default"
              style={{
                textAlign: 'center',
                fontSize: 'var(--font-link-small-size)',
              }}
            >
              {t('noumena.balance', {
                amount: `${amount}`,
              })}
            </Label>
          )}
          <Spacer height={24} />
          <TextField
            label={t('noumena.money.payment.description.lable')}
            {...register('transactionReason', {
              required: { value: true, message: t('noumena.input.not_empty') },
              maxLength: {
                value: 255,
                message: t('noumena.money.description.input.length.error'),
              },
              validate: {
                validDescription: (v) => validateDescription(v),
              },
            })}
            value={getValues('transactionReason')}
            error={!!errors.transactionReason}
            helperText={errors.transactionReason?.message as string}
          />
          {/* {typeof source !== 'string' && (
          <Dropdown
            expandingDrillDown
            containerWidth="400px"
            options={generatedSpeedList}
            placement="bottom-start"
            onSelectOption={(option) => {
              setValue(
                'settlementPeriod',
                option.value as SettlementPeriodEnum,
              );
            }}
            onClose={() => setOpne(false)}
            onOpen={() => setOpne(true)}
            hideIcons
          >
            {({ inputProps, inputRef, toggle }) => (
              <TextField
                readOnly
                {...register('settlementPeriod', {
                  required: {
                    value: true,
                    message: t('noumena.input.not_empty'),
                  },
                })}
                data-testid="step-one-address"
                label={t('noumena.money.payment.speed.lable')}
                {...inputProps}
                ref={inputRef}
                value={getValues('settlementPeriod')}
                error={!!errors.settlementPeriod}
                helperText={errors.settlementPeriod?.message as string}
                rightIcon={
                  <RightIcon
                    name="chevron_down_m"
                    isOpen={open}
                    size={16}
                    onClick={toggle}
                    data-testid="styledAddressDownArrow"
                  />
                }
              />
            )}
          </Dropdown>
        )} */}
        </ModalContent>
        <Footer gap={12} flexDirection={isMobile ? 'column' : 'row'}>
          <Button secondary size="full" onClick={handleBackwardsStateChange}>
            {t('noumena.go.back')}
          </Button>
          <Button
            primary
            size="full"
            type="submit"
            disabled={!isDirty || !isValid}
          >
            {t('noumena.continue')}
          </Button>
        </Footer>
      </form>
    </Fragment>
  );
};
export default PaymentDescription;
