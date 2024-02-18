import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Typography, { TSpan } from '@/components/Typography/Typography';
import { sizes } from '@/constants/devices';
import { noScrollBar } from '@/common/globalStyles';
import { Stack } from '@/layout';

export const TabsContainer = styled.div`
  padding-bottom: 10px;
  margin-left: 0px;
  padding-left: 0px;
  max-width: 100vw;
  overflow-x: hidden;

  @media (min-width: ${sizes.TABLET}) {
    padding-left: 6px;
    margin-top: 9px;
    overflow-x: auto;
  }
`;

export const ContentSpan = styled(TSpan)<{ header?: boolean }>`
  display: flex;
  padding: ${(p) => (p.header ? '3px 0' : '20px 16px')};
  ${(p) =>
    !p.header &&
    'border-bottom: 1px solid var(--bg-separator-neutral-default)'};
  margin-top: ${(p) => (p.header ? '24px' : '')};
`;

export const SpanItem = styled.div`
  display: flex;
  padding: 20px 16px;
  border-bottom: 1px solid var(--bg-separator-neutral-default);
  ${Typography.bodyTypography.bodyLarge}
`;

export const SearchHead = styled.div`
  display: none;
  margin-top: 24px;
  @media (min-width: ${sizes.TABLET}) {
    display: block;
  }
`;
export const DataContent = styled.div`
  position: relative;
  padding-top: 10px;
  height: calc(100vh - 202px);
  overflow-y: auto;
  ${noScrollBar}
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
`;
export const SpinnerHead = styled.div<{ recentSearch?: boolean }>`
  position: relative;
  ${(recentSearch) => recentSearch && 'padding-top: 100px'};
`;
export const StyledTSpan = styled(TSpan)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-break: break-all;
  mark {
    color: var(--text-search-highlight-brand-primary-default);
    background: var(--bg-search-highlight-brand-secondary-default);
  }
`;

export const AvatarHead = styled.div`
  position: relative;
`;

export const AvatarChild = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  border: 2px solid var(--border-badge-neutral-alt-default);
  border-radius: 6px;
`;

export const StackHead = styled(Stack)`
  align-items: center;
`;

export const ContentTSpan = styled(TSpan)`
  padding-left: 2px;
`;
