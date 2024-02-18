import styled, { css } from 'styled-components';
import { sizes } from '@/constants/devices';

export const AppStyled = styled.div<{ fullWidth?: boolean }>`
  font-family: var(--font-family);
  height: 100%;
  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}
`;

export const StyledStep = styled.div`
  padding: 60px 0px 0px 0px;
  pointer-events: none;
  @media (max-width: ${sizes.MOBILE_L}) {
    padding-top: 24px;
    width: 210px;
  }
  @media (min-width: ${sizes.TABLET}) and (max-height: 700px) {
    padding-top: 12px;
  }
`;
