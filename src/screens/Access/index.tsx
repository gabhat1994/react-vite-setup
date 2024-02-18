import { useLaunchDarkly } from '@/hooks';
import { AccessV2 } from './AccessV2';
import AccessV1 from './Access';

const Access = () => {
  const {
    flags: { newSignUp },
  } = useLaunchDarkly();

  return newSignUp ? <AccessV2 /> : <AccessV1 />;
};
export default Access;
