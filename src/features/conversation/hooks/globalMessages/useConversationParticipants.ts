import { useQuery } from 'react-query';
import { useMemo } from 'react';
import { cleanList } from '@/utils/list';

import { useConversation } from './useConversation';
import { isNoumParticipant } from '../../helpers';

interface UseConversationParticipantsOptions {
  sid: string;
}

export function useConversationParticipants({
  sid,
}: UseConversationParticipantsOptions) {
  const { conversation } = useConversation({ sid });

  const { data = [], status } = useQuery({
    queryKey: ['conversation-participants', sid],
    queryFn: () => conversation?.getParticipants(),
    enabled: !!conversation,
  });

  const participants = useMemo(
    () => cleanList(data.map((ptp) => (isNoumParticipant(ptp) ? ptp : null))),
    [data],
  );

  return { participants, status };
}
