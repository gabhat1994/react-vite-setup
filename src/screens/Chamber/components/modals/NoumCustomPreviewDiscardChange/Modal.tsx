import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/Button';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { TSpan } from '@/components/Typography';

interface NoumCustomPreviewDiscardChangeProps {
  spaceId: string;
  isOpen: boolean;
  handleClose: (isSuccess?: boolean) => void;
}

export const NoumCustomPreviewDiscardChange = memo(
  (props: NoumCustomPreviewDiscardChangeProps) => {
    const { t } = useTranslation();
    const handleConfirm = async () => {
      /* TO DO discardCustomPreviewChange */
      // eslint-disable-next-line no-console
      console.log(props.spaceId);
      props.handleClose(true);
    };

    return (
      <Modal
        testId="testNoumCustomPreviewDiscardChange"
        open={props.isOpen}
        onClose={props.handleClose}
        size={ModalSize.S}
        disableBackdropClick
      >
        <>
          <ModalHeader data-testid="titleNoumCustomPreviewDiscardChange">
            {t(`noumena.container.chamber_discard_change.title`)}
          </ModalHeader>
          <ModalBody align="center">
            <TSpan
              data-testid="bodyNoumCustomPreviewDiscardChange"
              font="body-l"
              textAlign="center"
              colorToken="--text-modal-neutral-default"
            >
              {t(`noumena.noum_edit.custom_preview.exit_modal.description`)}
            </TSpan>
          </ModalBody>
          <ModalFooter flexDirection="column" gap={16}>
            <Button
              data-testid="confirmNoumCustomPreviewDiscardChange"
              primary
              intent="negative"
              size="full"
              onClick={handleConfirm}
            >
              {t(`noumena.noum_edit.custom_preview.exit_modal.confirm_button`)}
            </Button>
            <Button
              data-testid="continueEditingNoumCustomPreviewDiscardChange"
              tertiary
              size="full"
              onClick={() => props.handleClose()}
            >
              {t(`noumena.noum_edit.custom_preview.exit_modal.cancel_button`)}
            </Button>
          </ModalFooter>
        </>
      </Modal>
    );
  },
);

export default NoumCustomPreviewDiscardChange;
