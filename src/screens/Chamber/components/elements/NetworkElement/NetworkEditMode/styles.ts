import styled from 'styled-components';
import { flexColumn, flexRow } from '@/common/globalStyles';

export const Container = styled.div`
  ${flexColumn}
  gap: 16px;
  position: relative;
`;

export const Body = styled.div`
  ${flexRow}
  gap: 16px;
  flex-wrap: wrap;
  position: relative;
`;
