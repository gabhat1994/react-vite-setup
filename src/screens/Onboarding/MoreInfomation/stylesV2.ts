import { sizes } from '@/constants/devices';
import { Stack } from '@/layout';
import styled from 'styled-components';

export const OutlineBox = styled(Stack).attrs({
  vertical: true,
  gap: 24,
})`
  padding: 24px;
  align-items: center;
  border-radius: 16px;
  border: 1px solid var(--bg-separator-neutral-default);
  width: 100%;
  @media (max-width: ${sizes.MOBILE_MAX}) {
    border: none;

    box-sizing: border-box;

    padding: 0px;
  }
`;

 