import styled from 'styled-components';
import { mediaSizes, sizes } from '@/constants/devices';
import { TSpan } from '@/components/Typography';

export const StyledOnboardingEventsSection = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 24px;
  isolation: isolate;
  width: 100%;
  min-width: 322px;
  background: var(--bg-card-brand-primary-highlighted);
  border-radius: 16px;
  flex: none;
  flex-grow: 0;
  background: linear-gradient(
    135.79deg,
    var(--bg-blur-brand-primary-dark) 0%,
    var(--bg-card-brand-primary-highlighted) 48.49%,
    var(--bg-blur-brand-primary-default) 100%
  );

  @media (max-width: ${sizes.TABLET_L}) {
    min-width: 704px;
    border-radius: unset;
  }

  @media (max-width: ${sizes.MOBILE_MAX}) {
    width: 100vw;
    min-width: unset;
    margin: unset;
    border-radius: unset;
    align-items: flex-start;
  }
`;

export const StyledHeader = styled.div`
  text-align: center;
  span {
    display: inline-block;
  }
  @media (max-width: ${sizes.TABLET_L}) {
    span {
      font-weight: 600;
      font-size: 24px;
      line-height: 150%;
    }
  }
  @media (max-width: ${sizes.MOBILE_MAX}) {
    text-align: left;
    margin: 0 0;
    span {
      font-weight: 600;
      font-size: 20px;
      line-height: 150%;
    }
  }
`;

export const StyledDescription = styled(TSpan)`
  text-align: center;
  @media (max-width: ${mediaSizes.LAPTOP_L_MAX}) and (min-width: ${mediaSizes.LAPTOP_L_MIN}) {
    width: 60%;
  }
  @media (max-width: ${sizes.TABLET_L}) {
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
  }
  @media (max-width: ${sizes.MOBILE_MAX}) {
    text-align: left;
  }
`;
