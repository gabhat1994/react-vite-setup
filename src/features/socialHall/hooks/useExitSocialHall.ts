import {
  useExitFromGroupMutation,
  useExitFromSocialHallMutation,
} from '@/apollo/graphql';
import { useError } from '@/hooks/useError';
import { useSocialHallContext } from '@/providers/SocialHallProvider';

export const useExitSocialHall = () => {
  const { logError } = useError();
  const { socialHallId } = useSocialHallContext();

  const [exitFromSocialHallMutation] = useExitFromSocialHallMutation({
    variables: {
      socialHallId: socialHallId!,
      fromLeaveCTA: true,
    },
  });

  const [exitFromGroup] = useExitFromGroupMutation();

  const exitFromSocialHallGroup = async (groupId: string) => {
    try {
      if (!socialHallId || !groupId) {
        return;
      }
      await exitFromGroup({
        variables: {
          groupId,
        },
      });
    } catch (e) {
      logError(e, '');
    }
  };

  const exitFromSocialHall = async () => {
    try {
      if (!socialHallId) {
        return;
      }
      await exitFromSocialHallMutation();
    } catch (e) {
      logError(e, '');
    }
  };

  return {
    exitFromSocialHall,
    exitFromSocialHallGroup,
  };
};

export default useExitSocialHall;
