import styled, { type CSSProperties, css } from 'styled-components';
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
    ${(props) => props.dynamicHeight && `height: unset;`}
  }
  ${(props) => props.dynamicHeight && `height: unset;`}
  ${({ dynamicWidth }) => !dynamicWidth && 'width: 100vw;'}
`;

export const MainContainer = styled(Stack).attrs({})`
  width: 100%;
  height: 100%;
  position: relative;
  padding-top: 40px;
  @media (max-width: ${sizes.MOBILE_MAX}) {
    padding: 0px;
  }

  @media (max-width: ${sizes.MOBILE_L}) {
    height: 100vh;
  }
`;

export const HeaderStack = styled(Stack)`
  position: absolute;
  padding-left: 40px;
  @media (max-width: ${sizes.MOBILE_MAX}) {
    padding: 16px;
    position: relative;
    box-shadow: 0px 2px 16px rgba(32, 17, 62, 0.08);
  }
`;

export const ChildrenStack = styled(Stack).attrs({
  fullWidth: true,
  vertical: true,
  align: 'center',
})<{ fullHeight: boolean; minHeight?: CSSProperties['minHeight'] }>`
  background: url(${QuickSignUp}) no-repeat;
  background-size: 100%;
  ${({ fullHeight }) => fullHeight && `height: 100%;`}
  ${({ fullHeight }) => !fullHeight && `height: auto;`}
  @media (max-width: ${sizes.MOBILE_MAX}) {
    background: none;
    padding: 16px;
  }
  @media (max-width: ${sizes.MOBILE_L}) {
    ${({ minHeight }) =>
      minHeight &&
      css`
        min-height: ${minHeight}px;
      `}
  }
`;

export const ButtonWrapper = styled.div`
  width: 95px;
  height: 40px;
  align-self: flex-start;
  @media (max-width: ${sizes.MOBILE_MAX}) {
    width: auto;
  }
`;
