import React from 'react';
import { Modal } from '@/components/ExtendedModal/Modal';
import { Stack } from '@/layout';
import { ModalBody, ModalSize } from '@/components/ExtendedModal';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { Spinner } from '@/components/Spinner';

type PaymentLoadingModalProps = {
  isOpenModal: boolean;
};
export const PaymentLoadingModal: React.FC<PaymentLoadingModalProps> = ({
  isOpenModal,
}) => {
  const { isMobile } = useBreakpoints();

  return (
    <Modal
      isFullScreen={isMobile}
      open={isOpenModal}
      size={ModalSize.S}
      isScrollableContent
      disableBackdropClick
    >
      <ModalBody>
        <Stack fixedHeight={150}>
          <Spinner />
        </Stack>
      </ModalBody>
    </Modal>
  );
};
