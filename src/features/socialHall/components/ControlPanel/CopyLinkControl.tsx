import { t } from 'i18next';
import { useToast } from '@/hooks';
import { Icon } from '@/components/Icon';
import { ControlPanelIcon } from './styles';

export const CopyLinkControl = () => {
  const { addToast } = useToast();

  const onCopyLink = () => {
    const socialHallLink = window.location.href;
    navigator.clipboard.writeText(socialHallLink);
    addToast('primary', 'none', `${t('noumena.event.link.copied')}`);
  };

  return (
    <ControlPanelIcon
      cursorAllowed
      onClick={() => onCopyLink()}
      data-title={t('noumena.social_hall.copy_link')}
    >
      <Icon name="link_m" size={20} color="--icon-button-neutral-default" />
    </ControlPanelIcon>
  );
};
