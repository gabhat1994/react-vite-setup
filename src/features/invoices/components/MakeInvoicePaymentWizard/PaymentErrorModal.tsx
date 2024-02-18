import React from 'react';
import { Modal } from '@/components/ExtendedModal/Modal';
import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { Button } from '@/components/Button';
import { TSpan } from '@/components/Typography';
import { Stack } from '@/layout';

type PaymentErrorModalProps = {
  isOpenModal: boolean;
  serviceProviderName: string;
  onClose: () => void;
};
export const PaymentErrorModal: React.FC<PaymentErrorModalProps> = ({
  isOpenModal,
  onClose,
  serviceProviderName,
}) => {
  const { isMobile } = useBreakpoints();

  return (
    <Modal
      isFullScreen={isMobile}
      open={isOpenModal}
      size={ModalSize.S}
      onClose={onClose}
      disableBackdropClick
    >
      <ModalHeader
        justifyContent="center"
        maxTitleWidth={250}
        isFullScreen={isMobile}
      >
        Payment to wallet unavailable
      </ModalHeader>
      <ModalBody isFullScreen={isMobile}>
        <TSpan
          textAlign="center"
          font="body-l"
          colorToken="--text-modal-neutral-default"
        >
          {`We are unable to process your payment to ${serviceProviderName} because
          they do not have a wallet set up. We've let them know you had this
          issue and we recommend you get in touch with them too.`}
        </TSpan>
      </ModalBody>
      <ModalFooter isFullScreen={isMobile}>
        <Stack fullWidth>
          <Button grow onClick={onClose} tertiary>
            Cancel
          </Button>
        </Stack>
      </ModalFooter>
    </Modal>
  );
};
