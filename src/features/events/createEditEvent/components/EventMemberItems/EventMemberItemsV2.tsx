import { Stack } from '@/layout';
import { Spinner } from '@/components/Spinner';
import { useAuth } from '@/features/auth/contexts';
import { EventMemberItem } from './EventMemberItem';

import { SpinnerContainer } from './styles';
import type { EventHostsViewProps } from './types';

export const EventMemberItemsV2 = ({
  type,
  members,
  loading,
  onRemove,
}: EventHostsViewProps) => {
  const { user } = useAuth();
  return (
    <Stack vertical gap={12} fullWidth data-testid="event-hosts-view">
      {members.map((member, index) => (
        <EventMemberItem
          splitter={members.length - 1 !== index}
          type={type}
          user={member}
          key={member._id}
          isNoumEditor={true}
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
