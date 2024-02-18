import styled from 'styled-components';
import { cssVar, rgba } from 'polished';
import { devices, mediaSizes } from '@/constants/devices';

export const Container = styled.div<{ showBuzzRoom: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--bg-shmap-brand-secondary-default);
  border-radius: 0;
  visibility: ${({ showBuzzRoom }) => (showBuzzRoom ? 'hidden' : 'visible')};
  @media ${devices.TABLET} {
    border-radius: 16px;
  }
`;

export const NotifyOnlyYouWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px;
  position: absolute;
  bottom: 44px;
  width: 100%;
  z-index: 99;
  @media (max-width: ${mediaSizes.TABLET_MIN}) {
    bottom: 80px;
  }
`;

export const NotifyOnlyYou = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  height: 64px;
  background: var(--bg-tablecell-neutral-alt-default);
  box-shadow: 0px 4px 32px ${rgba(cssVar('--shadow-neutral-default'), 0.08)};
  border-radius: 16px;
`;
