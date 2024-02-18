import * as Sentry from '@sentry/react';
import { type Participant, type Conversation } from '@twilio/conversations';
import { useCallback } from 'react';
import { useQueryClient } from 'react-query';

import { useGetConversationByCidLazyQuery } from '@/apollo/graphql';
import { useAuth } from '@/features/auth/contexts';
import { useTwilioClient } from '../twilioClient';
import {
  type NoumConversation,
  NoumConversationType,
  NoumParticipantPermission,
  NoumParticipantRole,
  type ParticipantAttributes,
} from '../../types';

export function useConversationHelpers() {
  const { user } = useAuth();
  const { client: twilioClient } = useTwilioClient();
  const queryClient = useQueryClient();
  const [getConversationByCid] = useGetConversationByCidLazyQuery();

  const isNoumParticipant = useCallback((participant: Participant): boolean => {
    const attributes = participant!.attributes as ParticipantAttributes;

    if (
      attributes &&
      attributes.role === NoumParticipantRole.OWNER &&
      attributes.permission === NoumParticipantPermission.READ_ONLY
    ) {
      return false;
    }

    return true;
  }, []);

  const getNoumConversationType = useCallback(
    async (
      conversation: Conversation,
    ): Promise<NoumConversationType | 'unknown'> => {
      try {
        const myParticipant = await conversation.getParticipantByIdentity(
          user?._id,
        );
        if (!myParticipant) return 'unknown';

        const attributes = myParticipant!.attributes as ParticipantAttributes;
        if (
          attributes &&
          attributes.role === NoumParticipantRole.OWNER &&
          attributes.permission === NoumParticipantPermission.READ_ONLY
        ) {
          return NoumConversationType.OTHERS;
        }
        return NoumConversationType.MINE;
      } catch (error) {
        let message = '[GetParticipantOfCurrentUser] Unknown Error';
        if (error instanceof Error) {
          message = error.message;
        }
        Sentry.captureException(new Error(message), {
          tags: {
            section: 'GetParticipantOfCurrentUser',
          },
        });

        return 'unknown';
      }
    },
    [user?._id],
  );

  const getTwilioConversation = useCallback(
    async (sid: string) => {
      let conversation = queryClient.getQueryData<Conversation>([
        'twilio-conversation',
        sid,
      ]);

      if (!conversation) {
        conversation = await twilioClient!.getConversationBySid(sid);
        queryClient.setQueryData<Conversation>(
          ['twilio-conversation', conversation.sid],
          conversation,
        );
      }

      return conversation;
    },
    [queryClient, twilioClient],
  );

  const getConversation = useCallback(
    async (key: string, sid: string) => {
      let conversation = queryClient.getQueryData<NoumConversation>([
        'key',
        sid,
      ]);

      if (!conversation) {
        const twilioConversation = await getTwilioConversation(sid);
        const { data } = await getConversationByCid({
          variables: { cid: twilioConversation.sid },
        });
        const conversationData = data?.getConversationByCid;
        if (!conversationData) {
          return null;
        }

        conversation = { twilioConversation, conversationData };
        queryClient.setQueryData<NoumConversation>(
          [key, conversation.twilioConversation.sid],
          conversation,
        );
      }

      return conversation;
    },
    [getConversationByCid, getTwilioConversation, queryClient],
  );

  return {
    isNoumParticipant,
    getNoumConversationType,
    getTwilioConversation,
    getConversation,
  };
}
