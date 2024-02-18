import styled from 'styled-components';
import { TSpan } from '@/components/Typography';

const Title = styled(TSpan).attrs(() => ({
  font: 'body-m',
  colorToken: '--text-card-neutral-highlighted',
}))``;

const Description = styled(TSpan).attrs(() => ({
  font: 'footnote',
  colorToken: '--text-card-neutral-default',
}))``;

export default {
  Title,
  Description,
};
