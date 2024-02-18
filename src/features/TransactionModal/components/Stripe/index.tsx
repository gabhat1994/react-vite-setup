import { type FC, useContext, useMemo } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { type Appearance } from '@stripe/stripe-js';
import { StripeContext } from '@/providers';
import Form from './Form';
import { PaymentDataContext } from '../../contexts/PaymentDataContext';

const Stripe: FC = () => {
  const { stripeInstance } = useContext(StripeContext);
  const { clientSecret } = useContext(PaymentDataContext);
  const styles = getComputedStyle(document.body);

  const appearance: Appearance = useMemo(
    () => ({
      theme: 'none',
      rules: {
        '.Input': {
          color: styles.getPropertyValue('--text-input-neutral-filled'),
          backgroundColor: styles.getPropertyValue(
            '--bg-input-neutral-default',
          ),
          fontFamily: styles.getPropertyValue(
            '--font-input-medium-regular-font',
          ),
        },
        '.Label': {
          color: styles.getPropertyValue('--text-input-neutral-default'),
          fontFamily: styles.getPropertyValue('--font-footnote-regular-font'),
        },
        '.Error': {
          color: styles.getPropertyValue('--text-input-danger-primary-default'),
          fontFamily: styles.getPropertyValue('--font-footnote-regular-font'),
        },

        '.TermsText': {
          color: styles.getPropertyValue(
            '--text-tablecell-body-neutral-default',
          ),
          fontFamily: styles.getPropertyValue('--font-footnote-regular-font'),
        },
      },
    }),
    [styles],
  );

  const options = useMemo(
    () => ({
      clientSecret,
      appearance,
    }),
    [appearance, clientSecret],
  );

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {clientSecret.length ? (
        <Elements stripe={stripeInstance} options={options}>
          <Form />
        </Elements>
      ) : null}
    </div>
  );
};

export default Stripe;
