import styled from 'styled-components';
import { TSpan } from '@/components/Typography';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
`;

export const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const TotalUsers = styled(TSpan)`
  margin-left: 16px;
`;
