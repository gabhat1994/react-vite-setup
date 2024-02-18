import { type FC, useContext, useEffect, useState, Fragment } from 'react';
import { t } from 'i18next';
import { captureException } from '@sentry/react';
import { Button } from '@/components/Button';
import convertToCurrency from '@/utils/currencyToCurrency';
import { Spacer, Stack } from '@/layout';
import { TSpan } from '@/components/Typography';
import {
  useCheckWalletExistsQuery,
  useGetPaymentProviderChargesLazyQuery,
} from '@/apollo/graphql';
import { useLaunchDarkly, useToast } from '@/hooks';
import { AccountType, CurrencyEnum } from '@/apollo/generated/types';
import { ModalBody, ModalFooter } from '@/components/ExtendedModal';
import {
  getAccountId,
  isAccountPayeeItem,
  isCustomerPayeeItem,
} from '@/features/TransactionModal/helpers';
import { PaymentDataContext } from '@/features/TransactionModal/contexts/PaymentDataContext';
import { PaymentStateContext } from '@/features/TransactionModal/contexts/PaymentStateContext';
import { TransactionModalType } from '@/features/TransactionModal/types';
import {
  PaymentReviewDescription,
  ReviewCard,
  ReviewLabel,
  ReviewInformation,
} from '../../styles';

