import styled from 'styled-components';
import { cssVar, rgba } from 'polished';
import { Button } from '@/components/Button';
import Typography from '@/components/Typography';

export const Wrapper = styled.div<{
  showUserJoined?: boolean;
  showUserLeave?: boolean;
}>`
  position: absolute;
  z-index: 10;
  background-color: var(--bg-card-brand-primary-default);
  top: 25px;
  width: ${({ showUserJoined, showUserLeave }) =>
    showUserJoined || showUserLeave ? 'max-content' : '343px'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  box-shadow: 0px 4px 32px ${rgba(cssVar('--shadow-neutral-default'), 0.08)};
  border-radius: ${({ showUserJoined, showUserLeave }) =>
    showUserJoined || showUserLeave ? '8px' : '16px'};
  padding: ${({ showUserJoined, showUserLeave }) =>
    showUserJoined || showUserLeave ? '8px 12px' : '12px 17px 12px 12px'};
  box-sizing: border-box;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
`;

export const Section = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  width: 100%;
  color: var(--text-card-neutral-alt-default);
  ${Typography.bodyTypography.bodyMedium}
`;

export const DeclineButton = styled(Button)``;

export const IconChild = styled.span`
  background: var(--bg-button-brand-primary-pressed);
  border-radius: 12px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const IconWrapper = styled.span`
  width: 40px;
  height: 40px;
`;
