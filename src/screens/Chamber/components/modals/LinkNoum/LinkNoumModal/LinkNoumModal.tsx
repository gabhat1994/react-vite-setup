import React, { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { t } from 'i18next';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { useWindowDimensions } from '@/hooks';
import { TSpan } from '@/components/Typography';
import { Icon } from '@/components/Icon';
import { Spacer, Stack } from '@/layout';
import { Button } from '@/components/Button';
import ROUTES from '@/constants/routes';
import { IconContainer } from '../styles';

export const LinkNoumModal: React.FC<{
  isOpen: boolean;
  goToNoumLink?: () => void;
  handleClose: () => void;
}> = ({ isOpen, handleClose, goToNoumLink }) => {
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
  const isMobile = useMemo(() => width < 768, [width]);

  const handleGoToLinkNoum = () => {
    if (goToNoumLink) goToNoumLink();
    else {
      navigate(ROUTES.LINK_NOUM);
    }
  };

  return (
    <Modal
      isFullScreen={isMobile}
      testId="chamber-link-noum-modal"
      open={isOpen}
      enableCloseButton={!isMobile}
      onClose={handleClose}
      size={ModalSize.L}
      disableBackdropClick
    >
      <ModalHeader isFullScreen={isMobile}>
        {t('noumena.link_noums.link_noums', {
          linkNo: '',
        })}
      </ModalHeader>
      <ModalBody isFullScreen={isMobile}>
        <Stack align="center" fullWidth justify="center">
          <IconContainer>
            <Icon name="link_noums_xxxxl" size={144} />
          </IconContainer>
        </Stack>
        <TSpan font="body-m" colorToken="--text-modal-neutral-highlighted">
          {t(
            'noumena.chamber_create_new.link_noum_modal.description.sentence_1',
          )}
        </TSpan>
        <Spacer height={24} />
        <TSpan font="body-m" colorToken="--text-modal-neutral-highlighted">
          {t(
            'noumena.chamber_create_new.link_noum_modal.description.sentence_2',
          )}
        </TSpan>
        <Spacer height={24} />
        <TSpan font="body-m" colorToken="--text-modal-neutral-highlighted">
          {t(
            'noumena.chamber_create_new.link_noum_modal.description.sentence_3',
          )}
        </TSpan>
        <Spacer height={24} />
        <TSpan font="body-m" colorToken="--text-modal-neutral-highlighted">
          {t(
            'noumena.chamber_create_new.link_noum_modal.description.sentence_4',
          )}
        </TSpan>
        <Spacer height={24} />
        <TSpan
          font="body-m-bold"
          colorToken="--text-modal-neutral-highlighted"
          textAlign="left"
        >
          {t(
            'noumena.chamber_create_new.link_noum_modal.description.sentence_5',
          )}
        </TSpan>
      </ModalBody>
      <ModalFooter
        isFullScreen={false}
        flexDirection={isMobile ? 'column' : 'row'}
        gap={16}
      >
        <Button size="full" primary onClick={handleGoToLinkNoum}>
          {t('noumena.link_noums.select_noums_action')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
