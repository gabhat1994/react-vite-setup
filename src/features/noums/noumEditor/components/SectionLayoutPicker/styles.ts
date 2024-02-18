import styled from 'styled-components';
import { Stack } from '@/layout';

export const SectionLayoutPickerWrapper = styled.div`
  width: 100%;
  gap: 12px;
`;

export const TabContent = styled(Stack)`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  padding-top: 17px;
`;
