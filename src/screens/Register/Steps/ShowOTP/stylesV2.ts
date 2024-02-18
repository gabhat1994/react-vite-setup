import { sizes } from '@/constants/devices';
import { Stack } from '@/layout';
import styled from 'styled-components';

export const OtpWrapper = styled(Stack).attrs({
  vertical: true,
  gap: 24,
  fullWidth: true,
})`
  padding: 24px;
  border-radius: 16px;
  border: 1px solid var(--bg-separator-neutral-default);
  @media (max-width: ${sizes.MOBILE_L}) {
    border-radius: 0px;
    border: none;
    padding: 0px;
  }
`;

export const ActionButtonWrapper = styled(Stack).attrs({
  vertical: true,
  gap: 16,
  fullWidth: true,
})``;
