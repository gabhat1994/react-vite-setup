import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { mediaSizes, sizes } from '@/constants/devices';
import { footnoteBold } from '@/components/Typography/Typography';
import { type SideNavItemCssProps } from './types';

const IconStyles = css<{
  disabled: boolean;
}>`
  * {
    fill: ${({ disabled }) =>
      !disabled
        ? 'var(--icon-main-nav-brand-primary-selected)'
        : 'var(--icon-main-nav-neutral-disabled)'} !important;
  }
`;

export const SideNavItemContainer = styled(Link)<SideNavItemCssProps>`
  width: 76px;
  height: 63px;
  padding: 8px;
  color: var(--link-main-nav-neutral-default);
  text-decoration: none;
  box-sizing: border-box;
  min-width: 60px;
  min-height: 53px;
  gap: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: none;
  flex-grow: 0;
  border-radius: 8px;
  background-color: ${({ active, disabled }) =>
    active && !disabled
      ? 'var(--bg-main-nav-brand-secondary-selected)'
      : 'none'};
  ${({ $isNoumSideBar }) =>
    $isNoumSideBar &&
    `
      @media (max-width: ${mediaSizes.TABLET_MAX}) {
        flex-direction: row;
      }
    `}

  @media (min-width: ${sizes.TABLET}) {
    color: ${({ active, disabled }) =>
      active && !disabled
        ? 'var(--link-main-nav-brand-primary-selected)'
        : 'var(--link-main-nav-neutral-disabled)'};
    &:hover {
      background-color: ${({ disabled }) =>
        !disabled && 'var(--bg-main-nav-brand-secondary-selected);'};
    }
  }
  @media (max-width: ${mediaSizes.TABLET_MAX}) {
    width: 68px;
    height: 55px;
    padding: 4px;
  }
  @media (max-width: ${sizes.MOBILE_L}) {
    width: 60px;
    height: 53px;
    padding: 0px;
    background: none;
  }
  ${({ disabled }) => disabled && 'cursor: not-allowed; opacity:0.5;'};
`;

export const StyledLabel = styled.div<{
  active: boolean;
  disabled: boolean;
}>`
  ${footnoteBold}
  text-decoration: none;
  color: ${({ active, disabled }) =>
    active && !disabled
      ? 'var(--link-main-nav-brand-primary-selected)'
      : 'var(--text-body-header-neutral-default)'};

  ${SideNavItemContainer}:hover & {
    color: ${({ disabled }) =>
      !disabled
        ? 'var(--link-main-nav-brand-primary-selected)'
        : 'var((--link-main-nav-neutral-default)'};
  }
`;

export const IconWrapper = styled.div<{
  active: boolean;
  disabled: boolean;
}>`
  ${SideNavItemContainer}:hover & {
    &:first-child {
      ${IconStyles}
    }
  }
  @media (max-width: ${sizes.MOBILE_L}) {
    border-radius: 8px;
    background-color: ${({ active, disabled }) =>
      active && !disabled && 'var(--bg-main-nav-brand-secondary-selected)'};
    ${SideNavItemContainer}:hover & {
      background-color: ${({ disabled }) =>
        !disabled && 'var(--bg-main-nav-neutral-alt-disabled)'};
      &:first-child {
        ${IconStyles}
      }
    }
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px;
  }
`;
