import { Fragment, useContext } from 'react';
import { t } from 'i18next';
import { TSpan } from '@/components/Typography';
import { Spacer, Stack } from '@/layout';
import DoneLogo from '@/assets/images/done.svg';
import { Button } from '@/components/Button';
import { ModalHeader } from '@/components/ExtendedModal';
import { PaymentStateContext } from '@/features/TransactionModal/contexts/PaymentStateContext';
import { ComponentStates } from '../../../types';
import { ModalContent, Footer } from '../../styles';

const Done = () => {
  const { setPaymentState, isMobile } = useContext(PaymentStateContext);
  return (
    <Fragment>
      <ModalHeader isFullScreen={isMobile}>
        {t('noumena.money.forgotpin.done.heading')}
      </ModalHeader>
      <ModalContent isFullScreen={isMobile}>
        <Stack vertical fullWidth align="center" justify="center">
          <Spacer height={21} />
          <TSpan font="body-l" colorToken="--text-modal-neutral-default">
            {t('noumena.money.forgotpin.done.new_pin_setup_done')}
          </TSpan>
          <Spacer height={40} />
          <img src={DoneLogo} alt="done" />
          <Spacer height={110} />
        </Stack>
      </ModalContent>
      <Footer isFullScreen={isMobile}>
        <Button
          primary
          size="full"
          onClick={() => setPaymentState(ComponentStates.PAYMENT_CONFIRM)}
        >
          {t('noumena.close')}
        </Button>
      </Footer>
    </Fragment>
  );
};

export default Done;
