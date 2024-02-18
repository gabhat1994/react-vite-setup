import { t } from 'i18next';
import { useMemo } from 'react';

import { useIsCreateNewEventV2 } from '../../hooks';
import type { ModalDataOutputProps, ModalDataProps } from './types';

export const useModalData = ({
  type,
}: ModalDataProps): ModalDataOutputProps => {
  const isCreateEventV2 = useIsCreateNewEventV2();

  return useMemo(() => {
    switch (type) {
      case 'change-privacy':
        return {
          message: t('noumena.event.privacy.confirm_change_title'),
          description: t(
            isCreateEventV2
              ? 'noumena.event.privacy.confirm_change_description_v2'
              : 'noumena.event.privacy.confirm_change_description',
          ),
          yesButton: t('noumena.event.privacy.confirm_change_button'),
          noButton: t('noumena.cancel'),
        };
      case 'remove-cohost':
        return {
          message: t(
            isCreateEventV2
              ? 'noumena.event.remove_cohost_modal.title_v2'
              : 'noumena.event.remove_cohost_modal.title',
          ),
          description: t('noumena.event.remove_cohost_modal.description'),
          yesButton: t(
            isCreateEventV2
              ? 'noumena.event.remove_cohost_modal.confirm_button_v2'
              : 'noumena.event.remove_cohost_modal.confirm_button',
          ),
          noButton: t('noumena.cancel'),
          confirmIntent: 'negative',
        };
      case 'cancel-event':
        return {
          message: t(
            isCreateEventV2
              ? 'noumena.event.cancel_event_modal.title_v2'
              : 'noumena.event.cancel_event_modal.title',
          ),
          description: t(
            isCreateEventV2
              ? 'noumena.event.cancel_event_modal.description_v2'
              : 'noumena.event.cancel_event_modal.description',
          ),
          yesButton: t('noumena.event.cancel_event_modal.confirm_button'),
          noButton: t('noumena.event.cancel_event_modal.cancel_button'),
          confirmIntent: 'negative',
        };
      case 'discard':
        return {
          message: t('noumena.event.discard_event_modal.title'),
          description: t('noumena.event.discard_event_modal.description'),
          yesButton: t(
            isCreateEventV2
              ? 'noumena.event.discard_event_modal.confirm_button_v2'
              : 'noumena.event.discard_event_modal.confirm_button',
          ),
          noButton: t('noumena.event.discard_event_modal.cancel_button'),
          confirmIntent: 'negative',
        };
      case 'cancel-invite':
        return {
          message: t('noumena.event.cancel_invite_modal.title'),
          description: t('noumena.event.cancel_invite_modal.description'),
          yesButton: t('noumena.event.cancel_invite_modal.confirm_button'),
          noButton: t('noumena.event.cancel_invite_modal.cancel_button'),
          confirmIntent: 'negative',
        };
      default:
        return {
          message: '',
          description: '',
          yesButton: '',
          noButton: '',
          confirmIntent: 'negative',
        };
    }
  }, [type, isCreateEventV2]);
};
