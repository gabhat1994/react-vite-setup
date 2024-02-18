import styled from 'styled-components';
import { TSpan } from '@/components/Typography';
import { sizes } from '@/constants/devices';
import { defaultScrollBar } from '@/common/globalStyles';

const containerWidth = 368;

export const ChatWrapper = styled.div<{ show: boolean }>`
  display: flex;
  flex-direction: column;
  box-shadow: -1px 0 0 var(--bg-separator-neutral-default);
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
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

export const ChatHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 1px 0 var(--bg-separator-neutral-default);
  padding: 16px 0;
`;

export const MessageListWrapper = styled.div`
  padding: 12px;
  flex: 1;
  overflow: auto;
  overflow-x: hidden;
  min-width: ${containerWidth - 48}px;
  ${defaultScrollBar}
`;

export const MessageInputWrapper = styled.div<{ disabled: boolean }>`
  width: 100%;
  padding: 12px 24px 16px 0;
  box-sizing: border-box;
  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.6;
    pointer-events: none;
  `};
`;

export const TitleSpan = styled(TSpan)`
  font-size: 16px;
  font-weight: 600;
  line-height: 150%;
`;

export const CloseButton = styled.div<{ socialHallVideoCall?: boolean }>`
  position: absolute;
  top: 16px;
  ${({ socialHallVideoCall }) =>
    socialHallVideoCall ? 'left: 16px;' : 'right: 16px;'};
  cursor: pointer;
`;

export const NoMessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const NotificationMessage = styled.div`
  text-align: center;
  font-size: 12px;
  line-height: 19px;
  font-family: var(--font-family);
  color: var(--text-body-header-neutral-default);
`;

export const NotificationTime = styled(NotificationMessage)`
  color: var(--text-timestamp-neutral-default);
`;
