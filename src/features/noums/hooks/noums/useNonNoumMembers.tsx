import { useMemo } from 'react';
import { type InviteNonNoumUserOutput } from '@/apollo/generated/types';
import { useGetInviteNonNoumenaMemberQuery } from '@/apollo/graphql';
import { cleanList } from '@/utils/list';

export const useNonNoumMembers = (id: string) => {
  const {
    data: nonMembersData,
    loading: loadingNonMembers,
    refetch: refetchNonMembers,
  } = useGetInviteNonNoumenaMemberQuery({
    skip: !id,
    fetchPolicy: 'cache-and-network',
    variables: {
      noumId: id,
    },
    notifyOnNetworkStatusChange: true,
  });
  const nonMembers: InviteNonNoumUserOutput[] = useMemo(
    () =>
      cleanList(
        nonMembersData?.getinviteNonNoumenaMember?.data?.filter(
          (item) => item?.isActive || item?.isVerified,
        ),
      ),
    [nonMembersData?.getinviteNonNoumenaMember?.data],
  );
  return {
    refetchNonMembers,
    nonMembers,
    loadingNonMembers,
  };
};

export default useNonNoumMembers;
