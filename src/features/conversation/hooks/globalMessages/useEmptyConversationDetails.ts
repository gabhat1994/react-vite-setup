import { useUsersQuery } from '@/apollo/graphql';
import { useAuth } from '@/features/auth/contexts';
import { cleanList } from '@/utils/list';
import { useConversationMetadata } from './useConversationMetadata';

interface UseEmptyConversationDetailsOptions {
  participantIds: string[];
}
export function useEmptyConversationDetails({
  participantIds,
}: UseEmptyConversationDetailsOptions) {
  const { user: currentUser } = useAuth();

  const { data: usersData } = useUsersQuery({
    variables: {
      filter: {
        userIds: participantIds,
      },
    },
    skip: participantIds.length === 0,
  });

  const participants = cleanList(usersData?.users);
  const metadata = useConversationMetadata({ participants });

  return {
    ...metadata,
    createdBy: currentUser,
    isConversationBlocked: false,
  };
}
