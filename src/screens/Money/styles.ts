import styled from 'styled-components';
import { sizes, mediaSizes, breakpoints } from '@/constants/devices';

const MoneyWrapper = styled.div<{ isAppUiV2: boolean }>`
  display: flex;
  font-family: var(--font-family);
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  gap: 16px;

  ${(props) =>
    props.isAppUiV2
      ? `
  max-width: 100vw;
`
      : `
  @media (width: ${sizes.TABLET_L}) {
    width: 100%
    max-width: 925px;
  }
  @media (min-width: ${breakpoints.TABLET_L + 1}px) {
    width: calc(100vw - 512px);
  }
  @media (min-width: ${sizes.LAPTOP_L}) {
    max-width: 925px;
  }
  @media (max-width: ${mediaSizes.TABLET_MAX}) {
    margin-bottom: 60px;
  }
`}
`;

export const SectionWarpper = styled.div<{ isAppUiV2: boolean }>`
  ${(props) =>
    !props.isAppUiV2 &&
    `
  @media only screen and (max-width: ${sizes.TABLET_L}) and (min-width: ${sizes.TABLET}) {
    padding: 0 16px;
  }
`}
`;
export default MoneyWrapper;
