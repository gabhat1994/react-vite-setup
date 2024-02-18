import { TSpan } from '@/components';
import { Stack } from '@/layout';
import styled from 'styled-components';

const Container = styled(Stack).attrs({
  vertical: true,
  gap: 8,
})`
  border-radius: 16px;
  border: 1px solid var(--border-card-neutral-default);
  background: var(--bg-card-neutral-alt-default);
  padding: 24px;
`;

const ValueText = styled(TSpan).attrs({
  font: 'heading-xs-bold',
  colorToken: '--text-card-neutral-highlighted',
})``;

export default {
  Container,
  ValueText,
};
