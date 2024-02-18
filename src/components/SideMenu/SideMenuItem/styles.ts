import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { TSpan } from '@/components/Typography/Typography';
import { sizes } from '@/constants/devices';
import { SIDE_MENU_ITEM_HEIGHT } from './utils';

export const SideMenuItemContainer = styled(Link)`
  width: 100%;
  text-decoration: none;
  &:hover {
    path {
      fill: var(--icon-tablecell-neutral-highlighted) !important;
    }
    ${TSpan} {
      color: var(--text-tablecell-header-neutral-highlighted);
    }
  }
`;

export const SideMenuItemContent = styled.div`
  height: ${SIDE_MENU_ITEM_HEIGHT}px;
  box-sizing: border-box;
  width: 100%;
  min-height: 42px;
  gap: 16px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 20px 24px 20px 40px;
  align-items: center;
  cursor: pointer;
  @media (max-width: ${sizes.TABLET_L}) {
    padding-left: 16px;
    padding-right: 16px;
  }

  &:hover {
    path {
      fill: var(--icon-tablecell-neutral-highlighted) !important;
    }
    ${TSpan} {
      color: var(--text-tablecell-header-neutral-highlighted);
    }
  }
`;

export const StyledLabel = styled.div<{
  active: boolean;
  disabled: boolean;
}>`
  flex-grow: 6;
  &:active {
    color: var(--text-tablecell-header-neutral-highlighted);
  }
`;
