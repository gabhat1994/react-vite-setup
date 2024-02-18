import styled from 'styled-components';
import { TSpan } from '@/components/Typography';
import { Stack } from '@/layout';

const Container = styled(Stack).attrs({
  fullWidth: true,
  gap: 8,
})``;

const BodyCell = styled(Stack).attrs({
  vertical: true,
})``;

const IconCell = styled.div`
  padding: 2px 0 0;
`;

const DateText = styled(TSpan).attrs({
  font: 'footnote',
  colorToken: '--text-timestamp-neutral-default',
})``;

const Description = styled(TSpan).attrs({
  font: 'body-m',
  colorToken: '--text-card-header-neutral-highlighted',
})``;

export default {
  Container,
  IconCell,
  BodyCell,
  Description,
  DateText,
};
