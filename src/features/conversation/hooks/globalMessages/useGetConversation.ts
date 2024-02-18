import { useCallback } from 'react';

import { useGetConversationLazyQuery } from '@/apollo/graphql';
import { cleanList } from '@/utils/list';
import { type Maybe } from '@/apollo/generated/types';

export function useGetConversation({
  participantIds,
  noumId,
}: {
  participantIds: string[];
  noumId?: Maybe<string> | undefined;
}) {
  const [getConversation] = useGetConversationLazyQuery();

  const getConversationInfo = useCallback(async () => {
    if (participantIds.length === 0) {
      return { sid: '', isInitialized: false };
    }

    const { data } = await getConversation({
      variables: { userIds: cleanList([...participantIds]), spaceId: noumId },
    });

    return { sid: data?.getConversation?.cid, isInitialized: true };
  }, [getConversation, noumId, participantIds]);

  return { getConversationInfo };
}
