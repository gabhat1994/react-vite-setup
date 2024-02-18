import { Button } from '@/components/Button';
import { Stack } from '@/layout';

import { t } from 'i18next';
import { type DisableActionProps } from './types';

export const DisableConfirmmationAction = ({
  onClose,
  onDisable,
}: DisableActionProps) => (
  <Stack fullWidth justify="space-between" gap={16}>
    <Button tertiary size="full" onClick={onClose}>
      {t(`noumena.chamber_edit.permission.cancel`)}
    </Button>

    <Button primary onClick={onDisable} size="full" intent="negative">
      {t(`noumena.chamber_edit.manage_noum_ads.disable.seo.noum`)}
    </Button>
  </Stack>
);
