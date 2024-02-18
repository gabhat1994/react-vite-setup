import styled from 'styled-components';
import { mediaSizes } from '@/constants/devices';
import Typography from '@/components/Typography';

export const BodyContainer = styled.div<{
  disabled?: boolean;
}>`
  position: relative;
  padding-bottom: 16px;
`;

export const LeftSideBarContainer = styled.div`
  @media (min-width: ${mediaSizes.TABLET_MAX}) {
    width: 100%;
    margin-top: 16px;
    display: block;
  }
  @media (min-width: 1024px) {
    margin: 0 28px 0 0;
  }

  @media (max-width: ${mediaSizes.TABLET_L}) {
    a {
      width: unset;
      #Nav-label {
        ${Typography.headingTypography.headingXSmallBold}
      }
    }
  }
`;

export const ElementWrapper = styled.div`
  width: 100%;
`;
