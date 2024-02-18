import { Route, Routes, useNavigate } from 'react-router';
import { useCallback } from 'react';
import { GlobalMessageLayout } from '@/layout/GlobalMessageLayout';
import { ActiveConversationProvider } from '@/features/conversation/contexts/ActiveConversationProvider';
import { ConversationViewProvider } from '@/features/conversation/contexts/ConversationViewProvider';
import { NewConversationProvider } from '@/features/conversation/contexts/NewConversationProvider';
import { TwilioClientProvider } from '@/features/conversation/contexts/TwilioClientProvider';
import routes from '@/constants/routes';
import { useMarkConversationsAsViewedMutation } from '@/apollo/graphql';
import MessageContent from './MessageContent/MessageContent';
import { GlobalMessageProvider } from './contexts/GlobalMessageProvider';
import GlobalMessagesRedirect from './GlobalMessagesRedirect';

const GlobalMessages = () => {
  const navigate = useNavigate();
  const [markConversationsAsViewed] = useMarkConversationsAsViewedMutation();

  const onConversationCreated = useCallback(
    (id: string) => {
      navigate(`${routes.MESSAGES}/${id}`);
    },
    [navigate],
  );

  const onLoadConversations = useCallback(() => {
    markConversationsAsViewed({
      variables: {
        date: new Date().toISOString(),
      },
    });
  }, [markConversationsAsViewed]);

  return (
    <ConversationViewProvider>
      <GlobalMessageProvider>
        <TwilioClientProvider onLoadConversations={onLoadConversations}>
          <ActiveConversationProvider>
            <NewConversationProvider onCreated={onConversationCreated}>
              <GlobalMessageLayout>
                <Routes>
                  <Route path=":id" element={<MessageContent />} />
                  <Route element={<GlobalMessagesRedirect />} index />
                </Routes>
              </GlobalMessageLayout>
            </NewConversationProvider>
          </ActiveConversationProvider>
        </TwilioClientProvider>
      </GlobalMessageProvider>
    </ConversationViewProvider>
  );
};

export default GlobalMessages;
