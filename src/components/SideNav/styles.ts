import styled from 'styled-components';
import { mediaSizes, sizes } from '@/constants/devices';

export const Wrapper = styled.div<{ isNoumSideBar: boolean }>`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  background-color: var(--bg-main-nav-neutral-alt-default);
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 12px 16px;
  z-index: 49;

  @media (min-width: ${sizes.MOBILE_L}) {
    padding: 12px;
  }

  @media (min-width: ${sizes.LAPTOP}) {
    flex-direction: column;
    position: relative;
    /* width: auto; */
    width: 100px;
    border-radius: 16px;
    padding: 12px;
  }

  ${({ isNoumSideBar }) =>
    isNoumSideBar &&
    `@media (max-width: ${mediaSizes.TABLET_MAX}) {
    top: 73px;
    height: 48px;
  }`}
`;

export const StoriesWrapper = styled.div`
  display: grid;
  height: 700px;
`;
