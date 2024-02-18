import { Stack } from '@/layout';
import styled from 'styled-components';

export const Wrapper = styled(Stack).attrs({
  align: 'start',
})`
  align-self: stretch;
  padding-top: 20px;
  padding-bottom: 20px;
`;
