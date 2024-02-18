import { useLaunchDarkly } from '@/hooks/launchDarkly';
import { AttendeeHeader as AttendeeHeaderNew } from './AttendeeHeader';
import { AttendeeHeaderOld } from './AttendeeHeaderOld';
import { HostHeader as HostHeaderNew } from './HostHeader';
import { HostHeaderOld } from './HostHeaderOld';
import { type SocialHallHeaderProps } from './types';

const HostHeader = (props: SocialHallHeaderProps) => {
  const {
    flags: { socialHallVideoCall },
  } = useLaunchDarkly();

  return socialHallVideoCall ? (
    <HostHeaderNew {...props} />
  ) : (
    <HostHeaderOld {...props} />
  );
};

const AttendeeHeader = (props: SocialHallHeaderProps) => {
  const {
    flags: { socialHallVideoCall },
  } = useLaunchDarkly();

  return socialHallVideoCall ? (
    <AttendeeHeaderNew {...props} />
  ) : (
    <AttendeeHeaderOld {...props} />
  );
};

export { HostHeader, AttendeeHeader };
