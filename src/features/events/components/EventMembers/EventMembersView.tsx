import { Spinner } from '@/components/Spinner';

import {
  EventUsersViewWrapper,
  EventUsersWrapper,
  SpinnerContainer,
} from '../UsersSearchSelector/styles';
import { type EventMembersViewProps } from './types';
import { EventMemberItem } from '../../createEditEvent/components/EventMemberItems/EventMemberItem';

export const EventMembersView = ({
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
