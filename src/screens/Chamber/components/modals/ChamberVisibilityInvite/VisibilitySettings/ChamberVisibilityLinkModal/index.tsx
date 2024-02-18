import React, { useMemo } from 'react';
import { t } from 'i18next';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@/components/ExtendedModal';
import { TSpan } from '@/components/Typography';
import { Button } from '@/components/Button';
import { useWindowDimensions } from '@/hooks';
import { breakpoints } from '@/constants/devices';
import LinkNoumOption from '@/screens/LinkNoum/components/LinkNoumOption';
import { type LinkedNoumOptionType } from '@/screens/LinkNoum/components/types';
import { type OptionType } from '@/screens/LinkNoum/types';
import { ExistingLinkContainer } from './styles';

export const ChamberVisibilityLinkModal: React.FC<{
  isOpen: boolean;
  selectedOption?: OptionType;
  linkedNoums: LinkedNoumOptionType[];
  handleClose: () => void;
  handleAccept: () => void;
}> = ({ isOpen, handleClose, linkedNoums, selectedOption, handleAccept }) => {
  const { width } = useWindowDimensions();
  const isMobile = useMemo(() => width <= breakpoints.MOBILE_MAX, [width]);
  return (
    <Modal
      isFullScreen={false}
      testId="link-visibility-modal"
      open={isOpen}
      onClose={handleClose}
      style={{
        width: !isMobile ? '450px' : 'auto',
      }}
      enableCloseButton
      disableBackdropClick
    >
      <ModalHeader isFullScreen={false}>
        {t('noumena.container.chamber_publish_visibility_link.title')}
      </ModalHeader>
      <ModalBody
        isFullScreen={false}
        style={{
          alignItems: 'center',
        }}
        hasScrollBar
      >
        {selectedOption && (
          <LinkNoumOption
            iconSize={40}
            item={selectedOption}
            showBorder={false}
            showChips
            showDetail
            style={{ alignSelf: 'stretch' }}
          />
        )}
        <TSpan
          colorToken="--text-modal-neutral-default"
          textAlign="center"
          font="body-m"
        >
          {t('noumena.container.chamber_publish_visibility_link.description', {
            linkCount: linkedNoums.length,
          })}
        </TSpan>
        {linkedNoums.length && (
          <ExistingLinkContainer>
            {linkedNoums.map((item, idx) => (
              <LinkNoumOption
                key={item._id}
                item={item}
                showDetail={false}
                showBorder={idx < linkedNoums.length - 1}
              />
            ))}
          </ExistingLinkContainer>
        )}
      </ModalBody>
      <ModalFooter
        isFullScreen={false}
        marginTop={24}
        gap={16}
        flexDirection={isMobile ? 'column' : 'row-reverse'}
      >
        <Button size="full" primary onClick={handleAccept}>
          {t('noumena.continue')}
        </Button>
        <Button tertiary size="full" onClick={handleClose}>
          {t('noumena.cancel')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
