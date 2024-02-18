import styled, { css } from 'styled-components';
import { Button } from '@/components/Button';
import Typography, { TSpan } from '@/components/Typography';
import { mediaSizes, sizes } from '@/constants/devices';
import { Stack } from '@/layout';
import { type LabelType } from './types';

export const xsHidden = css`
  @media (max-width: ${mediaSizes.MOBILE_L_MAX}) {
    display: none;
  }
`;

export const xsBlock = css`
  @media (min-width: 426px) {
    display: none;
  }
  @media (max-width: ${sizes.TABLET}) {
    width: 100%;
    text-align: center;
  }
`;

export const Wrapper = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: static;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
`;

const Label = css`
  font-family: var(--font-body-medium-regular-font);
  font-weight: var(--font-body-medium-regular-weight);
  line-height: var(--font-body-medium-regular-lineheight);
  color: var(--text-top-nav-neutral-highlighted);
`;

export const MediumLabel = css`
  ${Label}
  font-size: var(--font-body-medium-regular-size);
`;

const SmallLabel = css`
  ${Label}
  font-size: var(--font-body-small-regular-size);
`;

const LastUpdateLabelCss = css`
  color: var(--link-top-nav-neutral-default);
  font-family: var(--font-body-medium-regular-font);
  line-height: var(--font-body-medium-regular-lineheight);
  font-size: var(--font-body-small-regular-size);
  font-weight: var(--font-body-medium-bold-weight);
  text-decoration: underline;
  text-decoration-color: var(--link-top-nav-neutral-default);
  text-underline-position: under;
  text-align: center;
`;

export const LastUpdateLabel = styled.div`
  ${LastUpdateLabelCss}
  cursor: pointer;
  @media (max-width: 767px) {
    font-size: var(--font-link-small-size);
    margin-left: auto;
  }
`;

export const HeaderWrapper = styled.div<{ isBorderRadius: boolean }>`
  ${Wrapper}
  justify-content: space-between;
  box-sizing: border-box;
  padding: 16px 40px;
  gap: 10px;
  height: fit-content;
  background: var(--bg-top-nav-neutral-alt-default);
  box-shadow: 1px 1px 0px var(--bg-separator-neutral-default);
  position: sticky;
  top: 0;
  z-index: 50;
  border-top-left-radius: ${(props) => (props.isBorderRadius ? '20px' : '0px')};
  border-top-right-radius: ${(props) =>
    props.isBorderRadius ? '20px' : '0px'};
  font-family: var(--font-family);

  @media (max-width: ${sizes.TABLET_L}) {
    padding: 16px;
  }
`;

export const SubHeaderWrapper = styled.div`
  ${Wrapper}
  z-index: 1;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 16px 40px;
  gap: 10px;
  height: fit-content;
  background: var(--bg-top-nav-neutral-alt-default);
  box-shadow: 1px 1px 0px var(--bg-separator-neutral-default);
  position: sticky;
  top: 0;
  font-family: var(--font-family);
  @media (max-width: ${sizes.TABLET_L}) {
    padding: 16px;
  }
  @media (max-width: ${sizes.MOBILE_L}) {
    padding: 0px;
  }
`;

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

export const NavButton = styled(Button)`
  display: none;
  margin-right: 36px;
  @media (max-width: ${mediaSizes.MOBILE_L_MAX}) {
    margin-right: 16px;
  }
  @media (max-width: ${mediaSizes.TABLET_MAX}) {
    display: block;
  }
`;

export const LeftContentWrapper = styled.div`
  align-items: center;
  display: flex;
`;

const LogoWrapperDefaultCss = css`
  height: 28px;
  align-items: center;
  display: flex;
  img {
    cursor: pointer;
  }
  cursor: pointer;
  flex-direction: row;
`;

export const GuestHeaderLogoWrapper = styled.div`
  ${LogoWrapperDefaultCss}
`;

export const IconWrapper = styled.div`
  padding: 8px;
  border-radius: 8px;
  z-index: 1;
  background: var(--bg-button-neutral-default);
  @media (max-width: ${sizes.TABLET}) {
    width: fit-content;
    float: left;
    margin-right: auto;
  }
`;

export const StatusWrapperCss = css`
  display: flex;
  flex-direction: column;
  text-align: center;
  position: absolute;
  width: 100%;
  &.xs-hidden {
    ${xsHidden}
  }
  &.xs-block {
    ${xsBlock}
    margin-top: 12px;
    position: unset;
  }
`;

export const StatusWrapper = styled.div`
  position: unset !important;
  ${StatusWrapperCss}
  @media (width: ${sizes.TABLET}) {
    width: 400px;
    margin-left: 170px;
    margin-top: 11px;
  }
`;

export const ButtonsWrapper = styled(Stack)`
  @media (max-width: ${sizes.TABLET}) {
    width: fit-content;
    margin-left: auto;
  }
`;

export const NotificationWrapper = styled.div`
  width: 425px;
  display: flex;
  justify-content: flex-end;
  padding: 0px;
`;

const IconContainerDefaultCss = css`
  padding: 9px;
  height: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  margin: 6px;
  align-items: center;
  position: relative;
  cursor: pointer;
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

export const LinksContainer = styled.div<{ isDisabled?: boolean }>`
  ${IconContainerDefaultCss}
  min-width: 115px;
  cursor: ${(props) => (props.isDisabled ? 'default' : 'pointer')};
  pointer-events: ${(props) => (props.isDisabled ? 'none' : 'auto')}; ;
`;

export const MainHeaderLabel = styled.span<LabelType>`
  ${MediumLabel}
  ${xsHidden}
  color: var(--link-top-nav-global-element-neutral-default);
  margin-right: ${(props) =>
    props.marginRight ? `${props.marginRight}px` : 0};
  margin-left: ${(props) => (props.marginLeft ? `${props.marginLeft}px` : 0)};
`;

export const LinksLabel = styled.span<LabelType>`
  ${MediumLabel}
`;

export const StatusLabel = styled.div<LabelType>`
  ${(props) => props.labelSize === 'medium' && MediumLabel}
  ${(props) => props.labelSize === 'small' && SmallLabel}
`;

export const StyledButton = styled(Button)`
  @media (max-width: 768px) {
    span {
      font-weight: 500 !important;
      font-family: var(--font-family);
    }
  }
`;

export const MobileStatusWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  justify-content: center;
  ${Typography.footnoteTypography.footnote}
`;

export const EditChangeStatusText = styled(TSpan)`
  @media (min-width: 768px) {
    margin-left: 5px;
  }
  @media (max-width: 768px) {
    font-size: var(--font-link-small-size);
  }
`;

export const LogoutContainer = styled.div`
  display: inline-flex;
  margin: auto 0;
  margin-left: 8px;
`;

export const LabelWrap = styled.div`
  ${Typography.bodyTypography.bodyMediumBold}
`;

export const LeftActionButtonsWrapper = styled(Stack)`
  width: 172px;
`;
export const RightActionButtonsWrapper = styled(Stack)`
  width: 197px;
  justify-content: flex-end;
  button:first-child {
    margin-right: 12px;
  }

  @media (max-width: ${sizes.TABLET}) {
    width: fit-content;
    margin-left: auto;
  }
`;
