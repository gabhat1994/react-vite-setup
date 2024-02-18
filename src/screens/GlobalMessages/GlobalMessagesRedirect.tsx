import { useContext } from 'react';
import { Navigate, useLocation, useParams } from 'react-router';
import routes from '@/constants/routes';
import { ActiveConversationContext } from '@/features/conversation/contexts/ActiveConversationContext';
import MessageContent from './MessageContent/MessageContent';

const GlobalMessagesRedirect = () => {
  const location = useLocation();
  const { id } = useParams();
  const { activeConversationSid } = useContext(ActiveConversationContext);

  if (
    activeConversationSid &&
    location.pathname.includes(routes.MESSAGES) &&
    !id
  )
    return (
      <Navigate replace to={`${routes.MESSAGES}/${activeConversationSid}`} />
    );

  return <MessageContent />;
};

export default GlobalMessagesRedirect;
