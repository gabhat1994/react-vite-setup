import { useTranslation } from 'react-i18next';
import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { TSpan } from '@/components/Typography';
import { Button } from '@/components/Button';
import { PaymentStateContext } from '@/features/TransactionModal/contexts';
import { useContext } from 'react';
import { ComponentStates } from '@/features/TransactionModal/types';

const AccountNotFoundInPlaid = () => {
  const { t } = useTranslation();

  const { isMobile, setPaymentState, setModalSize, handleClose } =
    useContext(PaymentStateContext);

  const continueClick = () => {
    setPaymentState(ComponentStates.ADD_FUNDING_SOURCE_MICRODEPOSIT);
    setModalSize(ModalSize.M);
  };

  return (
    <>
      <ModalHeader isFullScreen={false} topPadding={0} maxTitleWidth={312}>
        {t(`noumena.money.money-detail.unable_to_connect_account`)}
      </ModalHeader>
      <ModalBody
        isFullScreen={false}
        gap={16}
        align={isMobile ? 'center' : 'flex-start'}
      >
        <TSpan
          font="body-l"
          colorToken="--text-modal-neutral-default"
          textAlign={isMobile ? 'center' : 'start'}
        >
          {t(
            `noumena.money.money-detail.unable_to_connect_account_sub_heading_1`,
          )}
        </TSpan>
        <TSpan
          font="body-l"
          colorToken="--text-modal-neutral-default"
          textAlign={isMobile ? 'center' : 'start'}
        >
          {t(
            `noumena.money.money-detail.unable_to_connect_account_sub_heading_2`,
          )}
        </TSpan>
      </ModalBody>
      <ModalFooter
        isFullScreen={false}
        gap={16}
        flexDirection={isMobile ? 'column' : 'row-reverse'}
      >
        <Button size="full" primary onClick={continueClick}>
          {t(`noumena.money.money-detail.Continue`)}
        </Button>
        <Button size="full" tertiary onClick={handleClose}>
          {t(`noumena.cancel`)}
        </Button>
      </ModalFooter>
    </>
  );
};

export default AccountNotFoundInPlaid;
