import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { type Property } from 'csstype';
import { cssVar, rgba } from 'polished';
import { defaultScrollBar } from '@/common/globalStyles';
import { footnoteTypography, bodyTypography } from '@/components/Typography';
import { type Intent } from './types';

export const DropdownContainer = styled(motion.div)<{
  containerWidth?: string;
  containerHeight?: string;
  maxContainerHeight?: string;
  minHeight?: string;
  padding?: string;
  refTop?: number;
  isMobile?: boolean;
  isPositionedTop?: boolean;
  unsetOverflow?: boolean;
}>`
  font-family: var(--font-family);
  background: var(--bg-tablecell-neutral-alt-default);
  box-shadow: 0 2px 16px ${rgba(cssVar('--shadow-neutral-default'), 0.08)};
  border-radius: 8px;
  z-index: 9999999;
  outline: none;
  padding: ${({ padding }) => padding ?? '5px 0'};
  width: ${({ containerWidth }) => containerWidth ?? '200px'};
  user-select: none;
  max-height: calc(100vh - ${({ refTop }) => refTop ?? 0}px - 100px);
  display: flex;
  flex-direction: column;
  min-height: ${({ minHeight }) => minHeight || '50px'};
  ${defaultScrollBar};
  ${({ containerHeight }) => containerHeight && `height: ${containerHeight};`};
  ${({ maxContainerHeight }) =>
    maxContainerHeight && `max-height: ${maxContainerHeight};`};
  ${({ isPositionedTop, refTop }) =>
    isPositionedTop && refTop && `max-height: calc(${refTop}px - 150px);`};
`;

export const DropdownDividerItem = styled.div`
  width: 100%;
  border-top: 1px solid var(--bg-separator-neutral-default);
  margin-top: 5px;
  margin-bottom: 5px;
`;

export const DropdownHeaderItem = styled.div`
  font: ${footnoteTypography.footnoteBold};
  color: var(--text-tablecell-body-neutral-default);
  user-select: none;
  padding: 5px 15px;
  display: flex;
  justify-content: space-between;
`;

interface DropdownItemLayoutProps {
  drillDown?: boolean;
  disabled?: boolean;
  active?: boolean;
  intent?: Intent;
  isBottomBorder?: boolean;
  containerPadding?: string;
  isSpacedNormally?: boolean;
}

const DropdownItemIntentDanger = css`
  color: var(--text-tablecell-header-danger-primary-highlighted);
  &:hover {
    background: var(--bg-tablecell-danger-primary-hover);
  }
`;

export const DropdownItemLayout = styled.a<DropdownItemLayoutProps>`
  transition: background-color 0.1s ease-in-out;
  outline: none;
  padding: ${(p) =>
    p.containerPadding ??
    `12.5px ${p.drillDown ? '0px' : '15px'} 12.5px
    12.5px;`};
  display: flex;
  user-select: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  background-color: ${({ active }) =>
    active ? 'var(--bg-tablecell-neutral-alt-default)' : ''};

  border-bottom: 1px solid var(--bg-separator-neutral-default);

  &:last-of-type {
    border-bottom-color: transparent;
  }
  &:hover {
    background-color: ${({ disabled }) =>
      disabled ? 'none' : 'var(--bg-tablecell-neutral-hover)'};
  }

  &:focus {
    background-color: var(--bg-tablecell-neutral-hover);
  }

  &:active {
    background-color: var(--bg-tablecell-neutral-alt-default);
  }

  font-size: var(--font-body-medium-size);
  font-weight: var(--font-body-medium-bold-weight);
  align-items: center;
  justify-content: space-evenly;

  ${({ isSpacedNormally }) => isSpacedNormally && 'justify-content: normal'};

  position: relative;
  opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};
  text-decoration: none;
  ${({ isBottomBorder }) =>
    isBottomBorder &&
    'border-bottom: 1px solid var(--bg-separator-neutral-default)'};

  &:last-child {
    border-bottom: none;
  }

  ${({ intent }) => intent === 'danger' && DropdownItemIntentDanger}
`;

export const ExpandButton = styled.button`
  cursor: pointer;
  padding: 0;
  padding-right: 15px;
  padding-left: 15px;
  margin: 0;
  border: none;
  background: none;
  height: 24px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
`;

export const DropDownLabel = styled.div<{
  selected?: boolean;
  hasSubItems?: boolean;
  labelColor?: string;
  contentCentered?: boolean;
}>`
  width: ${({ hasSubItems }) => (hasSubItems ? 'calc(100% - 30px)' : '100%')};
  color: ${({ selected }) =>
    selected
      ? 'var(--text-tablecell-header-brand-primary-selected)'
      : 'var(--text-tablecell-header-neutral-highlighted)'};
  font-weight: ${({ selected }) => (selected ? 500 : 400)};
  ${({ labelColor }) => Boolean(labelColor) && `color: var(${labelColor});`}
  display: flex;
  align-items: center;
  padding-right: 16x;
  gap: 16px;
  user-select: none;
  ${({ contentCentered }) => contentCentered && 'justify-content: center'};
  .resetButton & {
    color: var(--icon-input-brand-primary-default);
    border: red;
    font-size: 12px;
  }
`;

export const DropdownIcon = styled.div<{ iconColumnWidth?: number }>`
  width: ${({ iconColumnWidth }) => `${iconColumnWidth ?? 24}px`};

  .resetButton & {
    color: var(--icon-input-neutral-default);
    border: blue;
  }
`;

export const DropdownInternalSearchInputContainer = styled.div`
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
`;

export const DropdownNoSearchResultsContainer = styled.div<{
  justifyContent?: Property.JustifyContent;
}>`
  box-sizing: border-box;
  padding: 12px;
  width: 100%;
  height: 46px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: ${({ justifyContent }) => `${justifyContent || 'center'}`};
`;

export const DropdownValueWrapper = styled.div<{
  fontFamily?: string;
}>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: ${({ fontFamily }) => fontFamily || 'unset'};
`;

export const DropdownValueLabel = styled.div<{
  intent?: string;
  isMatchedBoldText?: boolean;
  fontFamily?: string;
}>`
  user-select: none;
  ${({ intent }) =>
    (!intent || (intent && intent !== 'danger')) &&
    'color: var(--text-tablecell-header-neutral-highlighted)'};
  font-size: var(--font-body-medium-size);
  font-weight: ${(p) =>
    p.isMatchedBoldText
      ? 'var(--font-body-medium-regular-weight)'
      : 'var(--font-body-medium-bold-weight)'};
  line-height: var(--font-body-medium-lineheight);
  font-family: ${({ fontFamily }) =>
    fontFamily || 'var(--font-body-medium-bold-font);'};
  text-align: left;
  ${(p) =>
    p.isMatchedBoldText &&
    css`
      ${bodyTypography.bodyMedium}
      span {
        ${bodyTypography.bodyMediumBold}
      }
    `};
`;

export const DropdownValueDescription = styled.div<{ intent?: Intent }>`
  user-select: none;
  color: var(--text-tablecell-body-neutral-default);
  font-family: var(--font-footnote-regular-font);
  font-size: var(--font-footnote-regular-size);
  font-weight: var(--font-footnote-regular-weight);
  line-height: var(--font-footnote-regular-lineheight);
  text-align: left;
`;

export const CloseDropDownIcon = styled.div`
  margin-left: 16px;
  margin-top: 36px;
  margin-bottom: 10px;
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const DropdownPicker = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;
