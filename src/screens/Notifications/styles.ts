import styled from 'styled-components';
import { Stack } from '@/layout';

export const SectionNotifications = styled(Stack).attrs(() => ({
  gap: 8,
  vertical: true,
  align: 'stretch',
  fullWidth: true,
}))`
  margin-bottom: 16px;
`;
