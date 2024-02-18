import React, { useCallback, useMemo } from 'react';
import { t } from 'i18next';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@/components/ExtendedModal';
import { Button } from '@/components/Button';
import { dropdownRenderOptions } from '@/components/Dropdown';
import { Icon } from '@/components/Icon';
import { useWindowDimensions } from '@/hooks';
import { visibilityOptions } from '../ChamberVisibilityInvite/data';
import { type VisibilityDropdownProps } from '../ChamberVisibilityInvite/types';

export const ChamberPublishVisibilityInfo: React.FC<{
  isOpen: boolean;
  handleClose: () => void;
}> = ({ isOpen, handleClose }) => {
  const { width } = useWindowDimensions();
  const isMobile = useMemo(() => width < 768, [width]);

  const optionIcon = useCallback((option: string) => {
    switch (option) {
      case 'PUBLIC':
        return (
          <Button
            tertiary
            size="small"
            icon={
              <Icon
                color="--icon-button-neutral-default"
                name="eye_on_m"
                size={24}
              />
            }
          />
        );
      case 'PRIVATE':
        return (
          <Button
            tertiary
            size="small"
            icon={
              <Icon
                name="lock_m"
                color="--icon-button-neutral-default"
                size={24}
              />
            }
          />
        );
      case 'SECRET':
        return (
          <Button
            tertiary
            size="small"
            icon={
              <Icon
                name="eye_off_m"
                color="--icon-button-neutral-default"
                size={24}
              />
            }
          />
        );
      default:
        return null;
    }
  }, []);

  const selectableOptions: VisibilityDropdownProps[] = useMemo(
    () =>
      visibilityOptions.map((o) => ({
        ...o,
        icon: optionIcon(o.value),
        selected: false,
      })),
    [optionIcon],
  );

  return (
    <Modal
      isFullScreen={isMobile}
      testId="link-confirmation-modal"
      open={isOpen}
      onClose={handleClose}
      style={{
        width: isMobile ? 'auto' : '450px',
        maxWidth: '450px',
      }}
      closeButtonStyles={{
        enforceRight: !isMobile,
        horizontal: 24,
      }}
      enableCloseButton
      disableBackdropClick
    >
      <ModalHeader isFullScreen={false}>
        {t('noumena.container.chamber_publish_visibility.title')}
      </ModalHeader>
      <ModalBody
        isFullScreen={false}
        style={{
          alignItems: 'center',
        }}
      >
        {selectableOptions.map(
          dropdownRenderOptions(
            () => {},
            null,
            () => {},
            {
              activeSubItem: null,
              iconColumnWidth: 40,
              dropdownItemStyle: {
                width: '100%',
              },
            },
          ),
        )}
      </ModalBody>
      <ModalFooter
        isFullScreen={false}
        marginTop={28}
        flexDirection="column"
        gap={16}
      >
        <Button size="full" tertiary onClick={handleClose}>
          {t('noumena.close')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
