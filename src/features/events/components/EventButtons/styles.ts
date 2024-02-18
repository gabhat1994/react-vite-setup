import styled, { css } from 'styled-components';

import { Stack } from '@/layout';
import { sizes } from '@/constants/devices';
import { Button } from '@/components/Button';
import { systemInfoSmallTypography, TSpan } from '@/components/Typography';

const TooltipHover = css`
  &[data-title]:target {
    display: none;
  }
  &[data-title]:hover::after {
    content: attr(data-title);
    position: absolute;
    background-color: var(--bg-tooltip-neutral-default);
    color: var(--text-tooltip-neutral-alt-default);
    padding: 6px 8px;
    border-radius: 4px;
    white-space: nowrap;
    top: -30px;
    left: 1px;
    z-index: 9999999999;
    ${systemInfoSmallTypography.systemInfoSmall}
  }
`;

export const EventButton = styled(Button)<{
  width?: string;
  minWidth?: string;
  flex?: number | string;
  iconOnly?: boolean;
}>`
  height: unset;
  min-height: 40px;
  max-height: unset;
  min-width: ${({ minWidth }) => minWidth || 'unset'};
  max-width: unset;
  padding: ${({ iconOnly }) => (iconOnly ? `8px` : `8px 16px`)};
  width: ${({ width }) => width || 'max-content'};
  flex: ${({ flex }) => (flex === undefined ? 'unset' : `${flex} !important`)};

  ${TooltipHover}
`;

export const EventButtonAccepted = styled(EventButton)<{ withLabel: boolean }>`
  border-radius: 8px;
  padding-right: ${({ withLabel }) => (withLabel ? '12px' : '8px')};
`;

export const InvitationButtonsWrapper = styled.div<{
  width?: string;
  flex?: number | string;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: ${({ width }) => width || 'max-content'};
  flex: ${({ flex }) => (flex === undefined ? 'unset' : flex)};

  @media (max-width: ${sizes.MOBILE_MAX}) {
    flex: 1;
  }
`;

export const AttendingButtonWrapper = styled.div<{
  width?: string;
  flex?: number | string;
  isAttending?: boolean;
  disabled: boolean;
}>`
  position: relative;
  border-radius: 8px;
  height: 40px;
  width: ${({ width }) => width || '130px'};
  flex: ${({ flex }) => (flex === undefined ? 'unset' : flex)};
  background-color: ${({ disabled }) =>
    disabled
      ? 'var(--bg-button-neutral-disabled)'
      : 'var(--bg-button-neutral-default)'};
  transition: all 0.1s ease-in-out;
  padding: 0 13px;
  ${TooltipHover}
  &:hover {
    background-color: ${({ isAttending, disabled }) =>
      disabled
        ? 'var(--bg-button-neutral-disabled)'
        : isAttending
        ? 'var(--bg-button-brand-secondary-default)'
        : 'var(--bg-button-neutral-default)'};
  }

  & * {
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    user-select: none;
  }

  @media (max-width: ${sizes.MOBILE_MAX}) {
    flex: 1;
  }
`;

export const AttendingSelectedOptionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 100%;
  gap: 8px;
`;

export const SpinnerContainer = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AttendingLabel = styled(TSpan)`
  text-align: left;
  flex: 1;
  font-weight: 500;
  color: var(--text-button-neutral-default);
`;

export const AttendingOptionIcon = styled.div<{ selected?: boolean }>`
  width: 24px;
  height: 24px;
  box-sizing: border-box;
  border: 1px solid var(--border-radiobutton-neutral-default);
  border-radius: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: ' ';
    width: 12px;
    height: 12px;
    border-radius: 100%;
    background-color: ${({ selected }) =>
      selected
        ? 'var(--icon-radiobutton-brand-primary-default)'
        : 'transparent'};
  }
`;

export const AttendingOptionWrapper = styled(Button)`
  border-radius: 0;
  min-height: unset;
  padding-top: 0;
  padding-bottom: 0;
  height: 48px;
  display: flex;
  justify-content: flex-start;
`;

export const AddToCalendarWrapper = styled.div`
  position: relative;
`;

export const NoumEditorAddToCalendar = styled(Button)<{
  isEventDetailPage?: boolean;
}>`
  background: ${({ isEventDetailPage }) =>
    isEventDetailPage
      ? 'var(--bg-button-neutral-default)'
      : 'var(--bg-card-neutral-alt-default)'};
  border-radius: ${({ isEventDetailPage }) =>
    isEventDetailPage ? '8px' : '0'};
  justify-content: space-between;
  min-width: auto;
  :hover {
    background: var(--bg-card-brand-secondary-highlighted);
  }
`;

export const EllipsisItems = styled(Stack)`
  cursor: pointer;
  :hover {
    background: var(--bg-card-brand-secondary-highlighted);
  }
`;
