import styled from 'styled-components';
import { Stack } from '@/layout';
import { sizes } from '@/constants/devices';

export const StyledStack = styled(Stack)`
  padding: 20px 16px;
  @media (max-width: ${sizes.MOBILE_MAX}) {
    padding: 20px 0;
  }
`;
