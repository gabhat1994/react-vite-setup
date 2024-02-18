import styled from 'styled-components';
import { TSpan } from '@/components/Typography';

export const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid var(--bg-separator-neutral-default);
  background-color: var(--bg-tablecell-neutral-alt-default);
  :hover {
    background-color: var(--bg-tablecell-neutral-hover);
  }
`;

export const ItemHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  padding: 16px 24px;
`;

export const AvatarWrapper = styled.div`
  width: 24px;
  height: 24px;
`;

export const NameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
`;

export const NameSpan = styled(TSpan)<{ isGroup?: boolean }>`
  display: flex;
  flex-direction: row;
  font-size: ${({ isGroup }) => (isGroup ? '16px' : '14px')};
  line-height: 150%;
  font-weight: 600;
  text-overflow: ellipsis;
  overflow-x: hidden;
  white-space: nowrap;
  gap: 8px;
`;

export const TitleSpan = styled(TSpan)<{ isGroup?: boolean }>`
  font-size: ${({ isGroup }) => (isGroup ? '14px' : '12px')};
  font-weight: 400;
  line-height: 160%;
  text-overflow: ellipsis;
  overflow-x: hidden;
  white-space: nowrap;
  max-width: 160px;
`;

export const UsersWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 12px 24px 12px 32px;
  border-bottom: 1px solid var(--bg-separator-neutral-default);
  :hover {
    border-right: 2px solid var(--bg-tablecell-neutral-hover);
    border-bottom: 1px solid var(--bg-separator-neutral-alt-default);
  }
  :last-of-type {
    border-bottom: none;
  }
`;

export const IconButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  color: var(--icon-tablecell-neutral-default);
  cursor: pointer;
`;
