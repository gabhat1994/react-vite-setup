import React, { useMemo } from 'react';
import { t } from 'i18next';
import { Modal, ModalBody, ModalFooter } from '@/components/ExtendedModal';
import { useWindowDimensions } from '@/hooks';
import { TSpan } from '@/components/Typography';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button';
import { Stack } from '@/layout';

export const LinkNoumCompletedModal: React.FC<{
  isOpen: boolean;
  handleClose: () => void;
  handleGoBack: () => void;
}> = ({ isOpen, handleClose, handleGoBack }) => {
  const { width } = useWindowDimensions();
  const isMobile = useMemo(() => width < 768, [width]);

  return (
    <Modal
      isFullScreen={false}
      testId="chamber-broadcast-modal"
      open={isOpen}
      onClose={handleClose}
      style={{
        width: isMobile ? 'auto' : '327px',
      }}
    >
      <ModalBody
        isFullScreen={false}
        style={{
          alignItems: 'center',
        }}
      >
        <Stack>
          <Icon name="link_noums_xxxxl" size={144} />
        </Stack>
        <TSpan
          textAlign="center"
          font="heading-m-bold"
          style={{
            marginTop: 24,
            marginBottom: 16,
          }}
          colorToken="--text-modal-header-neutral-default"
        >
          {t('noumena.link_noums.completed', {
            punctuation: '!',
          })}
        </TSpan>
        <TSpan
          textAlign="center"
          font="body-m"
          colorToken="--text-modal-neutral-default"
        >
          {t('noumena.link_noums.success_message')}
        </TSpan>
      </ModalBody>
      <ModalFooter isFullScreen={false} marginTop={28}>
        <Button size="full" primary onClick={handleGoBack}>
          {t('noumena.close')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
