import { t } from 'i18next';
import { TSpan } from '@/components/Typography';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button';
import { Spacer } from '@/layout';
import { EmptyScreenWrapper } from './styles';

const EmptyScreen = ({ onCreateNew }: { onCreateNew: () => void }) => (
  <EmptyScreenWrapper data-testid="empty_screen_wrapper">
    <Icon
      name="message_outline_m"
      size={96}
      color="--icon-card-placeholder-neutral-default"
    />
    <Spacer height={8} />
    <TSpan colorToken="--text-body-neutral-default" font="body-xl">
      {t('noumena.global_messages.no_conversation_note')}
    </TSpan>
    <Spacer height={24} />
    <Button secondary size="small" onClick={onCreateNew}>
      {t('noumena.global_messages.create_new_conv')}
    </Button>
  </EmptyScreenWrapper>
);

export default EmptyScreen;
