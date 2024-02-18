import { type FC, type SyntheticEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { type PaymentIntentResult } from '@stripe/stripe-js';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

import { t } from 'i18next';

import { Spacer } from '@/layout';
import { Button } from '@/components/Button';
import ROUTES from '@/constants/routes';
import { useSaveCardStripeMutation } from '@/apollo/graphql';
import { useAuth } from '@/features/auth/contexts';
import { useError } from '@/hooks';
import { useHandleNonNoumenaMemberPayment } from '@/features/money/hooks';

import { useCampaignPayment } from '@/screens/Campaigns/hooks/useCampaignPayment';
import { ComponentStates, PaymentStatuses } from '../../types';
import { PaymentDataContext } from '../../contexts/PaymentDataContext';
import { PaymentStateContext } from '../../contexts/PaymentStateContext';

const Form: FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigateTo = useNavigate();
  const logger = useError();
  const { isUnregistered, isUnauthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const { setPaymentState } = useContext(PaymentStateContext);

  const {
    setPaymentStatus,
    destination,
    setTransactionCradDetails,
    campaignId,
    offerId,
    paymentRef,
    campaignRepayment,
  } = useContext(PaymentDataContext);

  const initiatePaymentMapping = offerId && campaignId && paymentRef;

  const { isNonNoumenaMemberConnected } = useHandleNonNoumenaMemberPayment();

  const { mapPaymentAgainstCampaign } = useCampaignPayment();

  const handleSuccess = () => {
    setPaymentStatus(PaymentStatuses.WAITING_PROCESSING);
    setPaymentState(ComponentStates.PAYMENT_DONE);
  };

  const [saveCardStripeMutation] = useSaveCardStripeMutation({
    onCompleted: ({ saveCardStripe }) => {
      const brand = saveCardStripe?.brand || null;
      const last4 = saveCardStripe?.last4 || null;
      if (setTransactionCradDetails) {
        setTransactionCradDetails({ brand, last4 });
      }
      handleSuccess();
    },
    onError: (error) => {
      logger.logError(error, 'stripeSaveCard', true);
    },
  });

  const handleAction = async (data: PaymentIntentResult) => {
    try {
      if (!data.paymentIntent?.client_secret) return;
      await stripe?.handleCardAction(data.paymentIntent.client_secret);

      // This means it is campaign related payment
      if (initiatePaymentMapping) {
        const { error } = await mapPaymentAgainstCampaign({
          offerId,
          campaignId,
          paymentRef,
          campaignRepayment: !!campaignRepayment,
        });

        if (error) {
          return;
        }
      }
      handleSuccess();
    } catch (error) {
      logger.logError(error, 'stripeNextAction', true);
    }
  };

  const handlePayment = async () => {
    if (!stripe || !elements) return;
    try {
      const data = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
        confirmParams: {
          return_url: 'https://noumena-web.web.app/money',
        },
      });

      const paymentSuccess = data.paymentIntent?.status === 'succeeded';
      const actionRequired = data.paymentIntent?.status === 'requires_action';

      if (actionRequired) {
        handleAction(data);
        return;
      }

      if (paymentSuccess && isUnauthenticated) {
        handleSuccess();
        return;
      }

      if (paymentSuccess && initiatePaymentMapping) {
        const { error } = await mapPaymentAgainstCampaign({
          offerId,
          campaignId,
          paymentRef,
          campaignRepayment: !!campaignRepayment,
        });

        if (error) {
          logger.logError(error, 'stripePaymentByCard', true);
          return;
        }
      }

      saveCardStripeMutation({
        variables: {
          paymentId: data?.paymentIntent?.id ?? '',
        },
      });
    } catch (error) {
      logger.logError(error, 'stripePaymentByCard', true);
    }
    setLoading(false);
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    setLoading(true);

    const chamberId =
      destination && 'chamberId' in destination
        ? destination?.chamberId || ''
        : '';

    if (isUnregistered && chamberId) {
      const { isConnectedToNoum, error } = await isNonNoumenaMemberConnected({
        chamberId,
      });
      if (!error && isConnectedToNoum) {
        handlePayment();
        return;
      }
      if (!error && !isConnectedToNoum) {
        logger.logError(
          error,
          'Payment is not allowed. You are not connected to the Noum',
          true,
        );
        setLoading(false);

        navigateTo(ROUTES.GUEST_HOME);
        return;
      }
      if (error) {
        setLoading(false);
        logger.logError(error, 'stripePaymentByCard', true);
        navigateTo(ROUTES.GUEST_HOME);
      }
      return;
    }
    handlePayment();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <PaymentElement onReady={() => setDisableButton(false)} />
        <Spacer height={20} />
        <Button
          primary
          loading={loading}
          type="submit"
          size="full"
          disabled={disableButton || loading}
        >
          {t('noumena.continue')}
        </Button>
      </form>
    </div>
  );
};

export default Form;
