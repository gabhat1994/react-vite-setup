import { useLaunchDarkly } from '@/hooks/launchDarkly';
import { type LayoutProps } from './types';
import { SocialHallLayout } from './SocialHallLayout';
import { SocialHallLayoutOld } from './SocialHallLayoutOld';

export default (props: LayoutProps) => {
  const {
    flags: { socialHallVideoCall },
  } = useLaunchDarkly();

  return socialHallVideoCall ? (
    <SocialHallLayout {...props} />
  ) : (
    <SocialHallLayoutOld {...props} />
  );
};
