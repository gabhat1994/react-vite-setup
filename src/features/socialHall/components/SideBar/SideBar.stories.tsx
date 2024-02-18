import styled from 'styled-components';
import { SideBar } from './SideBar';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  height: 90vh;
`;

export const SocialHallSideBar = () => (
  <Wrapper>
    <SideBar />
  </Wrapper>
);

export default {
  title: 'UI/SocialHall/SideBar',
  component: SideBar,
};
