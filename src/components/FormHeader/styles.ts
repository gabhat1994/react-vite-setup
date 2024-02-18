import styled from 'styled-components';
import { Stack } from '@/layout';
import { devices } from '@/constants/devices';

const Container = styled(Stack).attrs(() => ({
  justify: 'space-between',
  align: 'center',
  fullWidth: true,
}))<{ $isAppUiV2: boolean }>`
  width: 100%;
  ${(props) =>
    props.$isAppUiV2
      ? `
      padding: 12px 24px;

    @media (${devices.TABLET}) {
      padding: 12px 40px;
    }
    `
      : `
  height: 88px;
  `}
`;

export default {
  Container,
};
