import styled, { css } from 'styled-components';
import { mediaSizes } from '@/constants/devices';

const LogoWrapperDefaultCss = css`
  height: 28px;
  align-items: center;
  display: flex;
  img {
    cursor: pointer;
  }
  cursor: pointer;
  flex-direction: row;
`;

export const LogoWrapper = styled.div`
  ${LogoWrapperDefaultCss}
`;

export const LogoIcon = styled.div``;

export const LogoText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;
  margin-left: 10px;
  @media (max-width: ${mediaSizes.MOBILE_L_MAX}) {
    margin-left: 4px;
  }
`;

export const LogoSubtitle = styled.span`
  margin-left: 36px;
`;