const PaymentReview: FC = () => {
  const { addToast } = useToast();
  const { flags } = useLaunchDarkly();
  const [transactionFee, setTransactionFee] = useState<number>(0);
  const [sourecDetails, setSourceDetails] = useState<string>('');
  const [destinationDetails, setDestinationDetails] = useState<string>('');
  const {
    transactions: { amount, settlementPeriod, transactionReason },
    source,
    destination,
    isStripeFlow,
    invoice,
    isSourceWalletExists,
  } = useContext(PaymentDataContext);
  const {
    handleForwardStateChange,
    handleBackwardsStateChange,
    type,
    isMobile,
  } = useContext(PaymentStateContext);

  const isSourceCard = source === 'PAY_BY_CARD';
  const isSourceBank = !isSourceCard && source.accountType === AccountType.Bank;
  const isSourceMainWallet =
    !isSourceCard &&
    source.accountType === AccountType.Wallet &&
    !source.chamberId;
  const isSourceSubWallet =
    !isSourceCard &&
    source.accountType === AccountType.Wallet &&
    Boolean(source.chamberId);
  const isCustomerPayee = isCustomerPayeeItem(destination);

  const isDestinationMainWallet =
    (isCustomerPayeeItem(destination) || isAccountPayeeItem(destination)) &&
    destination?.accountType === AccountType.Wallet &&
    !destination.chamberId;

  const isDestinationSubWalletLegacy =
    (isCustomerPayeeItem(destination) || isAccountPayeeItem(destination)) &&
    destination?.accountType === AccountType.Wallet &&
    Boolean(destination?.chamberId);

  const isDestinationSubWallet =
    (isCustomerPayeeItem(destination) || isAccountPayeeItem(destination)) &&
    destination?.accountType === AccountType.SubWallet;

  const isDestinationBankAccount =
    isAccountPayeeItem(destination) &&
    destination?.accountType === AccountType.Bank;

  const depositedAmount = `${convertToCurrency(
    Number(amount) - Number(transactionFee),
    CurrencyEnum.Usd,
    2,
  )}`;

  const { loading: checkWalletLoading, data } = useCheckWalletExistsQuery({
    fetchPolicy: 'network-only',
    skip: destination?.__typename !== 'AnswerOutput',
    variables: {
      targetUserId:
        destination?.__typename === 'AnswerOutput'
          ? destination.user?._id!
          : '',
    },
  });

  useEffect(() => {
    if (isSourceBank) {
      setSourceDetails(`${source.accountName}****${source.maskAccountNumber}`);
    } else if (isSourceMainWallet) {
      const details =
        type === TransactionModalType.TRANSFER
          ? t('noumena.container.close_subwallet.mainwallet')
          : type === TransactionModalType.PAY
          ? source.customerName
          : '';
      setSourceDetails(details || '');
    } else if (isSourceSubWallet) {
      setSourceDetails(source.walletName || '');
    } else if (isSourceCard) {
      setSourceDetails('Card');
    }
  }, [
    isSourceBank,
    isSourceMainWallet,
    isSourceSubWallet,
    source,
    isSourceCard,
    type,
  ]);

  useEffect(() => {
    if (isCustomerPayee) {
      setDestinationDetails(destination.customerName);
    } else if (isDestinationMainWallet) {
      setDestinationDetails(t('noumena.container.close_subwallet.mainwallet'));
    } else if (isDestinationSubWallet || isDestinationSubWalletLegacy) {
      setDestinationDetails(destination.walletName || '');
    } else if (isDestinationBankAccount) {
      setDestinationDetails(
        `${destination.accountName}****${destination.maskAccountNumber}`,
      );
    }
  }, [
    destination,
    isCustomerPayee,
    isDestinationBankAccount,
    isDestinationMainWallet,
    isDestinationSubWallet,
    isDestinationSubWalletLegacy,
  ]);

  const [getPaymentProviderCharges, { loading: getFeeLoading }] =
    useGetPaymentProviderChargesLazyQuery({
      fetchPolicy: 'network-only',
      onCompleted: (result) => {
        setTransactionFee(result?.getPaymentProviderCharges?.charges || 0);
      },
      onError: (error) => {
        addToast('error', 'none', `${error.message}`);
        captureException(error, {
          tags: {
            section: 'getTransactionFeesForPayments',
          },
        });
      },
    });
  useEffect(() => {
    if (!isSourceWalletExists) return;
    if (type === TransactionModalType.TIP && checkWalletLoading) return;
    getPaymentProviderCharges({
      variables: {
        query: {
          amount: Number(amount),
          enableNoumFees: flags.paymentSubscriptions,
          settlementPeriod,
          invoicePayment: !!invoice?.id,
          sourceAccountId: isStripeFlow
            ? 'CARD'
            : !isSourceCard && source?.id
            ? source?.id
            : '',
          destinationAccountId:
            type === TransactionModalType.TIP
              ? data?.checkWalletExists?.targetId!
              : getAccountId(type, destination),
        },
      },
    });
  }, [
    amount,
    checkWalletLoading,
    data?.checkWalletExists?.targetId,
    destination,
    flags.paymentSubscriptions,
    getPaymentProviderCharges,
    isSourceCard,
    isStripeFlow,
    isSourceWalletExists,
    settlementPeriod,
    source,
    type,
    invoice?.id,
  ]);
  const loading = getFeeLoading || checkWalletLoading;
  const showFeesInformation = !!transactionFee && !getFeeLoading;
  return (
    <>
      <ModalBody>
        <Stack fullWidth vertical justify="center" align="center">
          <TSpan font="body-l" colorToken="--text-input-neutral-default">
            {t('noumena.money.payment.amount')}
          </TSpan>

          <Spacer height={8} />
          <TSpan font="heading-xxl" colorToken="--text-input-neutral-filled">
            {convertToCurrency(Number(amount), CurrencyEnum.Usd, 2)}
          </TSpan>
          {type === TransactionModalType.TIP ? (
            <>
              <TSpan font="footnote" colorToken="--text-input-neutral-default">
                {t('noumena.money.payment.transfer.fee', {
                  feeString: loading
                    ? t('noumena.loading')
                    : convertToCurrency(
                        Number(transactionFee),
                        CurrencyEnum.Usd,
                        2,
                      ),
                })}
              </TSpan>
              <Spacer height={44} />
              <TSpan font="footnote" colorToken="--text-input-neutral-default">
                {t('noumena.description.text')}
              </TSpan>
              <TSpan
                font="body-m-bold"
                colorToken="--text-input-neutral-filled"
              >
                {transactionReason}
              </TSpan>
              <Spacer height={16} />
            </>
          ) : (
            <PaymentReviewDescription>
              <Spacer height={44} />
              <ReviewCard>
                <ReviewLabel
                  font="footnote"
                  colorToken="--text-input-neutral-default"
                >
                  {t('noumena.uc_from')}
                </ReviewLabel>
                <ReviewInformation
                  font="body-m-bold"
                  colorToken="--text-input-neutral-filled"
                >
                  {sourecDetails}
                </ReviewInformation>
              </ReviewCard>
              <ReviewCard>
                <ReviewLabel
                  font="footnote"
                  colorToken="--text-input-neutral-default"
                >
                  {t('noumena.uc_to')}
                </ReviewLabel>
                <ReviewInformation
                  font="body-m-bold"
                  colorToken="--text-input-neutral-filled"
                >
                  {destinationDetails}
                </ReviewInformation>
              </ReviewCard>
              <ReviewCard>
                <ReviewLabel
                  font="footnote"
                  colorToken="--text-input-neutral-default"
                >
                  {t('noumena.description.text')}
                </ReviewLabel>
                <ReviewInformation
                  font="body-m-bold"
                  colorToken="--text-input-neutral-filled"
                >
                  {transactionReason}
                </ReviewInformation>
              </ReviewCard>
              {!invoice?.id && showFeesInformation ? (
                <>
                  <ReviewCard>
                    <ReviewLabel
                      font="footnote"
                      colorToken="--text-input-neutral-default"
                    >
                      {t('noumena.money.payment.fees')}
                    </ReviewLabel>
                    <ReviewInformation
                      font="body-m-bold"
                      colorToken="--text-input-neutral-filled"
                    >
                      {loading
                        ? t('noumena.loading')
                        : convertToCurrency(
                            Number(transactionFee),
                            CurrencyEnum.Usd,
                            2,
                          )}
                    </ReviewInformation>
                  </ReviewCard>
                  <ReviewCard>
                    <ReviewLabel
                      font="footnote"
                      colorToken="--text-input-neutral-default"
                    >
                      {t('noumena.money.payment.net_amount')}
                    </ReviewLabel>
                    <ReviewInformation
                      font="body-m-bold"
                      colorToken="--text-input-neutral-filled"
                    >
                      {loading
                        ? t('noumena.money.payment.calculating')
                        : depositedAmount}
                    </ReviewInformation>
                  </ReviewCard>
                </>
              ) : null}
            </PaymentReviewDescription>
          )}
        </Stack>
      </ModalBody>
      <ModalFooter gap={12} flexDirection={isMobile ? 'column' : 'row'}>
        <Button secondary size="full" onClick={handleBackwardsStateChange}>
          {t('noumena.go.back')}
        </Button>
        <Button
          primary
          size="full"
          type="submit"
          onClick={handleForwardStateChange}
          loading={loading}
          disabled={loading}
        >
          {t('noumena.continue')}
        </Button>
      </ModalFooter>
    </>
  );
};
export default PaymentReview;
