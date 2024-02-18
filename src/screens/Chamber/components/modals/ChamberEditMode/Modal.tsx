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
import { Spacer } from '@/layout';

interface ChamberEditModeProps {
  isOpen: boolean;
  handleClose: () => void;
  handleMarkAsVisited: () => void;
  markSpaceAsEditedLoading: boolean;
}

const ChamberEditMode = memo((props: ChamberEditModeProps) => {
  const { t } = useTranslation();

  return (
    <Modal
      testId="testChamberEditMode"
      open={props.isOpen}
      onClose={props.handleClose}
      size={ModalSize.S}
      disableBackdropClick
    >
      <ModalHeader data-testid="titleChamberEditMode">
        {t(`noumena.container.chamber_edit_mode.title`)}
      </ModalHeader>
      <ModalBody align="center">
        <TSpan
          data-testid="bodyChamberEditMode"
          font="body-l"
          colorToken="--text-modal-neutral-default"
          textAlign="center"
        >
          {t(`noumena.container.chamber_edit_mode.body`)}
        </TSpan>
        <Spacer height={12} />
        <TSpan
          colorToken="—text-modal-header-neutral-default"
          data-testid="bodyRememberChamberEditMode"
          font="body-l-bold"
          textAlign="center"
        >
          {t(`noumena.container.chamber_edit_mode.body.remember`)}
        </TSpan>
      </ModalBody>
      <ModalFooter flexDirection="column">
        <Button
          data-testid="closeChamberEditMode"
          primary
          size="full"
          onClick={props.handleMarkAsVisited}
          loading={props.markSpaceAsEditedLoading}
        >
          {t(`noumena.container.chamber_edit_mode.start`)}
        </Button>
      </ModalFooter>
    </Modal>
  );
});

export default ChamberEditMode;
