import {
  type FC,
  useState,
  useContext,
  useRef,
  useEffect,
  useCallback,
  Fragment,
} from 'react';
import { useNavigate } from 'react-router';
import { captureException } from '@sentry/react';
import { t } from 'i18next';
import { v4 as uuidv4 } from 'uuid';
import ROUTES from '@/constants/routes';
import { Button } from '@/components/Button';
import { Spacer, Stack } from '@/layout';
import { TSpan } from '@/components/Typography';
import { Checkbox } from '@/components/Checkbox';
import { Icon } from '@/components/Icon';

import {
  useCreatePaymentMutation,
  useInitiateTipForAnswerMutation,
  useRaiseInvoicePaymentMutation,
} from '@/apollo/graphql';
import {
  CurrencyEnum,
  PaymentStatusEnum,
  RequestOriginator,
  RequestOriginatorsEnum,
  TransactionTypeEnum,
} from '@/apollo/generated/types';
import { useHandleNonNoumenaMemberPayment } from '@/features/money/hooks';
import { useAuth } from '@/features/auth/contexts';
import { useLaunchDarkly, useToast } from '@/hooks';
import { Spinner } from '@/components/Spinner';
import { OtpInput } from '@/components/Otp/OtpInput';
import { getAccountId } from '@/features/TransactionModal/helpers';

import { useCampaignPayment } from '@/screens/Campaigns/hooks/useCampaignPayment';
import { PaymentDataContext } from '@/features/TransactionModal/contexts/PaymentDataContext';
import { PaymentStateContext } from '@/features/TransactionModal/contexts/PaymentStateContext';
import {
  ComponentStates,
  TransactionModalType,
} from '@/features/TransactionModal/types';
import FallbackContent from './style';
import { PIN_CODE_LENGTH } from './types';
import { Footer, ModalContent } from '../../styles';

