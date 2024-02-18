import styled from 'styled-components';
import { UserProfilePopup } from './UserProfilePopup';
import { GroupProfilePopup } from './GroupProfilePopup';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  height: 90vh;
  background-color: var(--bg-tablecell-neutral-alt-default);
`;

export const UserPopup = () => (
  <Wrapper>
    <UserProfilePopup
      attendeeId=""
      showUserPopup={true}
      showKnockBtn={true}
      onCloseUserPopup={() => {}}
    />
  </Wrapper>
);

export const GroupPopup = () => (
  <Wrapper>
    <GroupProfilePopup
      groupId=""
      showGroupPopup={true}
      onCloseGroupPopup={() => {}}
    />
  </Wrapper>
);

export default {
  title: 'UI/SocialHall/ProfilePopup',
  component: UserPopup,
};
