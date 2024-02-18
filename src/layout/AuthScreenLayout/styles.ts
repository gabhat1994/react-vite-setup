import styled from 'styled-components';
import { sizes } from '@/constants/devices';
import { Stack } from '../Stack';

export const Root = styled(Stack)<{
  dynamicHeight?: boolean;
  dynamicWidth?: boolean;
}>`
  background-color: var(--bg-body-neutral-alt-default);
  height: 100vh;
  @media (max-width: ${sizes.MOBILE_L}) {
    height: 85vh;
    ${(props) => props.dynamicHeight && `height: unset`}
  }
  ${(props) => props.dynamicHeight && `height: unset`}
  ${({ dynamicWidth }) => !dynamicWidth && 'width: 100vw;'}
`;

export const MainContainer = styled(Stack)`
  flex: 1;
  padding: 40px;
  max-height: 100vh;
  max-width: 100vw;
  height: 100%;
  @media (max-width: ${sizes.MOBILE_L}) {
    padding: 16px;
    height: 100vh;
  }
`;

// export const LogoImg = styled.img`
//   height: 32px;
//   width: fit-content;
//   cursor: pointer;

//   @media (max-width: ${sizes.MOBILE_L}) {
//     height: 26px;
//   }
// `;

export const SideImage = styled.div<{ background: string }>`
  flex: 1;
  height: 100vh;
  width: 100%;
  background: ${(props) => `url(${props.background}) center center no-repeat`};
  background-size: cover;

  @media (max-width: ${sizes.TABLET_L}) {
    display: none;
  }
`;

export const LayoutStyles = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
};
