import styled from 'styled-components';
import { TSpan } from '@/components/Typography/index';
import { ellipsisText } from '@/common/globalStyles';
import { type EventDurationBadgeVariant } from './types';

export const colorMap: { [variant in EventDurationBadgeVariant]: string } = {
  regular: '--text-badge-neutral-default',
  urgent: '--text-badge-neutral-alt-default',
};

const backgroundColorMap: { [variant in EventDurationBadgeVariant]: string } = {
  regular: '--bg-badge-neutral-default',
  urgent: '--bg-badge-danger-primary-default',
};

export const EventDurationText = styled(TSpan).attrs({
  font: 'footnote-bold',
})`
  user-select: none;
  flex: 0 1 auto;
  line-height: 20px;
  ${ellipsisText}
`;

export const EventDurationBadgeLiveWrapper = styled.span<{
  notClickable?: boolean;
  height?: number;
  variant?: 'regular' | 'urgent';
}>`
  position: relative;
  display: inline-flex;
  border: none;
  flex: none;
  align-items: center
  cursor: ${({ notClickable }) => (notClickable ? 'cursor' : 'pointer')};
  box-sizing: border-box;
  height: ${({ height }) => height || 23}px;
  border-radius: 4px;
  flex-direction: row;
  background-color: ${({ variant }) =>
    `var(${backgroundColorMap[variant || 'regular']})`};
  color: ${({ variant }) => `var(${colorMap[variant || 'regular']})`};
  span {
    white-space: nowrap;
  }
  align-items: center;
  padding: 2px 4px;
  gap: 4px;
`;

export const EventDurationBadgeRegularWrapper = styled.span<{
  notClickable?: boolean;
  height?: number;
  variant?: 'regular' | 'urgent';
}>`
  position: relative;
  display: inline-flex;
  border: none;
  cursor: ${({ notClickable }) => (notClickable ? 'cursor' : 'pointer')};
  box-sizing: border-box;
  height: ${({ height }) => `${height}px` || 'auto'};
  align-items: center;
  border-radius: 4px;
  flex-direction: row;
  background-color: ${({ variant }) =>
    `var(${backgroundColorMap[variant || 'regular']})`};
  color: ${({ variant }) => `var(${colorMap[variant || 'regular']})`};
  span {
    white-space: nowrap;
  }
  gap: 4px;
  padding: 2px 4px;
`;
