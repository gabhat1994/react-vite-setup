import {
  GetInviteNonNoumenaMemberDocument,
  type SpaceOutputFragment,
  useInviteNonNoumenaMemberMutation,
  type GetInviteNonNoumenaMemberQuery,
} from '@/apollo/graphql';
import { useCallback } from 'react';

export function useSendNonMemberConnectionInviteHelper() {
  const [inviteNonNoumenaMemberMutation, { loading }] =
    useInviteNonNoumenaMemberMutation();

  const sendNonMemberInvite = useCallback(
    async (
      requestedForNoumId: string,
      email: string,
      firstName: string,
      lastName: string,
      noum: SpaceOutputFragment,
      message: string = '',
    ) =>
      inviteNonNoumenaMemberMutation({
        variables: {
          input: {
            requestedForNoumId,
            email,
            firstName,
            lastName,
            noumDetails: {
              title: noum.name || '',
              profileUrl: noum?.profileImage || '',
              owner: `${noum.uid?.firstName || ''} ${
                noum.uid?.middleName || ''
              } ${noum.uid?.lastName || ''}`.trim(),
              type: noum?.category?.name || '',
            },
            message: message || '',
          },
        },
        update: (cache, { data }) => {
          if (!data || !data.inviteNonNoumenaMember) return;
          const { getinviteNonNoumenaMember: nonMemberData } = cache.readQuery({
            query: GetInviteNonNoumenaMemberDocument,
            variables: { noumId: requestedForNoumId },
          }) as GetInviteNonNoumenaMemberQuery;
          const cloneConnections = nonMemberData?.data || [];
          const mergedArray = [
            {
              _id: data.inviteNonNoumenaMember?.id,
              __typename: data.inviteNonNoumenaMember?.__typename,
              token: null,
              isActive: true,
              requestedForNoumId,
              uid: {
                email,
                firstName,
                lastName,
              },
            },
            ...cloneConnections,
          ];
          cache.writeQuery({
            query: GetInviteNonNoumenaMemberDocument,
            variables: { noumId: requestedForNoumId },
            data: {
              getinviteNonNoumenaMember: mergedArray,
            },
          });
        },
      }),
    [inviteNonNoumenaMemberMutation],
  );

  return {
    sendNonMemberInvite,
    loading,
  };
}
