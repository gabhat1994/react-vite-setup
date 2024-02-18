import styled from 'styled-components';
import { sizes } from '@/constants/devices';
import QuickSignUp from '@/assets/images/QuickSignUp.svg';
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
  padding: 0 40px;
  max-height: 100vh;
  max-width: 100vw;
  height: 100%;

  @media (max-width: ${sizes.MOBILE_MAX}) {
    padding: 0 20px;
  }

  @media (max-width: ${sizes.MOBILE_L}) {
    height: 100vh;
  }
`;

export const HeaderStack = styled(Stack)`
  flex: 1;
  max-height: 100vh;
  max-width: 100vw;
  height: 100%;
  @media (max-width: ${sizes.MOBILE_L}) {
    height: 100vh;
  }
  padding-top: 40px;
`;

export const LayoutStyles = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  background: `url(${QuickSignUp}) no-repeat`,
  backgroundSize: '100%',
};

export const ButtonWrapper = styled.div`
  width: 95px;
  height: 40px;
  padding-top: 30px;
`;
