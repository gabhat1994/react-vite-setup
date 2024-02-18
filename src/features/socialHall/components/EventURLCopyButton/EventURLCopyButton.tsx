import { t } from 'i18next';
import { useState } from 'react';

import { Stack } from '@/layout';
import { Button, TSpan } from '@/components';
import { useAuth } from '@/features/auth/contexts';
import { copyToClipboard } from '@/utils/copyToClipboard';
import { generatePersonalInviteLink } from '@/features/coreSettings';
import { absoluteRouteGenerator } from '@/utils/absoluteRouteGenerator';

import { PersonalEventContainer } from './styles';
import type { EventURLCopyButtonProps } from './types';

export const EventURLCopyButton = ({
  font = 'body-l',
}: EventURLCopyButtonProps) => {
  const { user } = useAuth();
  const [isCopied, setIsCopied] = useState(false);

  const personalLink = `${absoluteRouteGenerator(
    generatePersonalInviteLink(user ?? null),
  )}`;

  const copyText = () => {
    setIsCopied(true);
    copyToClipboard(personalLink);
  };

  const copyBtnTitle = t(
    isCopied ? 'noumena.event.copied_new_personal_event_id' : '',
  );

  return (
    <PersonalEventContainer
      fullWidth
      align="center"
      justify="space-between"
      data-testid="event-url-copy-button"
    >
      <Stack maxWidth="calc(100% - 64px)">
        <TSpan overflow="ellipsis" font={font}>
          {personalLink}
        </TSpan>
      </Stack>
      <Stack>
        <Button
          onMouseLeave={() => setIsCopied(false)}
          onClick={copyText}
          size="small"
          tooltipText={copyBtnTitle}
          tooltipPosition="top-center"
        >
          {t('noumena.event.copy_new_personal_event_id')}
        </Button>
      </Stack>
    </PersonalEventContainer>
  );
};
