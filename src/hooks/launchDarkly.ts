import { useContext } from 'react';
import { LaunchDarklyContext } from '@/providers';

export const useLaunchDarkly = () => {
  const { flags, identifyUser, initialized } = useContext(LaunchDarklyContext);

  return {
    flags,
    identifyUser,
    initialized,
  };
};

export default useLaunchDarkly;
