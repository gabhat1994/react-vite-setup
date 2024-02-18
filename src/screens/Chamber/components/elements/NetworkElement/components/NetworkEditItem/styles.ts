import styled from 'styled-components';
import { flexRow } from '@/common/globalStyles';
import { devices } from '@/constants/devices';

export const Container = styled.div`
  ${flexRow}
  width: 100%;
  @media ${devices.MOBILE_L} {
    max-width: calc(50% - 8px);
  }
`;