const PaymentConfirm: FC = () => {
  const navigateTo = useNavigate();
  const { flags } = useLaunchDarkly();
  const [createPaymentMutation, { loading: createPaymentLoading }] =
    useCreatePaymentMutation();
  const [tipForAnswerMutation, { loading: tipLoading }] =
    useInitiateTipForAnswerMutation();
  const { isNonNoumenaMemberConnected, loading: nonNoumenaMemberLoading } =
    useHandleNonNoumenaMemberPayment();

  const [raiseInvoicePaymentMutation, { loading: raiseIvoiceLoading }] =
    useRaiseInvoicePaymentMutation();

  const { mapPaymentAgainstCampaign } = useCampaignPayment();

  const { addToast } = useToast();
  const { isUnregistered, isUnauthenticated } = useAuth();
  const loading =
    createPaymentLoading ||
    nonNoumenaMemberLoading ||
    tipLoading ||
    raiseIvoiceLoading;

  const isNotActiveUser = isUnauthenticated || isUnregistered;

  const [pin, setPin] = useState<string | undefined>('');

  const {
    source,
    destination,
    setClientSecret,
    isStripeFlow,
    transactions,
    setPaymentStatus,
    invoice,
    offerId,
    campaignId,
    setPaymentRef,
    campaignRepayment,
  } = useContext(PaymentDataContext);
  const {
    setPaymentState,
    handleForwardStateChange,
    handleBackwardsStateChange,
    type,
    isMobile,
  } = useContext(PaymentStateContext);

  const [saveCard, setSaveCard] = useState(() => !!isStripeFlow);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (pin?.length === PIN_CODE_LENGTH) {
      buttonRef.current?.focus();
    } else {
      buttonRef.current?.blur();
    }
  }, [pin]);

  const handlePayment = useCallback(async () => {
    if (type === TransactionModalType.TIP) {
      tipForAnswerMutation({
        variables: {
          input: {
            amount: Number(transactions.amount),
            answerId:
              destination?.__typename === 'AnswerOutput'
                ? destination._id!
                : '',
            currency: CurrencyEnum.Usd,
            passCode: isNotActiveUser && isStripeFlow ? '000000' : pin!,
            requestOriginator: RequestOriginator.NoumenaWeb,
            description: transactions.transactionReason,
          },
        },
        onCompleted: () => {
          handleForwardStateChange();
        },
        onError: (error) => {
          if (isNotActiveUser && isStripeFlow) {
            setPaymentState(ComponentStates.PAYMENT_REVIEW);
          }
          addToast('error', 'icon', `${error.message}`);
          captureException(error, {
            tags: {
              section: 'tipForAnswerMutation',
            },
          });
        },
      });
    } else {
      const sourceAccountId = isStripeFlow
        ? 'CARD'
        : typeof source !== 'string' && source?.id
        ? source?.id
        : '';

      if (invoice?.id) {
        raiseInvoicePaymentMutation({
          variables: {
            input: {
              invoiceId: invoice.id,
              amount: Number(transactions.amount),
              requestOriginator: RequestOriginator.NoumenaWeb,
              sourceAccountId,
              passCode: isNotActiveUser && isStripeFlow ? '000000' : pin!,
              destinationAccountId: getAccountId(type, destination),
            },
          },
          onCompleted(data) {
            if (data?.raiseInvoicePayment?.clientSecret) {
              setClientSecret(data.raiseInvoicePayment.clientSecret);
              setPaymentState(ComponentStates.PAYMENT_STRIPE);
            } else {
              setPaymentStatus(PaymentStatusEnum.AwaitingProcessing);
              handleForwardStateChange();
            }
          },
          onError: (error) => {
            if (isNotActiveUser && isStripeFlow) {
              setPaymentState(ComponentStates.PAYMENT_REVIEW);
            }
            addToast('error', 'icon', `${error.message}`);
            captureException(error, {
              tags: {
                section: 'createPaymentMutation',
              },
            });
          },
        });

        return;
      }
      createPaymentMutation({
        variables: {
          input: {
            amount: Number(transactions.amount),
            currency: CurrencyEnum.Usd,
            destinationAccountId: getAccountId(type, destination),
            settlementPeriod: transactions.settlementPeriod,
            idempotencyKey: uuidv4(),
            transactionType: TransactionTypeEnum.Withdrawl,
            sourceAccountId,
            tenantId: '7837cbec-4fe9-4623-ae36-f6aed439c8b6',
            requestOriginator: RequestOriginatorsEnum.NoumenaWeb,
            passCode: isNotActiveUser && isStripeFlow ? '000000' : pin!,
            transactionReason: transactions.transactionReason,
            // @ts-ignore @TODO: figure out why it's missing
            enableNoumFees: flags.paymentSubscriptions,
            enableTransactionLimit: true,
            saveCard,
          },
        },
        onCompleted: async ({ createPayment }) => {
          if (createPayment?.clientSecret && setClientSecret) {
            setClientSecret(createPayment?.clientSecret);
            setPaymentState(ComponentStates.PAYMENT_STRIPE);
            if (offerId && campaignId && createPayment?.id) {
              setPaymentRef(createPayment.id);
            }
          } else {
            if (offerId && campaignId && createPayment?.id) {
              const { error } = await mapPaymentAgainstCampaign({
                offerId,
                campaignId,
                paymentRef: createPayment.id,
                campaignRepayment: !!campaignRepayment,
              });
              if (error) {
                return;
              }
            }
            setPaymentStatus(createPayment?.paymentStatus || '');
            handleForwardStateChange();
          }
        },
        onError: (error) => {
          if (isNotActiveUser && isStripeFlow) {
            setPaymentState(ComponentStates.PAYMENT_REVIEW);
          }
          addToast('error', 'icon', `${error.message}`);
          captureException(error, {
            tags: {
              section: 'createPaymentMutation',
            },
          });
        },
      });
    }
  }, [
    addToast,
    campaignId,
    campaignRepayment,
    createPaymentMutation,
    destination,
    flags.paymentSubscriptions,
    handleForwardStateChange,
    invoice,
    isNotActiveUser,
    isStripeFlow,
    mapPaymentAgainstCampaign,
    offerId,
    pin,
    raiseInvoicePaymentMutation,
    saveCard,
    setClientSecret,
    setPaymentRef,
    setPaymentState,
    setPaymentStatus,
    source,
    tipForAnswerMutation,
    transactions.amount,
    transactions.settlementPeriod,
    transactions.transactionReason,
    type,
  ]);

  const handleNonNoumenaMemberPayment = useCallback(async () => {
    const chamberId =
      destination && 'chamberId' in destination ? destination?.chamberId : null;

    // it means that payment is related to the invoice and chamberId is linked on the BE side
    if (!chamberId) {
      handlePayment();
      return;
    }

    const { isConnectedToNoum, error } = await isNonNoumenaMemberConnected({
      chamberId,
    });
    if (!error && isConnectedToNoum) {
      handlePayment();
      return;
    }
    if (!error && !isConnectedToNoum) {
      addToast(
        'error',
        'icon',
        'Payment is not allowed. You are not connected to the Noum',
      );
      setPaymentState(ComponentStates.PAYMENT_REVIEW);
      return;
    }
    if (error) {
      addToast('error', 'icon', `${error.message}`);
      navigateTo(ROUTES.GUEST_HOME);
    }
  }, [
    addToast,
    destination,
    handlePayment,
    isNonNoumenaMemberConnected,
    navigateTo,
    setPaymentState,
  ]);

  useEffect(() => {
    if (isStripeFlow) {
      if (isUnauthenticated) {
        handlePayment();
      } else if (isUnregistered) {
        handleNonNoumenaMemberPayment();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleForgotPin = useCallback(() => {
    setPaymentState(ComponentStates.PAYMENT_FORGOT_PIN);
  }, [setPaymentState]);

  if (isNotActiveUser && loading) {
    return (
      <FallbackContent>
        <Spinner />
      </FallbackContent>
    );
  }

  return (
    <Fragment>
      <ModalContent>
        <Stack fullWidth vertical justify="center" align="center">
          <TSpan font="body-l" colorToken="--text-body-neutral-default">
            {t('noumena.money.enter_your_pin_code')}
          </TSpan>
          <Spacer height={24} />
          <OtpInput
            width="44px"
            value={pin}
            onChange={(val) => setPin(val)}
            numInputs={6}
            dataTestId="pin-code"
            launchFrom="PaymentModal"
            isInputPassword={true}
          />
          <Spacer height={24} />
          <TSpan
            style={{ cursor: 'pointer' }}
            font="button-m"
            colorToken="--text-button-brand-primary-default"
            onClick={handleForgotPin}
          >
            {t('noumena.money.forgot_your_pin_code')}
          </TSpan>
          <Spacer height={100} />
          {isStripeFlow && (
            <Stack
              gap={10}
              justify="flex-start"
              fullWidth
              style={{ display: 'none' }}
            >
              <Checkbox
                data-testid="check-box-one"
                isChecked={saveCard}
                onChange={(val) => setSaveCard(val)}
                icon={
                  <Icon
                    name="tick_m"
                    size={23.5}
                    color="--icon-checkbox-neutral-alt-default"
                  />
                }
              />
              <TSpan colorToken="--text-body-header-neutral-default">
                {' '}
                {t('noumena.money.save_card_future')}
              </TSpan>
            </Stack>
          )}
        </Stack>
      </ModalContent>
      <Footer gap={12} flexDirection={isMobile ? 'column' : 'row'}>
        <Button secondary size="full" onClick={handleBackwardsStateChange}>
          {t('noumena.go.back')}
        </Button>
        <Button
          ref={buttonRef}
          primary
          size="full"
          type="submit"
          loading={loading}
          disabled={!(pin?.length === PIN_CODE_LENGTH)}
          onClick={handlePayment}
          style={{
            outline: 'none',
          }}
        >
          {t('noumena.continue')}
        </Button>
      </Footer>
    </Fragment>
  );
};
export default PaymentConfirm;
