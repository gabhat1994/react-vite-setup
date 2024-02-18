import styled from 'styled-components';
import { Card } from '@/components/Card';

const OptionContainer = styled.div<{ intent?: string }>`
  display: inline-flex;
  gap: 16px;
  padding: 12px;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px solid var(--bg-separator-neutral-default);
  ${({ intent }) =>
    intent === 'danger' &&
    'svg path { fill: var(--bg-button-danger-primary-default)};'}

  &:hover {
    background-color: var(--bg-tablecell-neutral-hover);
  }
`;

const SpinnerWrapper = styled(Card)`
  height: 50px;
  width: 147px;
`;

export default {
  OptionContainer,
  SpinnerWrapper,
};
