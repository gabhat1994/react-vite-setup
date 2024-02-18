import { useMemo } from 'react';
import { InlineAvatar } from '@/components/Avatar/Inline/Inline';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button';
import {
  useSocialHallCallContext,
  useSocialHallContext,
  useSocialHallEventContext,
} from '@/providers';
import { Wrapper, GroupTitleSpan, IconButtonWrapper } from './styles';
import { type MiniPlayerProps } from '../types';

export const MiniPlayer = ({
  isCloseLoading,
  isLeaveLoading,
  isMuteLoading,
}: MiniPlayerProps) => {
  const { setShowBuzzRoom, activeSocialHallGroup } = useSocialHallContext();
  const { groupName } = useSocialHallEventContext();

  const { isMuted, onLeaveCall, toggleMuteCall } = useSocialHallCallContext();

  const muteIcon = useMemo(
    () => (isMuted ? 'mic_off_m' : 'mic_on_m'),
    [isMuted],
  );

  const avatarUrls = useMemo(
    () =>
      activeSocialHallGroup?.users?.map(
        (user) => user?.profile?.profilePicture || '',
      ),
    [activeSocialHallGroup?.users],
  );

  return (
    <Wrapper data-testid="player_wrapper">
      <InlineAvatar urls={avatarUrls || []} borderedImage={true} size="XXL" />
      <GroupTitleSpan colorToken="--text-card-neutral-highlighted">
        {activeSocialHallGroup?.name || groupName}
      </GroupTitleSpan>
      <IconButtonWrapper>
        <Button
          data-testid="button_mute"
          onClick={() => toggleMuteCall()}
          size="small"
          icon={
            <Icon
              name={muteIcon}
              size={24}
              color="--icon-button-neutral-default"
            />
          }
          loading={isMuteLoading}
        />
        <Button
          key={new Date().getTime()}
          data-testid="button_leave"
          onClick={onLeaveCall}
          size="small"
          icon={<Icon imageIconName="leave_quietly" size={24} />}
          loading={isLeaveLoading}
        />
        <Button
          data-testid="button_close"
          onClick={() => {
            setShowBuzzRoom(true);
          }}
          size="small"
          icon={
            <Icon
              name="chevron_small_up_m"
              size={24}
              color="--icon-button-neutral-default"
            />
          }
          loading={isCloseLoading}
        />
      </IconButtonWrapper>
    </Wrapper>
  );
};
