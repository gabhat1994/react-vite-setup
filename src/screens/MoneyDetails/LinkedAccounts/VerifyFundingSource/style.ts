import { sizes } from '@/constants/devices';
import { Stack } from '@/layout';
import styled from 'styled-components';

export const StyledForm = styled.form`
  width: 100%;
  @media (max-width: ${sizes.MOBILE_MAX}) {
    height: 100%;
  }
`;

export const StyledStack = styled(Stack)`
  @media (max-width: ${sizes.MOBILE_MAX}) {
    height: 100%;
    justify-content: space-between;
  }
`;
