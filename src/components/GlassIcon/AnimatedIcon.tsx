import { useAnimatedGlassIconContext } from './Provider';
import { RawIcon } from './RawIcon';
import { type AnimatedGlassIconProps } from './types';

interface AnimatedIconProps extends AnimatedGlassIconProps {}

/**
 * If you want to add or update any Glass Icons, follow instructions from here:
 * https://communitycapitalnoumena.atlassian.net/wiki/spaces/NF/pages/1712488456/Glass+Icons
 */
export function AnimatedIcon({
  name,
  size,
  rotate = false,
}: AnimatedIconProps) {
  const { state } = useAnimatedGlassIconContext();

  return <RawIcon name={name} size={size} state={state} rotate={rotate} />;
}
