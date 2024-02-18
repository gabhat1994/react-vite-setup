import styled from 'styled-components';
import { bodyTypography } from '@/components/Typography';
import { mediaSizes } from '@/constants/devices';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--bg-body-neutral-alt-highlighted);
`;

export const NotFoundContainer = styled.div`
  width: 100%;
  height: fit-content;
  max-width: 685px;
  text-align: center;
  margin-top: 24px;
  background: var(--bg-card-neutral-alt-default);
  border-radius: 16px;
  padding: 49px;
  @media (max-width: ${mediaSizes.TABLET_MAX}) {
    padding: 38px 24px;
    width: 552px;
  }
  @media (max-width: ${mediaSizes.MOBILE_L_MAX}) {
    width: 100%;
    max-width: 279px;
    padding: 24px;
  }
`;

export const AboutUsLink = styled.a`
  ${bodyTypography.bodyMediumBold}
  color: var(--link-card-neutral-highlighted);
`;
