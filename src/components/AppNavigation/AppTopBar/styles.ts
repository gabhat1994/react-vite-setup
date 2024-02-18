import { Button } from '@/components/Button';
import { ButtonText } from '@/components/Button/styles';
import { BasicPopoverContent } from '@/components/Popover/Popover';
import { Separator } from '@/components/Separator/Separator';
import { footnoteBold } from '@/components/Typography/Typography';
import { Stack } from '@/layout';
import styled from 'styled-components';

export const TopBarContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f2eefe;
  padding: 12px 16px;
  background: var(--bg-card-neutral-alt-default);
`;

export const TopBarGroup = styled(Stack).attrs(() => ({ align: 'center' }))``;

export const TopBarSeparator = styled(Separator)<{ $margin?: string }>`
  border-width: 0 1px 0 0;
  width: 0;
  height: 24px;
  margin: ${(props) => props.$margin || '0 2px'};
`;

export const TopBarActivityIconButton = styled(Button).attrs(() => ({
  neutral: true,
  size: 'small',
}))`
  display: inline-flex;

  &,
  &:hover,
  &:active {
    background-color: transparent;
  }
`;

export const TopBarActivityIconContainer = styled.div`
  position: relative;
`;

export const TopBarActivityIconDot = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 4px;
  right: 5px;
  border-radius: 100%;
  border: 2px solid white;
  background-color: var(--bg-badge-brand-primary-default);
  width: 12px;
  height: 12px;
`;

export const PopoverContent = styled(BasicPopoverContent)`
  padding: 0;
  border-radius: 0 0 8px 8px;
  border: none;
`;

export const NavItemList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`;

export const UserButton = styled(Button).attrs(() => ({
  size: 'small',
}))`
  width: 100%;
  padding-right: 4px;
  align-items: center;
  justify-content: flex-start;

  ${ButtonText} {
    flex-grow: 1;
    text-align: left;
    ${footnoteBold}
    overflow: hidden;
  }
`;
