import { Tag } from '@/components/Tag';
import styled from 'styled-components';

export const StyledTag = styled(Tag).attrs(() => ({
  size: 'small',
  contentFont: 'footnote-bold',
}))``;

export const ManagerTag = styled(StyledTag).attrs(() => ({
  tertiary: true,
}))`
  background-color: var(--color-base-pastel-pink);
  color: var(--color-base-solid-orange);
`;
