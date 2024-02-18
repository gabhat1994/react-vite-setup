import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { cssVar, rgba } from 'polished';
import { sizes, devices, mediaSizes } from '@/constants/devices';
import { Card } from '@/components/Card';
import { Stack } from '@/layout';
import { Button } from '@/components/Button';
import Typography, { TSpan } from '@/components/Typography';
import {
  defaultScrollBar,
  HIDE_SIDE_ELEMENTS,
} from '@/common/globalStyles';

interface TagLabelProps {
  bgColor: string;
  color: string;
}

export const ChamberActionButtons = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 12px 0;
  overflow-x: auto;
  gap: 12px;
  ${defaultScrollBar}
  div :first-child {
    margin-left: 0;
  }

  @media (min-width: ${sizes.LAPTOP_M}) {
    flex-wrap: nowrap;
  }

  label {
    width: 100%;
    input {
      display: none;
    }
    div {
      margin: 0;
    }
  }
  svg path {
    fill: var(--icon-input-neutral-default);
  }
  span {
    display: inline-flex;
    gap: 12px;
  }
  @media (max-width: ${HIDE_SIDE_ELEMENTS}) {
    span {
      display: none;
    }
  }

  @media (max-width: ${sizes.MOBILE_MAX}) {
    width: 100%;
    overflow: scroll;
    padding: 16px 0;
    ::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
    form {
      ::-webkit-scrollbar {
        display: none;
      }
    }
  }
`;

export const SideBarContainer = styled.div`
  width: 288px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: ${HIDE_SIDE_ELEMENTS}) {
    display: none;
  }
`;

export const EmptyCardContainer = styled.div`
  margin-top: 8px;
  @media (max-width: ${sizes.LAPTOP}) {
    width: 100%;
  }
  @media (max-width: ${sizes.MOBILE_MAX}) {
    width: calc(100vw - 32px);
    padding: 0 16px;
  }
`;

export const ChamberContainerHead = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  @media (min-width: ${sizes.TABLET}) {
    flex-direction: row;
    flex-wrap: wrap;
  }

  @media (max-width: ${sizes.MOBILE_MAX}) {
    width: 100vw;
  }
`;

export const MyPlansWrapper = styled.div`
  width: 100%;
  @media (min-width: ${HIDE_SIDE_ELEMENTS}) {
    display: none;
  }
`;

export const InvitesAndRequestsContainer = styled.div<{ isLoading: boolean }>`
  position: relative;
  transition: all 0.1s ease-in-out;
  display: flex;
  flex-direction: column;
  border: none;
  border-radius: 16px;
  cursor: default;
  padding: 12px 24px;
  justify-content: center;
  align-items: center;
  background: var(--bg-card-neutral-alt-default);
  background-size: cover;

  ${(p) =>
    !p.isLoading &&
    `button div { background-color: var(--bg-badge-brand-primary-default); border: none;}`}

  button {
    height: 42px;
    min-height: 42px;
  }

  @media (max-width: ${sizes.MOBILE_MAX}) {
    padding: 16px;
    margin: 0 16px;
  }

  @media (min-width: ${HIDE_SIDE_ELEMENTS}) {
    display: none;
  }
`;

export const ChambersDropDown = styled.span`
  align-items: center;
  @media (max-width: ${HIDE_SIDE_ELEMENTS}) {
    display: none;
  }
`;

export const PlantContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 16px;
  text-align: center;
  @media (max-width: ${sizes.MOBILE_MAX}) {
    padding: 0;
  }
`;

export const CreateChamberButton = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  background: var(--bg-card-neutral-alt-default);
  border-radius: 16px;
  padding: 16px;
  .ellipsis-menu {
    width: 56px;
  }
`;

export const MobileBottomActionsContainer = styled.div<{ isAppUiV2: boolean }>`
  box-sizing: border-box;
  display: none;
  button {
    border-radius: 16px;
    box-shadow: 0 2px 16px ${rgba(cssVar('--shadow-neutral-default'), 0.08)};
  }

  @media (max-width: ${sizes.MOBILE_MAX}) {
    padding: 0 16px;
  }

  @media (max-width: ${HIDE_SIDE_ELEMENTS}) {
    position: absolute;
    width: 100%;
    bottom: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  @media (max-width: ${mediaSizes.LAPTOP_MAX}) {
    position: fixed;
    padding: 0 4%;
    right: 0;
  }
  @media (max-width: ${mediaSizes.TABLET_MAX}) {
    bottom: ${(props) => (props.isAppUiV2 ? '24px' : '100px')};
  }
  z-index: 2;
`;

export const MobileButtons = styled(Button)`
  border-radius: 16px;
  box-shadow: 0 2px 16px ${rgba(cssVar('--shadow-neutral-default'), 0.08)}; ;
`;
export const FilterSelected = styled.span<{ show?: boolean }>`
  display: ${({ show }) => (show ? 'block' : 'none')};
  position: absolute;
  width: 8px;
  height: 8px;
  top: 15px;
  right: 83px;
  background: var(--bg-badge-danger-primary-default);
  border: 2px solid var(--border-badge-neutral-alt-default);
  border-radius: 1000px;
  @media (max-width: ${mediaSizes.MOBILE_L_MAX}) {
    right: 100px;
  }
`;

