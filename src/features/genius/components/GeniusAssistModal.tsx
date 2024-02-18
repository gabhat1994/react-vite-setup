import { Button, TSpan } from '@/components';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { Trans, useTranslation } from 'react-i18next';
import GeniusAssist from '@/assets/images/genius_assist.png';
import S from './styles';

interface GeniusInitialModalProps {
  isOpen: boolean;
  onClose(): void;
}

export function GeniusAssistModal({
  isOpen,
  onClose,
}: GeniusInitialModalProps) {
  const { t } = useTranslation();

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      forceHideCloseButton
      size={ModalSize.L}
      disableBackdropClick
      disableEscapeKeyDown
    >
      <ModalHeader topPadding={0} bottomPadding={0}>
        {t('noumena.genius.assist')}
      </ModalHeader>
      <ModalBody>
        <S.GeniusAssistContainer vertical gap={16} fullWidth>
          <S.Image src={GeniusAssist || undefined} />
          <TSpan font="body-l" colorToken="--text-body-neutral-highlighted">
            <Trans
              i18nKey="noumena.genius.create_content_description"
              components={{
                Text: (
                  <TSpan
                    font="body-l-bold"
                    colorToken="--text-body-neutral-highlighted"
                    textAlign="center"
                  />
                ),
              }}
            />
          </TSpan>
        </S.GeniusAssistContainer>
      </ModalBody>
      <ModalFooter>
        <Button primary size="full" onClick={onClose}>
          {t('noumena.genius.create_content')}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
