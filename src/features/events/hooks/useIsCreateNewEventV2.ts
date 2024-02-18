import { useLaunchDarkly } from '@/hooks';

export const useIsCreateNewEventV2 = () => {
  const {
    flags: { createNewEventV2 },
  } = useLaunchDarkly();

  return createNewEventV2;
};
