import { mediaSizesForNoumLayout, sizes } from '@/constants/devices';
import styled, { css } from 'styled-components';

export const AppStyled = styled.div<{ applyMinHeight: boolean | undefined }>`
  font-family: var(--font-family);
  background: var(--bg-body-neutral-alt-highlighted) fixed;
  min-height: 100vh;
  ${({ applyMinHeight }) =>
    applyMinHeight &&
    css`
      overflow: auto;
      min-height: 100vh;
    `}
  @media (max-width: ${sizes.TABLET_L}) {
    overflow: unset;
  }
`;

export const Container = styled.div`
  max-width: 100%;
  padding: 16px 0;
`;

const Wrapper = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: static;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
`;

export const IconContainerDefaultCss = css`
  padding: 9px;
  height: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  margin: 6px;
  align-items: center;
  position: relative;
  cursor: pointer;
`;

const EditHeaderWrapperCss = css`
  ${Wrapper}
  justify-content: space-between;
  position: relative;
  @media (max-width: ${sizes.TABLET}) {
    display: inline-block;
  }
  @media (min-width: ${sizes.LAPTOP_L}) {
    width: 1360px;
    margin: 0 auto;
  }
`;

export const EditHeaderWrapperNew = styled.div`
  ${EditHeaderWrapperCss}
  padding: 12px 24px;
  @media (min-width: ${mediaSizesForNoumLayout.LAPTOP_M_MIN}) {
    padding: 12px 40px;
  }
  @media (min-width: ${mediaSizesForNoumLayout.LAPTOP_L_MIN}) {
    width: 100%;
    padding: 12px 40px;
  }
`;
