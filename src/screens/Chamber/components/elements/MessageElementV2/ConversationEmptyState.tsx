import { TSpan } from '@/components/Typography';
import { useContext, type FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Spinner } from '@/components';
import { ActiveConversationContext } from '@/features/conversation/contexts/ActiveConversationContext';
import { Stack } from '@/layout';

export const ConversationEmptyState: FC = () => {
  const { t } = useTranslation();

  const { activeConversationSid } = useContext(ActiveConversationContext);

  return (
    <Stack
      fullWidth
      align="center"
      justify="center"
      grow
      vertical
      padding="32px 0"
    >
      {activeConversationSid ? (
        <Spinner />
      ) : (
        <TSpan colorToken="--text-placeholder-neutral-default" font="body-m">
          {t('noumena.chat.no_conversation_yet')}
        </TSpan>
      )}
    </Stack>
  );
};
