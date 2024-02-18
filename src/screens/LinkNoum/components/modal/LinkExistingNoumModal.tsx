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
import { SpinnerContainer } from '@/common/globalStyles';
import { Spinner } from '@/components/Spinner';
import { type OptionType } from '../../types';
import LinkNoumOption from '../LinkNoumOption';
import { ExistingLinkContainer } from '../../styles';
import { type LinkedNoumOptionType } from '../types';

export const LinkExistingNoumModal: React.FC<{
  isOpen: boolean;
  selectedOption?: OptionType;
  linkedNoums: OptionType[];
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
    >
      <ModalHeader isFullScreen={false}>
        {t('noumena.link_noums.linked_noums_modal.heading')}
      </ModalHeader>
      <ModalBody
        isFullScreen={false}
        style={{
          alignItems: 'center',
        }}
      >
        {selectedOption ? (
          <LinkNoumOption
            iconSize={40}
            item={selectedOption}
            showBorder={false}
            showChips
            showDetail
            style={{ alignSelf: 'stretch' }}
          />
        ) : undefined}
        <TSpan
          colorToken="--text-modal-neutral-default"
          textAlign="center"
          font="body-m"
        >
          {t('noumena.link_noums.linked_noums_modal.description')}
        </TSpan>
        {linkedNoums.length ? (
          <ExistingLinkContainer>
            {linkedNoums.map((item, idx) => (
              <LinkNoumOption
                showCheckBox={false}
                key={item.spaceId}
                item={item as LinkedNoumOptionType}
                showDetail={false}
                showBorder={idx < linkedNoums.length - 1}
              />
            ))}
          </ExistingLinkContainer>
        ) : (
          <SpinnerContainer>
            <Spinner />
          </SpinnerContainer>
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
        <Button size="full" onClick={handleClose}>
          {t('noumena.cancel')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
