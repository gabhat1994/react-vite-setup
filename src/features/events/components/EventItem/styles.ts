import styled, { css } from 'styled-components';
import { TagStyled } from '@/components/Tag/styles';

import {
  TSpan,
  bodyTypography,
  headingTypography,
} from '@/components/Typography';
import { sizes } from '@/constants/devices';
import { Card } from '@/components/Card';
import { type ItemType } from './types';

export const EventItemWrapper = styled(Card)<
  ItemType & {
    isRecurring: boolean;
    isCalendarType?: boolean;
    hideBottomBorder: boolean;
  }
>`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex: none;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  overflow: visible;
  ${({ isCalendarType }) =>
    !isCalendarType &&
    css`
      padding: 0;
      border-radius: 0;
    `}

  @media (max-width: ${sizes.TABLET_L}) {
    padding: 16px;
  }

  border-bottom: ${({ hideBottomBorder }) =>
    hideBottomBorder
      ? 'none'
      : '1px solid var(--border-card-neutral-highlighted)'};
  padding: 24px 16px;
  border-radius: 0;
  #atcb-customTrigger-atcb-btn-noumena-atc-host {
    top: ${({ isRecurring, isCalendarType }) =>
      isCalendarType ? '45px' : isRecurring ? '-97px' : '-145px'} !important;
    width: 0;
    position: absolute !important;
    left: 0 !important;
  }
  ${TagStyled} {
    height: auto;
    padding: 2px 4px;
    min-height: auto;
    max-height: 23px;
    border-radius: 4px;
  }
`;

export const EventItemBody = styled.div<
  ItemType & { mobileFlex?: number; align?: 'center' | 'flex-start' }
>`
  display: flex;
  flex-direction: column;
  align-items: ${({ align }) => align || 'flex-start'};
  width: 100%;
  order: 3;
  gap: ${({ type }) => (type === 'calendar' ? '4px' : '8px')};
  padding-top: ${({ type }) => (type === 'calendar' ? '8px' : '12px')};

  @media (max-width: ${sizes.MOBILE_MAX}) {
    ${({ mobileFlex }) => mobileFlex && 'flex: 1;'}
    ${({ type }) =>
      type === 'calendar' &&
      css`
        gap: 12px;
      `}
  }
`;

export const EventTitle = styled(TSpan)<ItemType>`
  word-break: break-word;
  cursor: pointer;
  ${({ type }) =>
    type === 'calendar'
      ? bodyTypography.bodyLargeBold
      : headingTypography.headingXSmallBold};
`;

export const EventItemButtonsWrapper = styled.div<ItemType>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  ${({ type, isEventDetail, isNoumLayoutSmallViewMode }) =>
    (type === 'calendar' || isEventDetail) && !isNoumLayoutSmallViewMode
      ? css`
          order: 2;
        `
      : css`
          order: 5;
          width: 100%;
          margin-top: 16px;
        `}

  @media (max-width: ${sizes.MOBILE_MAX}) {
    ${({ isNoumLayoutSmallViewMode }) =>
      isNoumLayoutSmallViewMode
        ? css`
            order: 2;
          `
        : css`
            order: 5;
            width: 100%;
            margin-top: 16px;
          `}
  }
`;
