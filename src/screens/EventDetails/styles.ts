import styled from 'styled-components';
import { Card } from '@/components/Card';
import { mediaSizes } from '@/constants/devices';

export const EventDetailsWrapper = styled(Card)`
  position: fixed;
  width: calc(100% - 65px);
  z-index: 49;
  max-height: max-content;
  border-radius: 0%;
  box-sizing: border-box;
  @media (max-width: ${mediaSizes.TABLET_L}) {
    padding: 16px;
    left: 0px;
    width: 100%;
  }
`;

export const EventDetialsStyled = styled.div`
  font-family: var(--font-family);
  background: var(--bg-body-neutral-alt-highlighted) fixed;
  min-height: calc(100vh - 69px);
`;

export const EventDetialsLayout = styled.div`
  box-sizing: border-box;
  display: grid;
  transition: all 0.1s ease-in-out;
  width: 100%;
  justify-content: center;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto;
  grid-template-areas: 'body';
  background: var(--bg-card-neutral-alt-default);
  border-radius: 16px;

  #atcb-customTrigger-atcb-btn-noumena-atc-host {
    top: 42px !important;
    width: 0;
    position: absolute !important;
    left: 0 !important;
  }
`;

export const Content = styled.div<{ isBorder?: boolean }>`
  ${({ isBorder }) =>
    isBorder && 'border-right: 1px solid var(--bg-separator-neutral-default)'}
`;

export const TabComponentContainer = styled.div`
  min-height: 567px;
`;

export const AttendeesStatusContainer = styled.div`
  label {
    width: 85%;
    div {
      font-weight: var(--font-body-medium-bold-weight);
    }
  }
`;
