import styled from 'styled-components';
import { sizes } from '@/constants/devices';

export const Name = styled.div<{ selected: boolean }>`
  font-weight: var(--font-link-xlarge-weight);
  font-family: var(--font-header-xsmall-bold-font);
  font-size: ${({ selected }) =>
    selected ? 'var(--font-body-large-size)' : 'var(--font-body-medium-size)'};
  color: var(--text-tablecell-header-neutral-highlighted);
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
`;
export const Description = styled.div<{ selected: boolean }>`
  font-weight: var(--font-input-small-weight);
  font-family: var(--font-header-xsmall-bold-font);
  font-size: ${({ selected }) =>
    selected ? 'var(--font-link-medium-size)' : 'var(--font-footnote-size)'};
  color: var(--text-tablecell-body-neutral-default);
  height: 100%;
  width: 100%;
`;

export const Wrapper = styled.div<{ selected: boolean }>`
  width: 400px;
  height: 78px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 16px;
  border-radius: 8px;
  background-color: ${({ selected }) =>
    selected
      ? 'var(--bg-tablecell-neutral-pressed)'
      : 'var(--bg-tablecell-neutral-alt-default)'};
  cursor: ${({ selected }) =>
    selected ? 'pointer' : 'var(--font-footnote-size)'};
  @media (max-width: ${sizes.MOBILE_MAX}) {
    width: ${({ selected }) => (selected ? '100%' : '')};
  }
`;
