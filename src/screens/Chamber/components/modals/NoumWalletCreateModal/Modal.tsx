import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/Button';
import { TSpan } from '@/components/Typography';
import * as ModalComponent from '@/components/ExtendedModal';
import { ElementTypeEnum } from '@/apollo/generated/types';

interface NoumWalletCreateModalProps {
  isOpen: boolean;
  handleClose: (isSuccess?: boolean) => void;
  handleSelectElementType?: (type: ElementTypeEnum) => void;
}

export const NoumWalletCreateModal = memo(
  (props: NoumWalletCreateModalProps) => {
    const { t } = useTranslation();
    const [noumWalletCreated, setNoumWalletCreated] = useState<boolean>(false);
    const handleDelete = useCallback(async () => {
      props.handleClose();
    }, [props]);

    const handleWalletElementCreation = useCallback(async () => {
      if (props.handleSelectElementType) {
        props?.handleSelectElementType(
          ElementTypeEnum.Wallet as ElementTypeEnum,
        );
        props.handleClose();
      }
    }, [props]);

    const handleCreateWallet = useCallback(async () => {
      setNoumWalletCreated(true);
    }, []);

    return (
      <ModalComponent.Modal
        size={ModalComponent.ModalSize.S}
        testId="testCloseWallet"
        open={props.isOpen}
        onClose={props.handleClose}
        disableBackdropClick={true}
      >
        <ModalComponent.ModalHeader>
          {noumWalletCreated
            ? t(`noumena.container.created_subWallet.title`)
            : t(`noumena.container.create_subWallet.title`)}
        </ModalComponent.ModalHeader>
        <ModalComponent.ModalBody hideScrollbar>
          <TSpan
            colorToken="--text-modal-neutral-default"
            font="body-l"
            style={{ width: '279px' }}
            textAlign="center"
          >
            {noumWalletCreated
              ? t(`noumena.container.created_subWallet.text`)
              : t(`noumena.container.create_subWallet.text`)}
          </TSpan>
        </ModalComponent.ModalBody>
        <ModalComponent.ModalFooter flexDirection="column" gap={16}>
          {noumWalletCreated ? (
            <Button
              data-testid="confirmCloseWallet"
              primary
              size="full"
              id="confirm_create_wallet_button"
              onClick={() => handleWalletElementCreation()}
            >
              {t(`noumena.container.close_subwallet.close`)}
            </Button>
          ) : (
            <>
              <Button
                data-testid="continueButton"
                primary
                size="full"
                id="create_wallet_button"
                onClick={handleCreateWallet}
              >
                {t(`noumena.container.close_subwallet.Continue`)}
              </Button>
              <Button
                data-testid="cancelButton"
                tertiary
                size="full"
                onClick={() => handleDelete()}
              >
                {t(`noumena.container.close_subwallet.Cancel`)}
              </Button>
            </>
          )}
        </ModalComponent.ModalFooter>
      </ModalComponent.Modal>
    );
  },
);

export default NoumWalletCreateModal;
