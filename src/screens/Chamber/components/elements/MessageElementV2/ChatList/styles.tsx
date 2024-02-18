import styled, { css } from 'styled-components';
import { devices } from '@/constants/devices';

export const SpinnerContainer = styled.div`
  padding: 16px;
  position: relative;
`;

export const ChatListWrapper = styled.div<{
  justify?: boolean;
  isCollapse?: boolean;
}>`
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  box-sizing: border-box;
  flex-direction: ${({ isCollapse }) => (isCollapse ? 'row' : 'column')};
  align-items: center;
  ${({ justify }) => (justify ? 'justify-content: center;' : undefined)}
  @media ${devices.TABLET} {
    padding: ${({ isCollapse }) => (isCollapse ? '15px 42px 16px 16px;' : '0')};
  }
  ${({ isCollapse }) =>
    isCollapse &&
    css`
      padding: 16px;

      @media ${devices.MOBILE_L} {
        padding-right: 35px;
      }

      @media ${devices.LAPTOP} {
        padding: 16px 30px 24px 24px;
      }
    `};
`;

export const SeeAllMessages = styled.div`
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;

  div {
    margin-top: 2px;
  }
`;
