import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/Button';
import { TSpan } from '@/components/Typography';
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalSize,
} from '@/components/ExtendedModal';

interface NonZeroWalletModalProps {
  isOpen: boolean;
  handleClose: (isSuccess?: boolean) => void;
}

export const NonZeroWalletModal = memo((props: NonZeroWalletModalProps) => {
  const { t } = useTranslation();

  const handleDelete = useCallback(async () => {
    props.handleClose();
  }, [props]);

  return (
    <Modal
      size={ModalSize.S}
      testId="testCloseWallet"
      open={props.isOpen}
      onClose={props.handleClose}
      disableBackdropClick={true}
    >
      <ModalHeader>{t(`noumena.container.close_subWallet.title`)}</ModalHeader>

      <TSpan colorToken="--text-modal-neutral-default" font="body-l">
        {t(`noumena.container.close_subwallet.nonZeroWalletBalanceTest`)}
      </TSpan>
      <ModalFooter>
        <Button
          data-testid="confirmCloseWallet"
          primary
          size="full"
          onClick={() => handleDelete()}
        >
          {t(`noumena.container.close_subwallet.Ok`)}
        </Button>
      </ModalFooter>
    </Modal>
  );
});

export default NonZeroWalletModal;
