import styled from 'styled-components';
import { flexRow, borderBox } from '@/common/globalStyles';
import { Stack } from '@/layout';

export const Container = styled.div`
  width: 100%;
  border-radius: 16px;
  gap: 12px;
  padding: 0px;
  ${borderBox}
  ${flexRow};
`;

export const TextSection = styled(Stack)`
  background: var(--bg-input-neutral-default);
  flex: 1;
  height: 40px;
  border-radius: 8px;
  padding-left: 12px;
  align-items: center;
  cursor: pointer;
`;
