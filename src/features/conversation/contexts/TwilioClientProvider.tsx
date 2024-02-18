/* eslint-disable no-console */
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { debounce, throttle } from 'lodash';
import { useQueryClient } from 'react-query';

import * as Sentry from '@sentry/react';
import { Client, type Conversation, type Message } from '@twilio/conversations';

import { useCreateTwilioTokenMutation } from '@/apollo/graphql';

import { TwilioClientContext } from './TwilioClientContext';
import ConversationHooks from '../hooks/globalMessages';
import { ConversationViewContext } from './ConversationViewContext';

type TwilioClientProviderProps = {
  children: React.ReactNode;
  onLoadConversations?: () => void;
};

export const TwilioClientProvider = ({
  children,
  onLoadConversations,
}: TwilioClientProviderProps) => {
  const queryClient = useQueryClient();

  const [createTwilioToken] = useCreateTwilioTokenMutation();
  const [twilioClient, setTwilioClient] = useState<Client>();
  const [token, setToken] = useState<string>();
  const [isClientInitialized, setIsClientInitialized] = useState(false);
  const [isConversationsListLoaded, setIsConversationsListLoaded] =
    useState(false);
  const conversationsBuffer = useRef<Conversation[]>([]);

  const { addMessage } = ConversationHooks.useMessageHandlers();
  const { conversationType } = useContext(ConversationViewContext);
  const { bulkAddConversations, updateConversation, removeConversation } =
    ConversationHooks.useConversationHandlers(conversationType);
  const {
    addConversationParticipant,
    updateConversationParticipant,
    removeConversationParticipant,
  } = ConversationHooks.useParticipantHandlers();

  const throttledFlushConversationBuffer = useMemo(
    () =>
      throttle(
        () => {
          bulkAddConversations({
            conversations: conversationsBuffer.current,
            isInitialized: isConversationsListLoaded,
          });
          conversationsBuffer.current = [];
        },
        300,
        {
          leading: false,
          trailing: true,
        },
      ),
    [bulkAddConversations, isConversationsListLoaded],
  );

  const doubouncedConversationsBuffer = useMemo(
    () => debounce(() => setIsConversationsListLoaded(true), 1500),
    [],
  );

  const handleConversationAdded = useCallback(
    (conversation: Conversation) => {
      conversationsBuffer.current.push(conversation);
      throttledFlushConversationBuffer();
      doubouncedConversationsBuffer();
    },
    [throttledFlushConversationBuffer, doubouncedConversationsBuffer],
  );

  const initializeClient = useCallback(async () => {
    if (token) {
      setIsClientInitialized(false);
      const client = new Client(token);
      setTwilioClient(client);
    }
  }, [token]);

  useEffect(() => {
    if (isClientInitialized) {
      return;
    }

    const fn = async () => {
      try {
        const { data } = await createTwilioToken();
        console.log(
          '[TwilioV2] generating new token: ',
          data?.createTwilioToken?.token,
        );
        if (data?.createTwilioToken?.token) {
          setToken(data?.createTwilioToken?.token);
        }
      } catch (e) {
        console.log('[TwilioV2] generating token failed:', e);
        Sentry.captureException(e);
      }
    };
    fn();
  }, [createTwilioToken, isClientInitialized]);

  useEffect(() => {
    if (!isClientInitialized) {
      initializeClient();
    }
  }, [initializeClient, isClientInitialized]);

  useEffect(() => {
    if (isConversationsListLoaded) {
      console.log('[TwilioV2] conversations list loaded');
      onLoadConversations?.();
    }
  }, [isConversationsListLoaded, onLoadConversations]);

  useEffect(() => {
    if (!twilioClient) {
      return;
    }

    twilioClient.on('stateChanged', (state) => {
      console.log('[TwilioV2] stateChanged', state);
      if (state === 'initialized') {
        setIsClientInitialized(true);
      }
    });

    twilioClient.on('connectionStateChanged', async (state) => {
      console.log('[TwilioV2] connectionStateChanged:', state);
      if (state === 'disconnecting' || state === 'disconnected') {
        initializeClient();
      }
    });
  }, [initializeClient, twilioClient]);

  useEffect(() => {
    if (!twilioClient || !isClientInitialized) {
      return undefined;
    }

    twilioClient.getSubscribedConversations().then(() => {
      // console.log('[TwilioV2] getSubscribedConversations resolved');
      setIsConversationsListLoaded(true);
    });

    twilioClient.on('conversationJoined', (conversation: Conversation) => {
      // Skip empty conversations.
      if (!conversation.lastMessage) {
        // console.log('[TwilioV2] conversationJoined, empty conversation - leaving:', conversation.sid)
        // conversation.leave()
        return;
      }

      // console.log('[TwilioV2] conversationJoined:', conversation.sid);
      handleConversationAdded(conversation);
    });

    twilioClient.on(
      'conversationUpdated',
      ({ conversation, updateReasons }) => {
        console.log(
          '[TwilioV2] conversationUpdated:',
          conversation.sid,
          'reasons:',
          updateReasons,
        );
        updateConversation({ conversation });
      },
    );

    twilioClient.on('conversationLeft', (conversation) => {
      // console.log('[TwilioV2] conversationLeft:', conversation.sid);
      removeConversation({ conversation });
    });

    twilioClient.on('participantJoined', (participant) => {
      // console.log('[TwilioV2] participantJoined:', participant.identity);
      addConversationParticipant({ participant });
    });

    twilioClient.on('participantUpdated', ({ participant, updateReasons }) => {
      // console.log(
      //   '[TwilioV2] participantUpdated:',
      //   participant.identity,
      //   'reasons:',
      //   updateReasons,
      // );
      if (updateReasons.includes('lastReadMessageIndex')) {
        updateConversationParticipant({ participant });
      }
    });

    twilioClient.on('participantLeft', (participant) => {
      // console.log('[TwilioV2] participantLeft:', participant.identity);
      removeConversationParticipant({ participant });
    });

    twilioClient.on('messageAdded', (message: Message) => {
      // console.log('[TwilioV2] messageAdded:', message.body);
      addMessage({ message });
    });

    return () => {
      twilioClient.removeAllListeners();
    };
  }, [
    addConversationParticipant,
    addMessage,
    handleConversationAdded,
    initializeClient,
    isClientInitialized,
    removeConversation,
    removeConversationParticipant,
    twilioClient,
    updateConversation,
    updateConversationParticipant,
  ]);

  useEffect(() => () => queryClient?.clear(), [queryClient]);

  const value = useMemo(
    () => ({
      client: twilioClient,
      isInitialized: isConversationsListLoaded,
    }),
    [twilioClient, isConversationsListLoaded],
  );

  return (
    <TwilioClientContext.Provider value={value}>
      {children}
    </TwilioClientContext.Provider>
  );
};
