import styled from 'styled-components';
import { cssVar, rgba } from 'polished';
import { TSpan } from '@/components/Typography';

export const ItemWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 16.5px;
  box-sizing: border-box;
  border-bottom: 1px solid var(--bg-separator-neutral-default);
  align-items: center;
  gap: 16px;
`;

export const AvatarWrapper = styled.div`
  width: 40px;
  height: 40px;
`;

export const NameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
`;

export const NameSpan = styled(TSpan)`
  text-overflow: ellipsis;
  overflow-x: hidden;
  white-space: nowrap;
  max-width: 160px;
  text-transform: capitalize;
`;

export const TitleSpan = styled(TSpan)`
  text-overflow: ellipsis;
  overflow-x: hidden;
  white-space: nowrap;
  max-width: 160px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const StatusTag = styled.div`
  background-color: var(--bg-call-ui-brand-secondary-default);
  border: 2px solid var(--border-call-ui-neutral-alt-default);
  padding: 4px 8px;
  border-radius: 1000px;
`;

export const ThreeDotsIconWrapper = styled.div`
  cursor: pointer;
`;

export const OfflineWrapper = styled.div`
  z-index: 1;
  position: absolute;
  border-radius: 12px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${rgba(cssVar('--bg-overlay-raisehand'), 0.5)};
`;

export const OfflineBadge = styled.div`
  padding: 2.5px 8px;
  border-radius: 12px;
  background-color: var(--bg-tag-danger-secondary-default);
`;
