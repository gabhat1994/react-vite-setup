import { Stack } from '@/layout';
import styled from 'styled-components';
import { TSpan } from '../Typography';

export const Container = styled(Stack).attrs(() => ({
  gap: 16,
  wrap: 'nowrap',
  fullWidth: true,
  align: 'stretch',
}))`
  padding: 16px;
  border-radius: 8px;
  ${(props) => !!props.onClick && 'cursor: pointer;'}

  &:hover {
    background-color: var(--bg-tablecell-neutral-hover);
  }
`;

export const IconContainer = styled(Stack).attrs(() => ({
  justify: 'center',
  align: 'center',
}))``;

export const IconTile = styled(Stack).attrs(() => ({
  align: 'center',
  justify: 'center',
}))<{ backgroundColor: string }>`
  width: 40px;
  height: 40px;
  padding: 8px;
  border-radius: 8px;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

export const BodyContainer = styled(Stack).attrs(() => ({
  vertical: true,
  fullWidth: true,
  align: 'flex-start',
  justify: 'center',
}))``;

export const Title = styled(TSpan).attrs(() => ({
  font: 'body-m-bold',
  colorToken: '--text-tablecell-header-neutral-highlighted',
}))``;
export const Subtitle = styled(TSpan).attrs(() => ({
  font: 'footnote',
  colorToken: '--text-tablecell-body-neutral-default',
}))``;

export const ActionContainer = styled(Stack).attrs(() => ({
  justify: 'center',
  align: 'center',
}))``;
