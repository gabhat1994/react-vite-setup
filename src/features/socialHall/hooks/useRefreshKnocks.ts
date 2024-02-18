import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useError } from '@/hooks/useError';
import {
  useUserActiveKnocksQuery,
  useUserOwnKnocksQuery,
} from '@/apollo/graphql';

export const useRefreshKnocks = () => {
  const { logError } = useError();
  const { id = '' } = useParams();

  const userOwnKnocks = useUserOwnKnocksQuery({
    skip: true,
    variables: {
      socialHallId: id,
    },
  });

  const userActiveKnocks = useUserActiveKnocksQuery({
    skip: true,
    variables: {
      socialHallId: id,
    },
  });

  const refreshActiveKnocks = async () => {
    try {
      // await userActiveKnocks.refetch();
    } catch (e) {
      logError(e, '');
    }
  };

  const refreshOwnKnocks = async () => {
    try {
      // await userOwnKnocks.refetch();
    } catch (e) {
      logError(e, '');
    }
  };

  const refreshAllKnocks = async () => {
    try {
      // await userActiveKnocks.refetch();
      // await userOwnKnocks.refetch();
    } catch (e) {
      logError(e, '');
    }
  };

  const useOwnKnocksData = useMemo(
    () => userOwnKnocks.data?.userOwnKnocks,
    [userOwnKnocks.data?.userOwnKnocks],
  );
  const userActiveKnocksData = useMemo(
    () => userActiveKnocks.data?.userActiveKnocks,
    [userActiveKnocks.data?.userActiveKnocks],
  );

  return {
    refreshAllKnocks,
    refreshOwnKnocks,
    refreshActiveKnocks,
    userOwnKnocks: useOwnKnocksData,
    userActiveKnocks: userActiveKnocksData,
  };
};

export default useRefreshKnocks;
