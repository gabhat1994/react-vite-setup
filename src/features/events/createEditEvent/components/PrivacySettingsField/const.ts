import { t } from 'i18next';
import { Privacy } from '@/apollo/generated/types';

import {
  type PrivacySettingsMapping,
  type PrivacySettingOptions,
} from './types';

export const privacySettingOptions: PrivacySettingOptions[] = [
  {
    type: 'value',
    key: 'privacy-001',
    iconName: 'eye_on_m',
    value: Privacy.Public,
    label: t('noumena.event.modal.privacy_public'),
    description: t('noumena.event.modal.privacy_public_description'),
  },
  {
    type: 'value',
    key: 'privacy-002',
    iconName: 'groups_m',
    value: Privacy.Connected,
    label: t('noumena.event.modal.privacy_connected'),
    description: t('noumena.event.modal.privacy_connected_description'),
  },
  {
    type: 'value',
    key: 'privacy-003',
    iconName: 'lock_m',
    value: Privacy.Invitation,
    label: t('noumena.event.modal.privacy_invitation'),
    description: t('noumena.event.modal.privacy_invitation_description'),
  },
];

export const privacySettingOptionsMapping: PrivacySettingsMapping = {
  PUBLIC: t('noumena.event.modal.privacy_public'),
  CONNECTED: t('noumena.event.modal.privacy_connected'),
  INVITATION: t('noumena.event.modal.privacy_invitation'),
};
