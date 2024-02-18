import styled from 'styled-components';
import { TSpan } from '@/components/Typography';

export const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 235px;
  padding: 0 24px 20px;
  box-sizing: border-box;
  border-bottom: 1px solid var(--bg-separator-neutral-default);
  :hover {
    background-color: var(--bg-tablecell-neutral-hover);
    border-right: 2px solid var(--bg-tab-basic-brand-primary-selected);
  }
`;

export const ItemHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  padding: 20px 0;
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
  display: flex;
  flex-direction: row;
  font-size: 14px;
  line-height: 160%;
  font-weight: 600;
  text-overflow: ellipsis;
  overflow-x: hidden;
  white-space: nowrap;
  max-width: 160px;
  text-transform: capitalize
  gap: 8px;
`;

export const TitleSpan = styled(TSpan)`
  font-size: 12px;
  font-weight: 400;
  line-height: 160%;
  text-overflow: ellipsis;
  overflow-x: hidden;
  white-space: nowrap;
  max-width: 160px;
`;

export const TagWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  padding-bottom: 8px;
`;

export const TagSpan = styled(TSpan)<{ isFocused: boolean }>`
  display: block;
  font-size: 14px;
  line-height: 160%;
  font-weight: 400;
  background-color: ${({ isFocused }) =>
    isFocused
      ? 'var(--bg-skillbadge-neutral-alt-default)'
      : 'var(--bg-skillbadge-neutral-default)'};
  border-radius: 24px;
  padding: 4px 8px;
  text-overflow: ellipsis;
  overflow-x: hidden;
  white-space: nowrap;
`;

export const BioSpan = styled(TSpan)`
  font-size: 14px;
  font-weight: 400;
  line-height: 160%;
  min-height: 66px;
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

export const ProfileLinkSpan = styled(TSpan)`
  font-weight: 600;
  font-size: 14px;
  line-height: 160%;
  text-decoration-line: underline;
  cursor: pointer;
`;
