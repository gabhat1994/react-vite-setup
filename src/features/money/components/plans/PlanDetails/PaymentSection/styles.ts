import { sizes } from '@/constants/devices';
import { Stack } from '@/layout';
import styled from 'styled-components';

export const Wrapper = styled(Stack).attrs({
  align: 'start',
  justify: 'center',
  vertical: true,
})`
  align-self: stretch;
  border-radius: 16px;
  background: var(--bg-card-neutral-alt-default);
  height: fit-content;
  @media only screen and (max-width: ${sizes.MOBILE_MAX}) {
    border-radius: 0px;
  }
`;

export const PaymentInformationStack = styled(Stack).attrs({
  fullWidth: true,
  vertical: true,
  gap: 8,
  align: 'start',
})``;
