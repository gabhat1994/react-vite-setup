import { Button } from '@/components/Button';
import { Stack } from '@/layout';

import { t } from 'i18next';
import { type EnableDisableActionProps } from './types';

export const EnableAndDisableAction = ({
  hideCancelButton,
  loading,
  disableActionButton,
  onSave,
  onClose,
}: EnableDisableActionProps) => (
  <Stack fullWidth justify="space-between" gap={16}>
    {hideCancelButton || (
      <Button tertiary size="full" onClick={onClose}>
        {t(`noumena.chamber_edit.permission.cancel`)}
      </Button>
    )}
    <Button
      primary
      onClick={onSave}
      loading={loading}
      size="full"
      disabled={disableActionButton}
    >
      {t(`noumena.chamber_edit.manage_noum_ads.save`)}
    </Button>
  </Stack>
);
