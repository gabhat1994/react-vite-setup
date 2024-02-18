import { useEffect, useCallback, useState } from 'react';
import { useKnockUpdatesSubscription } from '@/apollo/graphql';
import { type Knock, KnockType } from '@/apollo/generated/types';
import { HideDeclineKnockTimer } from '@/screens/SocialHall/const';
import { useSocialHallContext } from '@/providers/SocialHallProvider';
import { useRefreshKnocks } from '../useRefreshKnocks';

export const useKnockSubscription = () => {
  const [declinedKnocks, setDeclinedKnocks] = useState<Knock[]>([]);
  const { socialHallAttendeesAndGroups, userActiveGroupData, socialHallId } =
    useSocialHallContext();

  const { userOwnKnocks, refreshAllKnocks, refreshOwnKnocks } =
    useRefreshKnocks();

  const { data } = useKnockUpdatesSubscription({
    variables: {
      socialHallId,
    },
  });

  const updateDeclinedKnocksState = useCallback(
    (knockId: string) => {
      setTimeout(() => {
        const knocks = declinedKnocks.filter(({ _id }) => _id === knockId);
        setDeclinedKnocks(knocks);
      }, HideDeclineKnockTimer);
    },
    [declinedKnocks],
  );

  const handleKnockDeclined = async (knockId: string) => {
    const declined = userOwnKnocks?.data?.find(
      (_knock) => _knock?._id === knockId,
    );
    const duplicateKnocks = declinedKnocks.find(({ _id }) => _id === knockId);

    if (!duplicateKnocks) {
      await refreshOwnKnocks();

      // keep adding new declined knocks on top
      if (declined) {
        const knocks: Knock[] = [
          { ...declined!, knockStatus: KnockType.Declined } as Knock,
          ...declinedKnocks,
        ];
        setDeclinedKnocks(knocks);
        updateDeclinedKnocksState(declined._id);
      }
    }
  };

  const handleKnockAccepted = () => {
    refreshAllKnocks();
    userActiveGroupData?.refetch();
    socialHallAttendeesAndGroups?.refetch();
  };

  useEffect(() => {
    if (data?.knockUpdates.event !== undefined) {
      if (data?.knockUpdates.event === KnockType.Declined) {
        handleKnockDeclined(data?.knockUpdates._id);
      } else if (data?.knockUpdates.event === KnockType.Accepted) {
        handleKnockAccepted();
      } else if (data?.knockUpdates.event === KnockType.Cancelled) {
        refreshOwnKnocks();
      } else {
        refreshAllKnocks();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.knockUpdates.event, data?.knockUpdates._id]);

  return {
    declinedKnocks,
  };
};

export default useKnockSubscription;
