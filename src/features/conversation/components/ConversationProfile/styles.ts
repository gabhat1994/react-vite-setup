import styled from 'styled-components';
import { Stack } from '@/layout';

export const ProfileWrapper = styled(Stack).attrs((props) => ({
  ...props,
  align: 'center',
  fullWidth: true,
}))`
  overflow: hidden;
`;

export const ProfileInfo = styled(Stack).attrs((props) => ({
  ...props,
  align: 'center',
  fullWidth: true,
}))`
  cursor: pointer;
`;

export const ProfileTitle = styled(Stack).attrs((props) => ({
  ...props,
  vertical: true,
}))`
  flex: 1;
  overflow: hidden;
`;
