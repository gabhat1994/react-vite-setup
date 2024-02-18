import styled from 'styled-components';
import { devices } from '@/constants/devices';
import { Card } from '@/components/Card';
import { flexRow } from '@/common/globalStyles';

export const Container = styled(Card)`
  padding: 24px;
  display: flex;
  flex-direction: column;
  border-radius: 0;
  border: none;
  gap: 16px;
  @media ${devices.TABLET} {
    border-radius: 16px;
  }
  @media ${devices.MOBILE_L} {
    border-radius: 16px;
  }
`;

export const Body = styled.div`
  ${flexRow}
  gap: 16px;
  flex-wrap: wrap;
  position: relative;
  justify-content: flex-start;
`;
