import styled from 'styled-components';
import { sizes } from '@/constants/devices';
import { TSpan } from '@/components/Typography';

const containerWidth = 368;

export const SideBarWrapper = styled.div<{ show: boolean }>`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 368px;
  border-right: 1px var(--bg-separator-neutral-default) solid;
  border-left: 1px var(--bg-separator-neutral-default) solid;
  box-sizing: border-box;
  overflow: hidden;
  ${(props) =>
    props.show
      ? `
    width: ${containerWidth}px;
  `
      : `
    width: 0;
  `}

  @media (max-width: ${sizes.LAPTOP_SM}) {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    background-color: var(--bg-card-neutral-alt-default);
    box-shadow: none;
    z-index: 11;
    ${(props) =>
      props.show
        ? `
      width: 100%;
    `
        : `
      width: 0;
    `}
  }
`;

export const SideBarActionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 23px 20px;
  border-bottom: 1px var(--bg-separator-neutral-default) solid;
`;

export const SideBarHeaderWrapper = styled.div`
  padding-top: 8px;
  padding-left: 16px;
`;

export const SideBarHeader = styled(TSpan)`
  width: 100%;
`;

export const IconButton = styled.div`
  cursor: pointer;
`;

export const ListWrapper = styled.div<{ isScrollable: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  overflow-y: ${({ isScrollable }) =>
    !isScrollable &&
    `
      scroll;
    `};
  min-height: 73px;
`;
