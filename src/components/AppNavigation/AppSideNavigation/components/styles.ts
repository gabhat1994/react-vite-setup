import { Button } from '@/components/Button';
import { ButtonText } from '@/components/Button/styles';
import { BasicPopoverContent } from '@/components/Popover/Popover';
import { footnoteBold, TSpan } from '@/components/Typography/Typography';
import { Stack } from '@/layout';
import styled, { css } from 'styled-components';
import { type NavItemsListVariant } from '../types';

const Padding = styled.div<{
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
}>`
  ${({ top }) => top && `padding-top: 16px;`}
  ${({ bottom }) => bottom && `padding-bottom: 16px;`}
  ${({ left }) => left && `padding-left: 16px;`}
  ${({ right }) => right && `padding-right: 16px;`}
`;

const NavItemList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`;

const NavItemIndicator = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 2px;
  height: 19px;
  border-radius: 8px;
  background-color: transparent;
`;

const NavItemLabel = styled.div`
  min-width: 120px;
  line-height: 100%;
  text-align: left;
`;

const NavItemChevronContainer = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(-20%, -50%);

  & path {
    fill: currentColor;
  }
`;

const NavItemLi = styled.li`
  width: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItemButton = styled.button<{
  $isActive: boolean;
  $variant: NavItemsListVariant;
}>`
  display: flex;
  gap: 12px;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: ${(props) => (props.$variant === 'nav' ? '8px 16px' : '8px')};
  ${footnoteBold}
  color: var(--text-side-navigation-neutral-default);
  cursor: pointer;
  position: relative;
  background-color: transparent;
  border: none;

  ${NavItemChevronContainer} {
    color: var(--icon-main-navigation-neutral-default);
  }

  &:hover {
    color: var(--text-side-navigation-neutral-hover);
  }

  &:hover ${NavItemIndicator} {
    background-color: var(--bg-menu-indicator-neutral-default);
  }

  &:hover ${NavItemChevronContainer} {
    color: var(--icon-main-navigation-neutral-highlighted);
  }

  ${(props) =>
    props.$isActive &&
    `
    &, &:hover {
        color: var(--text-side-navigation-brand-primary-default);
    }

    ${NavItemIndicator}, &:hover ${NavItemIndicator} {
        background-color: var(--bg-menu-indicator-brand-primary-default);
    }
    ${NavItemChevronContainer}, &:hover ${NavItemChevronContainer} {
      color: var(--bg-menu-indicator-brand-primary-default);
  }
  `}
`;

const NavItemsListHeader = styled(TSpan).attrs(() => ({
  font: 'footnote-bold',
  colorToken: '--text-tablecell-header-neutral-default',
}))``;

const ResetButtonSize = css`
  height: auto;
  width: auto;
  min-width: min-content;
  min-height: min-content;
`;
const ExpandCollapseButton = styled(Button).attrs(() => ({
  tertiary: true,
  size: 'small',
}))`
  padding: 0;
  transition: opacity 0.3s;
  ${ResetButtonSize}
`;

const PersistentContainer = styled(Stack).attrs<{ $isExpanded: boolean }>(
  () => ({
    vertical: true,
    align: 'stretch',
    gap: 16,
  }),
)<{ $isExpanded: boolean }>`
  padding: 16px 0;
  height: 100%;
  width: ${(props) => (props.$isExpanded ? '220px' : 'min-content')};
  background-color: var(--bg-card-neutral-alt-default);
  border-right: 1px solid var(--border-side-navigation-neutral-default);
  z-index: 50;

  & * {
    box-sizing: border-box;
  }

  @media (hover: hover) {
    ${ExpandCollapseButton} {
      opacity: 0;
    }

    &:hover ${ExpandCollapseButton} {
      opacity: 1;
    }
  }
`;

const IconButton = styled(Button).attrs(() => ({
  tertiary: true,
  size: 'small',
}))`
  ${ResetButtonSize}
  width: 32px;
  height: 32px;
  padding: 3px;
  flex-shrink: 0;
`;

const CreateButton = styled(Button).attrs(() => ({
  tertiary: true,
  size: 'full_small',
}))`
  min-height: 32px;
  height: 32px;
`;

const PopoverContent = styled(BasicPopoverContent)`
  padding: 0;
  border-radius: 0 8px 8px 0;
  border: none;
  margin-right: 1px;
`;

const UserButton = styled(Button)`
  width: 100%;
  border: 1px solid var(--color-base-secondary-25);
  padding-right: 4px;
  align-items: center;
  justify-content: flex-start;

  &:hover {
    background-color: var(--bg-card-neutral-hover);
  }

  ${ButtonText} {
    flex-grow: 1;
    text-align: left;
    ${footnoteBold}
    overflow: hidden;
  }
`;

export default {
  Padding,
  IconButton,
  CreateButton,
  NavItemButton,
  NavItemIndicator,
  NavItemsListHeader,
  PersistentContainer,
  ExpandCollapseButton,
  NavItemList,
  NavItemLabel,
  NavItemChevronContainer,
  PopoverContent,
  UserButton,
  NavItemLi,
};
