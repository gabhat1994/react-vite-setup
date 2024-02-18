import styled from 'styled-components';
import { cssVar, rgba } from 'polished';
import { TSpan } from '@/components/Typography';

export const NotificationWrapper = styled.div<{
  isBordered: boolean;
  errorBorder?: boolean;
  isBuzzRoom?: boolean;
}>`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 16px;
  box-sizing: border-box;
  padding: 12px;
  border: ${({ isBordered, errorBorder }) =>
    errorBorder
      ? '2px solid var(--border-call-ui-danger-primary-default)'
      : isBordered
      ? '1px solid var(--border-card-neutral-default)'
      : 'none'};
  box-shadow: 0px 4px 32px ${rgba(cssVar('--shadow-neutral-default'), 0.08)};
  background-color: var(--bg-card-neutral-alt-default);
  gap: 16px;
`;

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: 10px;
`;

export const TextWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const NameSpan = styled(TSpan)`
  font-size: 14px;
  font-weight: 600;
  line-height: 160%;
`;

export const KnockingSpan = styled(TSpan)`
  font-size: 14px;
  font-weight: 400;
  line-height: 160%;
  word-break: break-word;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

export const MessageSpan = styled(TSpan)`
  font-size: 12px;
  line-height: 160%;
  font-weight: 400;
  word-break: break-all;
`;
