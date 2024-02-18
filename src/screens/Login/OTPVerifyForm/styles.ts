import styled from 'styled-components';
import { sizes } from '@/constants/devices';
import { Stack } from '@/layout';

export const StyledSpacer = styled.div`
  padding-top: 32px;

  @media (max-width: ${sizes.MOBILE_L}) {
    padding-top: 24px;
  }
`;
export const FullWidthStack = styled(Stack)`
  width: 100%;
`;
