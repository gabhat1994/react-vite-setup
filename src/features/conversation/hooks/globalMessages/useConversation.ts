/* eslint-disable import/order */
import { cleanList } from '@/utils/list';
import { useContext } from 'react';

import { useQuery } from 'react-query';

import { type Conversation } from '@twilio/conversations';

import { useGetConversationByCidQuery } from '@/apollo/graphql';
import { type ChatConversation } from '@/features/conversation/types';

import { TwilioClientContext } from '../../contexts/TwilioClientContext';
import { isValidConversationSid } from '@/features/conversation/helpers';

interface UseConversationOptions {
  sid?: string;
}

export function useConversation({
  sid,
}: UseConversationOptions): ChatConversation {
  const { client, isInitialized } = useContext(TwilioClientContext);

  const enabled = isValidConversationSid(sid);

  const { data: twilioConversation } = useQuery<Conversation>({
    queryKey: ['conversation', sid],
    queryFn: () => client!.getConversationBySid(sid!),
    enabled: !!client && isInitialized && enabled,
    // We don't want to garbage-collect the conversation object from cache, unless user leaves the conversation.
    // Any changes (events) to the conversation metadata will trigger a manual update.
    staleTime: Infinity,
  });

  const { data: backendConversationData } = useGetConversationByCidQuery({
    variables: { cid: sid },
    skip: !enabled,
  });

  const backendConversation = backendConversationData?.getConversationByCid;
  const participants = cleanList(backendConversation?.participants);

  return {
    conversation: twilioConversation,
    conversationType: backendConversation?.type,
    participants,
  };
}
