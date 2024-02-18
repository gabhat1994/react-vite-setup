import { t } from 'i18next';
import { TranslatedBody } from '../../NotificationLayout';
import AdminMessage from './AdminMessage';
import { type NoumUnusedSetupSlotsProps } from './types';

const NoumUnusedSetupSlots = ({
  message,
  ...basicProps
}: NoumUnusedSetupSlotsProps) => (
  <AdminMessage
    {...basicProps}
    data-testid="RiseApplicationSubmitted"
    title={t('noumena.notification_type.unused_setup_slots.title')}
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.unused_setup_slots.body"
        values={{ message }}
      />
    }
  />
);

export default NoumUnusedSetupSlots;
