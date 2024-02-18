import { useLaunchDarkly } from '@/hooks/launchDarkly';
import {
  SocialHallProvider,
  SocialHallCallProvider,
  SocialHallEventProvider,
} from '@/providers';
import { useAuth } from '@/features/auth/contexts';
import { InitialSettings } from '@/features/socialHall/components';
import SocialHall from './SocialHall';

const SocialHallWrapper = () => {
  const {
    flags: { noumsSocialHall },
  } = useLaunchDarkly();

  const { isAcceptedSkipMediaTesting } = useAuth();

  return noumsSocialHall ? (
    <SocialHallProvider>
      <SocialHallEventProvider>
        <SocialHallCallProvider>
          {!isAcceptedSkipMediaTesting ? <InitialSettings /> : <SocialHall />}
        </SocialHallCallProvider>
      </SocialHallEventProvider>
    </SocialHallProvider>
  ) : (
    <div />
  );
};

export default SocialHallWrapper;
