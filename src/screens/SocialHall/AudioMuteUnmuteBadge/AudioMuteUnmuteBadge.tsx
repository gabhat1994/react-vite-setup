import React from 'react';
import { Icon } from '@/components/Icon';
import { type AudioMuteUnmuteBadgeProps } from '@/screens/SocialHall/AudioMuteUnmuteBadge/types';
import { Badge } from './styles';

const AudioMuteUnmuteBadge: React.FC<AudioMuteUnmuteBadgeProps> = ({
  isMuted,
}) =>
  isMuted ? (
    <Badge>
      <Icon
        color="--icon-call-ui-neutral-alt-default"
        name="mic_off_m"
        size={14}
      />
    </Badge>
  ) : null;

export default AudioMuteUnmuteBadge;
