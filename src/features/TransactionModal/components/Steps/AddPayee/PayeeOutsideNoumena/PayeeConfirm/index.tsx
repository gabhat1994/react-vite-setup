import { type FC, useContext, Fragment } from 'react';
import { captureException } from '@sentry/react';
import { t } from 'i18next';
import { TSpan } from '@/components/Typography';
import { Button } from '@/components/Button';
import { Spacer, Stack } from '@/layout';
import { useToast } from '@/hooks';
import { useCreateCustomerPayeeMutation } from '@/apollo/graphql';
import { ComponentStates } from '@/features/TransactionModal/types';
import { Footer } from '@/features/TransactionModal/components/styles';
import { ModalBody } from '@/components/ExtendedModal';
import { PaymentStateContext } from '@/features/TransactionModal/contexts/PaymentStateContext';
import { PaymentDataContext } from '@/features/TransactionModal/contexts/PaymentDataContext';
import { EStates, type PayeeFormvalues } from '../types';

interface PayeeConfirmProps {
  handleNext: (state: EStates) => void | null;
  payee: PayeeFormvalues;
}

const PayeeConfirm: FC<PayeeConfirmProps> = ({
  payee: { name, routingNumber, accountNumber },
  handleNext,
}) => {
  const { setPaymentState, isMobile } = useContext(PaymentStateContext);
  const { refetchPaymentData } = useContext(PaymentDataContext);
  const { addToast } = useToast();
  const [createCustomerPayeeMutation, { loading }] =
    useCreateCustomerPayeeMutation({
      variables: {
        input: {
          name,
          routingNumber,
          accountNumber,
        },
      },
      onCompleted: ({ createCustomerPayee }) => {
        refetchPaymentData();
        addToast('success', 'none', `${createCustomerPayee?.message}`);
        setPaymentState(ComponentStates.PAYMENT_SELECT);
      },
      onError: (error) => {
        addToast('error', 'none', `${error.message}`);
        captureException(error, {
          tags: {
            section: 'createPaymentMutation',
          },
        });
      },
    });

  return (
    <Fragment>
      <ModalBody>
        <Stack vertical fullWidth align="center" justify="center">
          <Spacer height={29} />
          <TSpan
            font="body-l"
            colorToken="--text-modal-header-neutral-default"
            textAlign="center"
          >
            {t('noumena.money.payment.add.outside.noumena.confirmation')}
          </TSpan>
          <Spacer height={8} />
          <TSpan
            font="body-m"
            colorToken="--text-modal-neutral-default"
            textAlign="center"
          >
            {t(
              'noumena.money.payment.add.outside.noumena.confirmation.note.one',
            )}
          </TSpan>
          <Spacer height={29} />
          <TSpan
            font="body-m"
            colorToken="--text-modal-neutral-default"
            textAlign="center"
          >
            {t(
              'noumena.money.payment.add.outside.noumena.confirmation.note.two',
            )}
          </TSpan>
          <Spacer height={16} />
          <Stack fullWidth align="center" justify="space-between">
            <Stack vertical>
              <TSpan
                font="footnote"
                colorToken="--text-input-neutral-default"
                textAlign="center"
              >
                {t('noumena.money.addPayee.payee.name.label')}
              </TSpan>
              <TSpan
                font="body-m-bold"
                colorToken="--text-input-neutral-filled"
                textAlign="center"
              >
                {name}
              </TSpan>
            </Stack>
            <Stack vertical>
              <TSpan
                font="footnote"
                colorToken="--text-input-neutral-default"
                textAlign="center"
              >
                {t('noumena.money.addPayee.payee.routing_number.label')}
              </TSpan>
              <TSpan
                font="body-m-bold"
                colorToken="--text-input-neutral-filled"
                textAlign="center"
              >
                {routingNumber}
              </TSpan>
            </Stack>
            <Stack vertical>
              <TSpan
                font="footnote"
                colorToken="--text-input-neutral-default"
                textAlign="center"
              >
                {t('noumena.money.addPayee.payee.accounting_number.label')}
              </TSpan>
              <TSpan
                font="body-m-bold"
                colorToken="--text-input-neutral-filled"
                textAlign="center"
              >
                {accountNumber}
              </TSpan>
            </Stack>
          </Stack>
        </Stack>
      </ModalBody>
      <div style={{ width: '100%' }}>
        <Footer gap={12} flexDirection={isMobile ? 'column' : 'row'}>
          <Button
            secondary
            size="full"
            onClick={() => handleNext(EStates.PAYEE_DETAILS)}
          >
            {t('noumena.cancel')}
          </Button>
          <Button
            onClick={() => createCustomerPayeeMutation()}
            data-testid="add-payee-outside-noumena"
            primary
            size="full"
            type="submit"
            loading={loading}
            disabled={loading}
          >
            {t('noumena.money.payment.add.payee')}
          </Button>
        </Footer>
      </div>
    </Fragment>
  );
};

export default PayeeConfirm;
