import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const HeadingWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const FilterWrapper = styled.div`
  display: flex;
  align-self: flex-end;
  align-items: center;
  flex-direction: row;
  justify-content: space-evenly;
  width: 60%;
`;

export const MobileContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  padding: 0 24px;
  position: absolute;
  width: 100%;
  bottom: 20px;
  flex-direction: row;
  justify-content: flex-end;
`;
