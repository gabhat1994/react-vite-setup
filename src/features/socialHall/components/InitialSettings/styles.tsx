import styled from 'styled-components';
import { cssVar, rgba } from 'polished';
import { mediaSizes } from '@/constants/devices';
import { TSpan } from '@/components/Typography';

export const Wrapper = styled.div<{ isBannerVisible: boolean | null }>`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: center;
  @media (max-width: ${mediaSizes.TABLET_L}) {
    flex-direction: column;
  }
`;

export const Layout = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  #main-header {
    width: 100%;
  }
`;

export const MediaWrapper = styled.div`
  max-width: 48%;
  min-width: 48%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: ${mediaSizes.TABLET_L}) {
    min-width: 85%;
    max-width: 85%;
    box-sizing: border-box;
    justify-content: flex-end;
    align-self: center;
  }
  @media (max-width: ${mediaSizes.MOBILE_XL_MAX}) {
    padding: 16px;
    min-width: 100%;
    max-width: 100%;
  }
`;

export const MediaMessageWrapper = styled.div`
  height: 100%;
  max-width: 27%;
  min-width: 27%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  @media (max-width: ${mediaSizes.TABLET_L}) {
    margin-top: 48px;
    min-width: 60%;
    max-width: 60%;
    box-sizing: border-box;
    justify-content: flex-start;
    align-self: center;
  }
  @media (max-width: ${mediaSizes.MOBILE_XL_MAX}) {
    padding: 16px;
    min-width: 100%;
    max-width: 100%;
    margin-top: 0;
    paddin-top: 0;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
`;

export const DropdownLabelWrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const VideoWrapper = styled.div`
  aspect-ratio: 16/9;
  background: var(--bg-overlay-neutral-dark);
  border-radius: 8px;
  position: relative;
  justify-content: center;
  display: flex;
  position: relative;
  @media (max-width: ${mediaSizes.MOBILE_XL_MAX}) {
    flex-direction: column;
  }
`;

export const VideoElement = styled.video`
  width: 100%;
  height: 100%;
  z-index: 0;
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid var(--border-option-selector-neutral-default);
  border-radius: 8px;
  overflow: hidden;
  object-fit: cover;
  div {
    background: transparent !important;
    border-radius: 8px;
  }
`;

export const UserProfilePictureWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const MediaControlWrapper = styled.div`
  border-radius: 8px;
  background-color: ${rgba(cssVar('--bg-call-ui-neutral-light'), 0.1)};
  backdrop-filter: blur(4.5px);
  position: absolute;
  bottom: 16px;
  padding: 16px;
  display: flex;
  z-index: 1;
  @media (max-width: ${mediaSizes.MOBILE_XL_MAX}) {
    position: static;
  }
`;

export const HardwareControlItem = styled.div`
  display: grid;
`;

export const MediaOptionsWrapper = styled.div`
  height: 60px;
  max-width: 98%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 0 auto;
  margin-top: 16px;
  ${HardwareControlItem}:nth-child(2) {
    padding: 0 16px;
  }
`;

export const LabelIconWrapper = styled.div`
  display: flex;
  max-width: 85%;
  align-items: center;
  @media (max-width: ${mediaSizes.MOBILE_XL_MAX}) {
    ${TSpan} {
      display: none;
    }
  }
`;

export const EqualizerWrapper = styled.div`
  width: calc(100% - 60px);
  height: 3px;
  margin-left: 32px;
  margin-top: 8px;
  display: flex;
  align-items: center;
  background: var(--shadow-neutral-alt-default);
  border-radius: 8px;
  overflow: hidden;
`;

export const EqualizerElement = styled.canvas`
  width: 100%;
  height: 15px;
`;

export const SkipHardwareTestingWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const BannerWrapper = styled.div`
  position: absolute;
  width: 100%;
`;
