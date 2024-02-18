import { useMemo } from 'react';
import { useSocialHallContext, useSocialHallEventContext } from '@/providers';
import { Icon } from '@/components/Icon';
import { IconButton, LeftWrapper } from './styles';

export const ToggleBuzzRoomBtn = () => {
  const { showBuzzRoom, setShowBuzzRoom } = useSocialHallContext();
  const { isMainEvent, eventDetails } = useSocialHallEventContext();

  const showBuzzRoomBtn = useMemo(
    () => showBuzzRoom && !isMainEvent && !eventDetails?.isInstantEvent,
    [showBuzzRoom, isMainEvent, eventDetails?.isInstantEvent],
  );

  return showBuzzRoomBtn ? (
    <LeftWrapper data-testid="toggle_buzzroom_btn">
      <IconButton onClick={() => setShowBuzzRoom(false)}>
        <Icon
          color="--icon-button-neutral-default"
          name="chevron_small_down_m"
          size={24}
        />
      </IconButton>
    </LeftWrapper>
  ) : null;
};
