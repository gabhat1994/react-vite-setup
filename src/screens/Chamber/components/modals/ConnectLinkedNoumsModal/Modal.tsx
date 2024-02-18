import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { TSpan } from '@/components/Typography';
import { Button } from '@/components/Button';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import { Spacer, Stack } from '@/layout';
import { Infinite } from '@/components/Infinite';
import { Avatar } from '@/components/Avatar/Avatar';
import { breakpoints } from '@/constants/devices';
import { useWindowDimensions } from '@/hooks';
import type ConnectLinkedNoumsModalProps from './types';

export const ConnectLinkedNoumsModal: React.FC<
  ConnectLinkedNoumsModalProps
> = ({ actionType, loading = false, onConfirm, onClose }) => {
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const isMobile = useMemo(() => width <= breakpoints.MOBILE_MAX, [width]);
  const { space } = useNoumContext();
  const modalTitle = useMemo(() => {
    if (actionType === 'connect')
      return t(
        `noumena.link_noums.connect_to_${
          space?.projectType?.toLowerCase() ?? 'public'
        }.modal.title`,
      );
    return t(`noumena.link_noums.follow.modal.title`);
  }, [actionType, space?.projectType, t]);

  const modalDescription = useMemo(() => {
    if (actionType === 'connect')
      return t(
        `noumena.link_noums.connect_to_${
          space?.projectType?.toLowerCase() ?? 'public'
        }.modal.description`,
        { linkedNoumsCount: space?.link?.linkedNoums?.length },
      );
    return t(`noumena.link_noums.follow.modal.description`, {
      linkedNoumsCount: space?.link?.linkedNoums?.length,
    });
  }, [actionType, t, space?.projectType, space?.link?.linkedNoums?.length]);

  return (
    <Modal
      open
      testId="noum-connect-with-linked-noums"
      onClose={onClose}
      enableCloseButton
      size={ModalSize.M}
      disableBackdropClick
    >
      <ModalHeader>{modalTitle}</ModalHeader>
      <ModalBody align="center">
        <TSpan font="body-m" colorToken="--text-modal-neutral-default">
          {modalDescription}
        </TSpan>
        <Spacer height={16} />
        <Stack fullWidth>
          <Infinite
            width="100%"
            status="end-with-force"
            maxHeight={isMobile ? 'unset' : '152px'}
          >
            {space?.link?.linkedNoums?.map((linkedNoum) => (
              <Stack
                fullWidth
                style={{ height: '40px', minHeight: '40px' }}
                align="center"
                borderBottom
                grow={true}
              >
                <Avatar url={linkedNoum?.profileImage || null} size="M" />
                <TSpan
                  font="body-m"
                  colorToken="--text-tablecell-header-neutral-highlighted"
                  style={{ marginLeft: '8px' }}
                >
                  {linkedNoum?.name || ''}
                </TSpan>
              </Stack>
            ))}
          </Infinite>
        </Stack>
      </ModalBody>
      <ModalFooter gap={16}>
        <Button
          testId="noum-cancel-button"
          size="full"
          onClick={onClose}
          disabled={loading}
        >
          {t('noumena.cancel')}
        </Button>
        <Button
          testId="noum-continue-button"
          primary
          size="full"
          onClick={onConfirm}
          disabled={loading}
          loading={loading}
        >
          {t('noumena.continue')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
