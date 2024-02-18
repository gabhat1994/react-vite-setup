import styled from 'styled-components';
import { sizes } from '@/constants/devices';
import { noScrollBar } from '@/common/globalStyles';
import { TSpan } from '@/components/Typography';

export const SideBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 368px;
  border-right: 1px var(--bg-separator-neutral-default) solid;
  border-left: 1px var(--bg-separator-neutral-default) solid;
  box-sizing: border-box;

  @media (max-width: ${sizes.MOBILE_MAX}) {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: var(--bg-button-neutral-alt-default);
    box-shadow: none;
    z-index: 3;
  }
`;

export const SideBarHeaderWrapper = styled.div`
  position: relative;
  display: flex;
  height: 56px;
  justify-content: center;
  align-items: center;
  border: 1px var(--bg-separator-neutral-default) solid;
`;

export const SideBarHeader = styled(TSpan)`
  width: 100%;
`;

export const CloseButton = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  cursor: pointer;
  @media (min-width: ${sizes.LAPTOP}) {
    display: none;
  }
`;

export const EmptyScreenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 8px 64px;
  gap: 8px;
  flex: 1;
`;

export const EmptyMessageSpan = styled(TSpan)`
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
`;

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  overflow-y: scroll;
  ${noScrollBar}
`;
