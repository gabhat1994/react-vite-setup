import styled from 'styled-components';
import { cssVar, rgba } from 'polished';
import { TSpan } from '@/components/Typography';
import { sizes } from '@/constants/devices';

export const ItemWrapper = styled.div<{ isHidden: boolean }>`
  display: ${({ isHidden }) => (isHidden ? 'none' : 'flex')};
  flex-direction: column;
  padding: 0 24px 20px;
  box-sizing: border-box;
  background-color: var(--bg-tablecell-neutral-alt-default);
  border-radius: 16px;
  box-shadow: 0px 4px 32px ${rgba(cssVar('--shadow-neutral-default'), 0.08)};
  width: 100%;
  @media (min-width: ${sizes.LAPTOP}) {
    display: none;
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
  display: flex;
  align-items: center;
  justify-content: center;
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
  font-size: 14px;
  line-height: 160%;
  font-weight: 600;
  text-overflow: ellipsis;
  overflow-x: hidden;
  white-space: nowrap;
  max-width: 160px;
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

export const TagSpan = styled(TSpan)`
  display: block;
  font-size: 14px;
  line-height: 160%;
  font-weight: 400;
  background-color: var(--bg-skillbadge-neutral-default);
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
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
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
  padding: 12px 0;
  border-bottom: 1px solid var(--bg-separator-neutral-default);
  :last-of-type {
    border-bottom: none;
  }
`;
