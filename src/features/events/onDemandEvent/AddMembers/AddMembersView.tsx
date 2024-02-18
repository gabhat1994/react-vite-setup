import { Spinner } from '@/components/Spinner';

import { type EventMembersViewProps } from './types';
import {
  EventUsersViewWrapper,
  EventUsersWrapper,
  SpinnerContainer,
} from './styles';
import { EventMemberItem } from '../../createEditEvent/components/EventMemberItems/EventMemberItem';

export const AddMembersView = ({
  members,
  loading,
  onRemoveMember,
}: EventMembersViewProps) => (
  <EventUsersViewWrapper data-testid="event-members-view">
    <EventUsersWrapper>
      {members.map((member) => (
        <EventMemberItem
          key={member._id}
          user={member}
          type="member"
          onRemove={onRemoveMember}
        />
      ))}
    </EventUsersWrapper>
    {loading && (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    )}
  </EventUsersViewWrapper>
);
