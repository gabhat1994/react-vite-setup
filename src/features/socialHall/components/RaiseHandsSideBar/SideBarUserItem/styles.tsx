import styled from 'styled-components';
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