export const SpinnerContainer = styled.div`
  @media (min-width: ${sizes.LAPTOP_L}) {
    width: 912px;
  }
`;

export const Container = styled(Stack)<{ isAppUiV2: boolean }>`
  width: 100%;
  ${(props) =>
    !props.isAppUiV2 &&
    `
  @media (min-width: ${sizes.TABLET_L}) and (max-width: ${sizes.LAPTOP_L}) {
    width: calc(100vw - 480px);
    max-width: 924px;
  }
  @media (min-width: ${sizes.TABLET}) and (max-width: ${sizes.TABLET_L}) {
    width: calc(100vw - 32px);
  }
  @media (min-width: ${sizes.LAPTOP_L}) {
    width: calc(100vw - 516px);
    max-width: 924px;
  }
  @media (min-width: ${sizes.DESKTOP}) {
    max-width: 924px;
  }
  @media (max-width: ${sizes.TABLET_L}) {
    padding-bottom: 95px;
  }
  `}
`;

export const ChambersHeadWrapper = styled(Card)`
  border-radius: 0;
  flex: 1;

  @media ${devices.TABLET} {
    border-radius: 16px;
  }
  @media (max-width: ${mediaSizes.MOBILE_L_MAX}) {
    padding: 0 16px;
  }
`;

export const RightSpinnerContainer = styled(Stack)`
  position: relative;
  padding: 5px;
  @media (max-width: ${sizes.LAPTOP_M}) {
    padding: 8px;
    height: 24px;
    width: 24px;
  }
`;

export const AppStyled = styled.div`
  width: 100%;
`;

export const InviteLabel = styled(TSpan)`
  font-weight: 500;
  font-size: 16px;
  line-height: 100%;
`;

export const AlertIconStyled = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  border: 2px solid var(--border-badge-neutral-alt-default);
`;

export const IconButtonStyled = styled.div`
  position: relative;
`;

export const TagLabel = styled.div<TagLabelProps>`
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  padding: 0 8px;
  min-height: 22px;
  font-weight: var(--font-body-small-bold-weight);
  font-size: var(--font-body-medium-size);
  text-align: center;
`;

// Linked noum CSS
export const LinkedNoumContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 24px;
`;
export const LinkedNoum = styled(Stack)`
  border-radius: 16px;
  background: var(--bg-tablecell-neutral-alt-default);
  @media (max-width: ${mediaSizes.MOBILE_L_MAX}) {
    width: 100vw;
  }
`;

export const StyledTSpan = styled(TSpan)<{
  gap?: number;
  isTurncate?: boolean;
  isMobile?: boolean;
}>`
  display: flex;
  ${({ isMobile }) => isMobile && `flex-direction:column `};
  ${({ gap }) => gap && `gap: ${gap}px`};
  ${({ isTurncate }) =>
    isTurncate &&
    css`
      display: inline-block;
      width: 118px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `}
`;
export const LinkedTagLabel = styled.div<TagLabelProps>`
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  padding: 0 6px;
  height: 22px;
  ${Typography.footnoteTypography.footnoteBold}
`;

export const IncrementLinkNoum = styled(Stack)`
  border-radius: 8px;
  border: 1px solid var(--border-card-neutral-default);
  cursor: pointer;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  width: 100%;
`;

export const StyledLinkContainer = styled.div`
  border-radius: 8px;
  border: 1px solid var(--border-card-neutral-default);
  display: flex;
  gap: 12px;
  padding: 12px;
  align-items: center;
`;

export const LinkContainer = styled.div`
  padding: 12px;
  &:hover {
    background: var(--bg-card-neutral-alt-default);
  }
`;

export const LinkUnderline = styled.div`
  min-width: 100%;
  height: 1px;
  background-color: var(--bg-separator-neutral-default);
`;

export const TextOnlySpan = styled(TSpan)`
  padding: 12px;
  margin: auto;
`;

export const LinkNoumHeadParent = styled(Stack)`
  overflow-x: auto;
  overflow-y: hidden;
  width: -webkit-fill-available;
  ::-webkit-scrollbar {
    display: none;
  }
`;

/* EllipsisMenu CSS */
export const OptionContainer = styled.div<{ intent?: string }>`
  display: inline-flex;
  gap: 16px;
  padding: 12px;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px solid var(--bg-separator-neutral-default);
  ${({ intent }) =>
    intent === 'danger' &&
    'svg path { fill: var(--bg-button-danger-primary-default)};'}

  &:hover {
    background-color: var(--bg-tablecell-neutral-hover);
  }
`;

export const SpinnerWrapper = styled(Card)`
  height: 50px;
  width: 147px;
`;

export const SubFilterWrapper = styled.div`
  @media (max-width: ${sizes.MOBILE_MAX}) {
    margin-left: 10px;
  }
  margin-left: -6px;
`;

export const ProjectsVisibiltyText = styled(TSpan)`
  text-transform: capitalize;
`;
