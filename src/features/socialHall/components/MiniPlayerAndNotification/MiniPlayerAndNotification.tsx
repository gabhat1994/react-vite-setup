import { useMemo } from 'react';
import { useSocialHallContext, useSocialHallEventContext } from '@/providers';
import { GroupProfilePopup } from '../ProfilePopup/GroupProfilePopup';
import { UserProfilePopup } from '../ProfilePopup/UserProfilePopup';
import { KnockNotification } from './KnockNotification/KnockNotification';
import { MiniPlayer } from './MiniPlayer/MiniPlayer';
import { MiniAndNotificationWrapper, Wrapper } from './styles';
import { type MiniPlayerAndNotificationProps } from './types';

export const MiniPlayerAndNotification = ({
  initialNotifications,
  showMiniPlayerNotification,
  ...props
}: MiniPlayerAndNotificationProps) => {
  const { activeSocialHallGroup, showBuzzRoom } = useSocialHallContext();

  const { hostJoined } = useSocialHallEventContext();

  const showMiniPlayer = useMemo(
    () => !!activeSocialHallGroup?._id && !showBuzzRoom,
    [activeSocialHallGroup, showBuzzRoom],
  );

  return (
    <Wrapper data-testid="main_wrapper">
      {showMiniPlayerNotification && (
        <MiniAndNotificationWrapper
          isVisible={initialNotifications?.length > 0 || !!showMiniPlayer}
          isSingle={initialNotifications?.length === 1 && !showMiniPlayer}
        >
          {!showBuzzRoom &&
            initialNotifications.map((notification) => (
              <KnockNotification
                key={notification?._id}
                notification={notification!}
                isSingle={initialNotifications.length === 1 && !showMiniPlayer}
              />
            ))}
          {hostJoined && showMiniPlayer && (
            <KnockNotification
              key={new Date().getTime()}
              isSingle={initialNotifications.length === 1 && !showMiniPlayer}
              isHostJoined
            />
          )}
          {showMiniPlayer && <MiniPlayer {...props} />}
        </MiniAndNotificationWrapper>
      )}
      <UserProfilePopup {...props} />
      <GroupProfilePopup {...props} />
    </Wrapper>
  );
};
