import {
  createContext,
  type FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import * as Sentry from '@sentry/react';
import { Client, type Conversation } from '@twilio/conversations';
import { useCreateTwilioTokenMutation } from '@/apollo/graphql';
import { useAuth } from '@/features/auth/contexts';
import { SpaceConversationHooks } from '@/features/conversation/hooks/noumMessages';

type TwilioClientV3ContextProps = {
  client: Client | undefined;
  isInitialized: boolean;
};

export const TwilioClientV3Context = createContext<TwilioClientV3ContextProps>({
  client: undefined,
  isInitialized: false,
});

export const TwilioClientV3Provider: FC = ({ children }) => {
  const { user } = useAuth();
  const isAuthenticated = !!user?._id;
  const [createTwilioToken] = useCreateTwilioTokenMutation();
  const [twilioClient, setTwilioClient] = useState<Client>();
  const [token, setToken] = useState<string>();
  const [isClientInitialized, setIsClientInitialized] = useState(false);
  const [isConversationsListLoaded, setIsConversationsListLoaded] =
    useState(false);

  const addTwilioConversationMutation =
    SpaceConversationHooks.useAddTwilioConversationMutation();

  const value = useMemo(
    () => ({
      client: twilioClient,
      isInitialized: isConversationsListLoaded,
    }),
    [twilioClient, isConversationsListLoaded],
  );

  const initializeClient = useCallback(async () => {
    if (token) {
      setIsClientInitialized(false);
      const client = new Client(token);
      setTwilioClient(client);
    }
  }, [token]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fn = async () => {
      try {
        const { data } = await createTwilioToken();
        if (data?.createTwilioToken?.token) {
          setToken(data?.createTwilioToken?.token);
        }
      } catch (error) {
        let message = 'Unknown';
        if (error instanceof Error) {
          message = error.message;
        }
        Sentry.captureException(new Error(message), {
          tags: {
            section: 'createTwilioToken',
          },
        });
      }
    };
    fn();
  }, [createTwilioToken, isAuthenticated]);

  useEffect(() => {
    initializeClient();
  }, [initializeClient, token]);

  useEffect(() => {
    if (!twilioClient) {
      return;
    }

    twilioClient.on('stateChanged', (state) => {
      if (state === 'initialized') {
        setIsClientInitialized(true);
      }
    });

    twilioClient.on('connectionStateChanged', async (state) => {
      if (state === 'disconnecting' || state === 'disconnected') {
        initializeClient();
      }
    });
  }, [initializeClient, twilioClient]);

  useEffect(() => {
    if (!twilioClient || !isClientInitialized) {
      return;
    }

    twilioClient.getSubscribedConversations().then(() => {
      setIsConversationsListLoaded(true);
    });
  }, [isClientInitialized, twilioClient]);

  useEffect(() => {
    if (twilioClient && isClientInitialized) {
      twilioClient.on('conversationJoined', (conversation: Conversation) => {
        addTwilioConversationMutation({ conversation });
      });

      twilioClient.on('conversationUpdated', ({ conversation }) => {
        addTwilioConversationMutation({ conversation });
      });
    }
  }, [addTwilioConversationMutation, isClientInitialized, twilioClient]);

  useEffect(
    () => () => {
      twilioClient?.removeAllListeners();
      // When this component is unmounted (most likely because of hot-reloading on local machine)
      // we want to set this flag to false so we can set up the client correctly again.
      setIsClientInitialized(false);
    },
    [twilioClient],
  );

  return (
    <TwilioClientV3Context.Provider value={value}>
      {children}
    </TwilioClientV3Context.Provider>
  );
};
