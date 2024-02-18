import { TSpan } from '@/components/Typography';
import { Stack } from '@/layout';
import styled from 'styled-components';

const BodyHighlighted = styled(TSpan).attrs({
  font: 'body-m-bold',
  colorToken: '--text-card-header-neutral-highlighted',
})``;

const SpinnerContainer = styled(Stack)`
  position: relative;
  width: 100%;
  padding: 16px 0;
  align-items: center;
`;

export default {
  BodyHighlighted,
  SpinnerContainer,
};
