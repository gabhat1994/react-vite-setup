import styled, { keyframes } from 'styled-components';
import { TSpan } from '../Typography';

const notificationDisplayAnimation = keyframes`
  0% {
    position: absolute;
    top: 100%;
    left: calc(50% - 187px);
    border-radius: 16px;
  }
  100% {
    position: relative;
    top: 0;
  }
`;

const tokenContainerAnimation = keyframes`
  0% { transform: scale(0); }
  90% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const fadeAnimation = keyframes`
  0% { opacity: 0% }
  100% { opacity: 100% }
`;

export const AnimationContainer = styled.div`
  width: 100%;
  max-width: 512px;
  height: 512px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const TokenNotificationContainer = styled.div`
  background-color: var(--bg-card-brand-primary-default);
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 343px;
  min-height: 322px;
  align-items: center;
  animation-name: ${notificationDisplayAnimation};
  animation-duration: 0.25s;
  animation-fill-mode: forwards;
  border-radius: 16px;
`;

export const TokenCountContainer = styled.div`
  position: relative;
  width: 142px;
  height: 142px;
  border-radius: 50%;
  background-color: var(--bg-token-award-brand-primary-default);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  animation-name: ${tokenContainerAnimation};
  animation-duration: 0.25s;
  animation-fill-mode: forwards;
`;

export const TokenCount = styled(TSpan)`
  margin-top: 11px;
`;

export const AnmiatedTSpan = styled(TSpan)`
  animation-name: ${fadeAnimation};
  animation-duration: 0.1s;
  animation-fill-mode: forwards;
`;

export const Animation = styled.div`
  position: absolute;
  width: 512px;
  height: 512px;
  svg {
    width: 512px !important;
    height: 512px !important;
  }
`;
