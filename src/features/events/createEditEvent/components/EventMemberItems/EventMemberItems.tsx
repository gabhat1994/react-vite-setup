import { Stack } from '@/layout';
import { Spinner } from '@/components/Spinner';
import { useAuth } from '@/features/auth/contexts';
import { EventMemberItem } from './EventMemberItem';

import { SpinnerContainer } from './styles';
import type { EventHostsViewProps } from './types';

export const EventMemberItems = ({
  type,
  members,
  loading,
  onRemove,
}: EventHostsViewProps) => {
  const { user } = useAuth();
  return (
    <Stack vertical gap={12} fullWidth data-testid="event-hosts-view">
      {members.map((member) => (
        <EventMemberItem
          type={type}
          user={member}
          key={member._id}
          currentUser={user?._id}
          onRemove={onRemove}
        />
      ))}
      {loading && (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      )}
    </Stack>
  );
};
