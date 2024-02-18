import styled from 'styled-components';
import { Stack } from '@/layout/Stack';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ButtonView = styled.div`
  padding: 8px;
  border-radius: 8px;
`;

export const ProfileWrapper = styled(Stack).attrs((props) => ({
  ...props,
  align: 'center',
  fullWidth: true,
}))``;

export const ProfileInfo = styled(Stack).attrs((props) => ({
  ...props,
  align: 'center',
  fullWidth: true,
}))`
  cursor: pointer;
`;
