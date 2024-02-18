import { mediaSizes, sizes } from '@/constants/devices';
import { Stack } from '@/layout';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

type ElementCntProps = {
  isMarginTop?: boolean;
  isPinned?: boolean;
};

export const ElementCnt = styled.div<ElementCntProps>`
  border: 1px solid
    ${({ isPinned }) =>
      isPinned
        ? 'var(--border-card-brand-primary-default'
        : 'var(--border-card-neutral-highlighted)'};
  padding: 16px;
  gap: 10px;
  background: var(--bg-card-neutral-alt-default);
  display: grid;
  align-items: center;
  margin-top: ${({ isMarginTop }) => (isMarginTop ? '20px' : '0')};

  @media (min-width: ${sizes.TABLET}) {
    border-radius: 16px;
    width: 92%;
    margin-left: auto;
    margin-right: auto;
  }

  @media (min-width: ${sizes.LAPTOP}) {
    width: calc(100% - 34px);
    margin-left: unset;
    margin-right: unset;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const WrapperColumn = styled.div`
  display: grid;
  grid-gap: 5px;
  width: 100%;
  margin-left: 10px;
`;

export const TimeText = styled.div`
  color: var(--text-timestamp-neutral-default);
  font-size: var(--font-footnote-size);
  font-family: var(--font-family);
`;

export const IconCnt = styled.div`
  margin-left: auto;
  margin-right: 12px;
  position: relative;
`;

export const StyledName = styled.div<{ isActive: boolean }>`
  color: var(--text-card-header-neutral-highlighted);
  font-size: var(--font-body-large-size);
  font-family: var(--font-family);
  ${({ isActive }) => isActive && `cursor: pointer;`}
`;

export const StyledText = styled.div`
  color: var(--text-card-neutral-highlighted);
  font-size: var(--font-body-medium-regular-size);
  font-family: var(--font-body-medium-regular-font);
  white-space: break-spaces;
  word-break: break-word;
`;

export const PinTabText = styled.div`
  font-weight: 600;
  font-size: 12px;
  color: var(--text-tag-neutral-alt-default);
`;

export const StyledLink = styled(Link)<{ $disableLink?: boolean }>`
  color: var(--text-search-highlight-brand-primary-default);
  background-color: var(--bg-search-highlight-brand-secondary-default);
  text-decoration: none;
  display: inline-block;
  ${({ $disableLink }) => ($disableLink ? `cursor: default;` : undefined)}
`;

export const Container = styled(Stack)`
  padding: 16px 0;
  gap: 16px;
  flex-direction: column;
  width: 100%;

  @media (max-width: ${mediaSizes.TABLET_MAX}) {
    padding: 16px;
    overflow: hidden;
  }
`;
