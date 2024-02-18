import { Stack } from '@/layout';
import styled from 'styled-components';

export const QuestionWrapper = styled(Stack)<{ loading?: boolean }>`
  flex-direction: column;
  width: 100%;
  opacity: ${({ loading }) => (loading ? 0.5 : 1)};
`;
