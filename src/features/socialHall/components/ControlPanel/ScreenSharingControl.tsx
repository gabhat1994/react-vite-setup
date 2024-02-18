import { t } from 'i18next';
import { useCallback, useMemo } from 'react';
import { Icon } from '@/components/Icon';
import { useSocialHallCallContext } from '@/providers';
import { Spinner } from '@/components/Spinner';
import { ControlPanelIcon } from './styles';

export const ScreenSharingControl = () => {
  const {
    isShareScreen,
    onToggleScreenSharing,
    isRemoteScreenSharing,
    screenSharingLocalUserFeed,
  } = useSocialHallCallContext();

  const isLoading = useMemo(
    () => !screenSharingLocalUserFeed && isShareScreen,
    [screenSharingLocalUserFeed, isShareScreen],
  );

  const isScreenSharing = useMemo(
    () => !isShareScreen && isRemoteScreenSharing,
    [isShareScreen, isRemoteScreenSharing],
  );

  const onToggleScreenSharingHandler = useCallback(() => {
    if (!isScreenSharing) {
      onToggleScreenSharing();
    }
  }, [onToggleScreenSharing, isScreenSharing]);

  return (
    <ControlPanelIcon
      cursorAllowed={!isScreenSharing}
      onClick={onToggleScreenSharingHandler}
      data-title={
        isScreenSharing
          ? t('noumena.social_hall.Control_panel.sharing_not_possible')
          : isShareScreen
          ? t('noumena.social_hall.Control_panel.stop_sharing')
          : t('noumena.social_hall.Control_panel.share_screen')
      }
      hoverColor={
        isScreenSharing ? 'var(--bg-button-neutral-disabled)' : undefined
      }
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <Icon
          size={24}
          name={isShareScreen ? 'share_content_off_m' : 'share_content_m'}
          color="--icon-button-neutral-default"
        />
      )}
    </ControlPanelIcon>
  );
};
