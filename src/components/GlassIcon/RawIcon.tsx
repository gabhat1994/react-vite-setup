import { glassIcons } from '@/assets/glass-icons';
import S from './styles';
import {
  type AnimatedGlassIconProps,
  type AnimatedGlassIconState,
} from './types';

interface RawIconProps extends AnimatedGlassIconProps {
  state?: AnimatedGlassIconState;
}

/**
 * If you want to add or update any Glass Icons, follow instructions from here:
 * https://communitycapitalnoumena.atlassian.net/wiki/spaces/NF/pages/1712488456/Glass+Icons
 */
export function RawIcon({
  name,
  size,
  state = 'default',
  rotate = false,
}: RawIconProps) {
  const Component = glassIcons[name];

  return (
    <S.AnimatedGlassIconWrapper
      $rotate={rotate}
      className={`glass-icon-state-${state}`}
    >
      <Component title={name} width={`${size}px`} height={`${size}px`} />
    </S.AnimatedGlassIconWrapper>
  );
}
