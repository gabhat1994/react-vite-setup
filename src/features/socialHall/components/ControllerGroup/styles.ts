import styled from 'styled-components';
import { TSpan } from '@/components/Typography';
import { Badge } from '@/components/Badge/Badge';

export const ControlWrapper = styled.div`
  position: absolute;
  left: 50%;
  bottom: 24px;
  transform: translateX(-50%);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: fit-content;
  padding: 12px 16px;
  gap: 16px;
  border-radius: 16px;
  background-color: rgba(231, 230, 233, 0.55);
  z-index: 3;
  position: absolute;
`;

export const ChatNotificationContainer = styled.div`
  width: 12px;
  height: 12px;
  background-color: var(--border-badge-neutral-alt-default);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  position: absolute;
  top: 15px;
  right: 15px;
`;

export const ChatNotification = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--bg-badge-danger-primary-default);
`;

export const ControlIconWrapper = styled.div<{
  backgroundColor?: string;
  cursorAllowed?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  position: relative;
  height: 56px;
  background-color: ${({ backgroundColor }) =>
    backgroundColor ?? 'var(--bg-button-neutral-alt-default)'};
  border-radius: 8px;
  cursor: ${({ cursorAllowed }) => (cursorAllowed ? 'pointer' : 'not-allowed')};
`;

export const RaiseHandWrapper = styled(TSpan)<{ isRaiseHand?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 56px;
  background-color: ${({ isRaiseHand }) =>
    isRaiseHand
      ? 'var(--bg-button-brand-primary-default)'
      : 'var(--bg-button-neutral-alt-default)'};
  color: ${({ isRaiseHand }) =>
    isRaiseHand
      ? 'var(--text-button-neutral-alt-default)'
      : 'var(--text-button-neutral-default)'};
  border-radius: 8px;
  padding: 0 16px;
  gap: 10px;
  cursor: pointer;
`;

export const ControlGroupNotificationWrapper = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
`;

export const RaiseHandsBadge = styled(Badge)`
  background: var(--bg-badge-danger-primary-default);
  border: 2px solid var(--border-badge-neutral-alt-default);
  border-radius: 1000px;
`;

export const BadgeContainer = styled.div`
  position: absolute;
  display: flex;
  top: 26px;
  right: 30px;
`;

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-self: flex-start;
`;
