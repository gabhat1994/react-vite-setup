import { cssVar, rgba } from 'polished';
import styled from 'styled-components';

export const Container = styled.div<{
  active: boolean;
  isFullScreen: boolean;
  isMinimalView: boolean;
}>`
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${({ active }) =>
    active
      ? '3px solid var(--border-card-brand-primary-default)'
      : '3px solid var(--border-badge-neutral-alt-default)'};
  background-color: var(--bg-card-neutral-default);
  box-sizing: border-box;
  overflow: ${({ isFullScreen }) => (isFullScreen ? 'visible' : 'hidden')};
`;

export const MediaPreviewWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

export const ContainerOverlay = styled.div<{
  handRaised: boolean;
  isNetworkError: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  position: relative;
  margin-bottom: 8px;
  position: absolute;
  top: 0;
  ${({ handRaised, isNetworkError }) =>
    (handRaised || isNetworkError) &&
    `background-color: ${rgba(cssVar('--bg-overlay-raisehand'), 0.5)};`};
`;

export const ThreeDotsIconWrapper = styled.div`
  cursor: pointer;
  background-color: ${rgba(cssVar('--bg-call-ui-neutral-default'), 0.35)};
  width: 24px;
  height: 24px;
  border-radius: 8px;
  padding: 4px;
  top: 8px;
  align-items: center;
  position: absolute;
  right: 7.5px;
  display: flex;
  justify-content: center;
`;

export const HandRaisedContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 9.33px;
`;

export const Userbadge = styled.div`
  position: absolute;
  bottom: 6.92px;
  left: 8px;
  gap: 8px;
  display: flex;
  align-items: center;
`;

export const NameContainer = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  height: 24px;
  letter-spacing: 0.5px;
  background-color: ${({ active }) =>
    active
      ? 'var(--bg-call-ui-brand-primary-default)'
      : rgba(cssVar('--bg-call-ui-neutral-default'), 0.35)};
  border-radius: 8px;
  padding: ${({ active }) => (active ? '1px 8px' : '0 8px')};
`;

export const SpinnerContainer = styled.div`
  width: 24px;
  height: 24px;
`;
