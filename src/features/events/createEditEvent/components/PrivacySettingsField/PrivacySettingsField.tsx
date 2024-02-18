import React, { useEffect, useState } from 'react';
import { t } from 'i18next';

import { Spacer } from '@/layout';
import { Icon, TSpan } from '@/components';
import { Privacy } from '@/apollo/generated/types';
import { useCreateEditEventContext } from '@/features/events/contexts';

import {
  Content,
  EventFieldLabel,
  EventFieldDescription,
  PrivacySettingsFieldWrapper,
  Heading,
  Flex,
} from './styles';
import { EventPicker } from '../EventPicker';
import { DropdownOption } from './DropdownOption';
import { privacySettingOptions, privacySettingOptionsMapping } from './const';
import { EventConfirmationModal } from '../../../components/EventConfirmationModal';

export const PrivacySettingsField = () => {
  const {
    event,
    privacy: defaultPrivacy,
    setPrivacy,
    onFormChanged,
    hasUnConnectedMembers,
  } = useCreateEditEventContext();

  const [privacy, setPrivacyState] = useState(defaultPrivacy);
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState<Privacy | null>(null);

  useEffect(() => {
    const privacyChanged = !!event?.privacy && event?.privacy !== privacy;
    onFormChanged('privacy', privacyChanged);
  }, [event, privacy, onFormChanged]);

  const handlePrivacyChange = (type: Privacy) => {
    if (type === privacy) return;

    const requiresModal =
      hasUnConnectedMembers &&
      [Privacy.Connected, Privacy.Invitation].includes(type);
    if (requiresModal) {
      setModalData(type);
      setOpenModal(true);
    } else {
      updatePrivacy(type);
    }
  };

  const updatePrivacy = (value: Privacy) => {
    setPrivacyState(value);
    setPrivacy(value);
  };

  const handleModalClose = (confirmed?: boolean) => {
    if (confirmed && modalData) {
      updatePrivacy(modalData);
    }
    setOpenModal(false);
    setModalData(null);
  };

  return (
    <PrivacySettingsFieldWrapper data-testid="privacy-settings-field-wrapper">
      <EventFieldLabel
        font="body-l-bold"
        colorToken="--text-body-header-neutral-default"
      >
        <Content>
          <Heading>
            <Flex>
              <Icon name="privacy_policy_m" size={24} />
              <Spacer width={8} />
              <TSpan>{t('noumena.event.modal.privacy_settings_title')}</TSpan>
            </Flex>
            <EventPicker
              containerWidth="300px"
              value={privacy}
              options={privacySettingOptions}
              selectedLabel={privacySettingOptionsMapping[privacy]}
              optionsRenderer={(_, handleSelectOption) => (
                <DropdownOption
                  onChange={(option) => {
                    handlePrivacyChange(option.value);
                    handleSelectOption(option);
                  }}
                />
              )}
              onOptionChange={(option) =>
                handlePrivacyChange(option.value as Privacy)
              }
            />
          </Heading>
          <EventFieldDescription
            font="body-m"
            colorToken="--text-body-neutral-default"
          >
            {t('noumena.event.modal.privacy_settings_description')}
          </EventFieldDescription>
        </Content>
      </EventFieldLabel>
      {openModal && (
        <EventConfirmationModal
          type="change-privacy"
          onClose={handleModalClose}
          onConfirm={() => handleModalClose(true)}
        />
      )}
    </PrivacySettingsFieldWrapper>
  );
};
