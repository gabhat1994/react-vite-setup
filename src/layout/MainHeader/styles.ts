import { Button, Icon } from '@/components';
import { Badge } from '@/components/Badge/Badge';
import { type LabelType } from '@/components/Header';
import {
  MediumLabel,
  Wrapper,
  xsBlock,
  xsHidden,
} from '@/components/Header/styles';
import { mediaSizes, sizes } from '@/constants/devices';
import { IconContainerDefaultCss } from '@/screens/Chamber/EditChamber/styles';
import styled, { css } from 'styled-components';

const MainHeaderWrapperCss = css`
  ${Wrapper}
  justify-content: space-between;
  height: 40px;
  @media (min-width: ${sizes.LAPTOP_L}) {
    width: 1360px;
    margin: 0 auto;
  }
`;

export const MainHeaderWrapper = styled.div`
  width: 100% !important;
  ${MainHeaderWrapperCss}
`;

export const NotificationWrapper = styled.div`
  width: 425px;
  display: flex;
  justify-content: flex-end;
  padding: 0px;
`;

export const NotificationsIcon = styled(Icon)`
  position: relative;
  top: 0;
  right: 0;
`;

export const NotificationBadge = styled(Badge)`
  background: var(--bg-badge-danger-primary-default);
  border: 2px solid var(--bg-top-nav-neutral-alt-default);
  border-radius: 1000px;
`;

export const BadgeContainer = styled.div`
  position: absolute;
  display: flex;
  top: 4px;
  right: 7px;
`;

export const MainHeaderLabel = styled.span<LabelType>`
  ${MediumLabel}
  ${xsHidden}
  color: var(--link-top-nav-global-element-neutral-default);
  margin-right: ${(props) =>
    props.marginRight ? `${props.marginRight}px` : 0};
  margin-left: ${(props) => (props.marginLeft ? `${props.marginLeft}px` : 0)};
`;

const IconContainerCss = css`
  ${IconContainerDefaultCss}
  &.ml-0 {
    margin-left: 0;
  }
  &.mr-0 {
    margin-right: 0;
  }
  &.xs-hidden {
    ${xsHidden}
  }
  &.xs-block {
    ${xsBlock}
  }
  .xs-hidden {
    ${xsHidden}
  }
  .xs-block {
    ${xsBlock}
  }
  @media (max-width: ${sizes.MOBILE_S}) {
    padding: 5px;
  }
`;

export const IconContainer = styled.div<{ isDisabled?: boolean }>`
  ${IconContainerCss}
  border: 1px solid var(--border-top-nav-global-element-neutral-default);

  cursor: ${(props) => (props.isDisabled ? 'default' : 'pointer')};
  pointer-events: ${(props) => (props.isDisabled ? 'none' : 'auto')};
`;

export const LogoutContainer = styled.div`
  display: inline-flex;
  margin: auto 0;
  margin-left: 8px;
`;
export const Logout = styled(Button)`
  @media (max-width: ${sizes.MOBILE_MAX}) {
    display: none;
  }
`;

export const LogoutIcon = styled(Icon)`
  ${xsBlock}
`;

export const SearchWrapper = styled.div`
  max-width: 500px;
  width: 100%;
  @media (max-width: ${sizes.TABLET_L}) {
    max-width: 230px;
  }
  @media (max-width: ${mediaSizes.MOBILE_L_MIN}) {
    display: none;
  }
`;
