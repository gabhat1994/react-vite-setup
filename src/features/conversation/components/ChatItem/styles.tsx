import styled from 'styled-components';
import { TSpan } from '@/components/Typography';
import { type ChatItemProps, type ChatItemWrapperProps } from './types';

export const ChatItemWrapper = styled.div<ChatItemWrapperProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${({ size }) =>
    size === 'L' ? '16px' : size === 'M' ? '12px 16px 12px 32px' : '12px 14px'};
  box-sizing: border-box;
  border-bottom: 1px solid var(--bg-separator-neutral-default);
  width: 100%;
  min-height: ${({ size }) =>
    size === 'L' ? '78px' : size === 'M' ? '70px' : '65px'};
  cursor: pointer;
  ${(props) =>
    props.active
      ? 'border-left: 2px solid var(--bg-tab-indicator-primary-brand-default);'
      : 'border-left: 2px solid transparent;'}
  ${(props) =>
    props.active && 'background-color: var(--bg-separator-neutral-default);'}
`;
export const AvatarWrapper = styled.div<{ size?: ChatItemProps['size'] }>`
  width: ${({ size }) => (size === 'L' ? '40px' : '24px')};
  height: ${({ size }) => (size === 'L' ? '40px' : '24px')};
`;
export const Content = styled.div`
  width: 100%;
  overflow: hidden;
  justify-content: center;
  margin-left: 16px;
`;

export const MessageContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const MessageStatus = styled.div`
  width: 8px;
  height: 8px;
  background: var(--bg-badge-danger-primary-default);
  border-radius: 1000px;
  margin-right: 8px;
`;
export const DotSpan = styled(TSpan).attrs({
  font: 'footnote',
})`
  margin: 0 3px;
`;
export const TimestampSpan = styled(TSpan).attrs({
  font: 'footnote',
})``;

export const TitleTSPan = styled(TSpan).attrs({
  overflow: 'ellipsis',
  colorToken: '--text-tablecell-body-neutral-highlighted',
})`
  display: block;
`;

export const BlockTSPan = styled(TSpan).attrs({
  overflow: 'ellipsis',
  colorToken: '--text-tablecell-body-neutral-default',
})`
  display: block;
`;
