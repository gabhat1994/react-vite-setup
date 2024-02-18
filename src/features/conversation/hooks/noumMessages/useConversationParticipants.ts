import { useQuery } from 'react-query';
import { useMemo } from 'react';
import { cleanList } from '@/utils/list';

import { useConversation } from './useConversation';
import { useConversationHelpers } from './useConversationHelpers';

interface UseConversationParticipantsOptions {
  sid: string;
}

export function useConversationParticipants({
  sid,
}: UseConversationParticipantsOptions) {
  const { conversation } = useConversation({ sid });
  const { isNoumParticipant } = useConversationHelpers();
  const twilioConversation = conversation?.twilioConversation;

  const { data = [], status } = useQuery({
    queryKey: ['conversation-participants', sid],
    queryFn: () => twilioConversation!.getParticipants(),
    enabled: !!twilioConversation,
  });

  const participants = useMemo(
    () => cleanList(data.map((ptp) => (isNoumParticipant(ptp) ? ptp : null))),
    [data, isNoumParticipant],
  );

  return { participants, status };
}
