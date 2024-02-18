import { t } from 'i18next';
import { useCallback, useState } from 'react';
import { Icon } from '@/components/Icon';
import { MediaSettingModal } from '../MediaSettingModal/MediaSettingModal';

import { ControlPanelIcon } from './styles';

export const MediaSettingControl = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onToggleMediaSettingPopup = useCallback(() => {
    setIsOpen((open) => !open);
  }, []);

  return (
    <>
      <ControlPanelIcon
        cursorAllowed
        onClick={onToggleMediaSettingPopup}
        data-title={t('noumena.social_hall.Control_panel.settings')}
      >
        <Icon
          size={24}
          name="settings_m"
          color="--icon-button-neutral-default"
        />
      </ControlPanelIcon>
      <MediaSettingModal
        isOpen={isOpen}
        onAccept={onToggleMediaSettingPopup}
        handleClose={onToggleMediaSettingPopup}
      />
    </>
  );
};
