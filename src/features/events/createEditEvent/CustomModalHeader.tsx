import { t } from 'i18next';

import { Button, TSpan } from '@/components';

interface CustomModalHeaderProps {
  isEditing: boolean;
  setOpenEventDeleteModal: (value: boolean) => void;
}

export const CustomModalHeader = ({
  isEditing,
  setOpenEventDeleteModal,
}: CustomModalHeaderProps) =>
  isEditing ? (
    <Button
      testId="event_delete_btn"
      size="small"
      textOnly
      intent="negative"
      onClick={() => setOpenEventDeleteModal(true)}
    >
      <TSpan colorToken="--text-button-danger-secondary-default">
        {t('noumena.event.event_cancel_button')}
      </TSpan>
    </Button>
  ) : null;
