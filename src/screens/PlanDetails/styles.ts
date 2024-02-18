import { sizes } from '@/constants/devices';
import { Stack } from '@/layout';
import styled from 'styled-components';

export const Main = styled(Stack).attrs({
  justify: 'center',
})`
  align-self: center;
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 32px;
  @media only screen and (max-width: ${sizes.TABLET_L}) {
    padding: 16px;
  }
  @media only screen and (max-width: ${sizes.MOBILE_MAX}) {
    padding-top: 16px;
    padding-left: 0px;
    padding-right: 0px;
  }
`;
