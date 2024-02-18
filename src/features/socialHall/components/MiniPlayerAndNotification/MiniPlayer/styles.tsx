import styled from 'styled-components';
import { TSpan } from '@/components/Typography';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const GroupTitleSpan = styled(TSpan)`
  font-size: 14px;
  font-weight: 600;
  line-height: 160%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 130px;
`;

export const IconButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
`;
