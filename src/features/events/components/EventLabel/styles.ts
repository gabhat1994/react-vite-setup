import styled from 'styled-components';

import { sizes } from '@/constants/devices';
import { TSpan } from '@/components/Typography';
import { type EventLabelVariant } from './types';

export const EventLabelWrapper = styled.div<{
  width?: string;
  flex?: number | string;
  variant: EventLabelVariant;
}>`
  border-radius: 8px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 12px;
  width: ${({ width }) => width || 'max-content'};
  flex: ${({ flex }) => (flex === undefined ? 'unset' : flex)};
  ${({ variant }) =>
    variant === 'not_attending' &&
    `background-color: var(--bg-button-neutral-disabled)`};
  ${({ variant }) =>
    variant === 'finished' &&
    `background-color: var(--bg-button-neutral-disabled)`};
  ${({ variant }) =>
    variant === 'already_joined' &&
    `background-color: var(--bg-button-neutral-disabled)`};

  & svg > path {
    fill: var(--icon-button-neutral-pressed);
  }

  @media (max-width: ${sizes.MOBILE_MAX}) {
    width: 100%;
  }
`;

export const Label = styled(TSpan)<{ variant: EventLabelVariant }>`
  font-weight: 500;
  ${({ variant }) =>
    variant === 'not_attending' && `color: var(--text-button-neutral-default)`};
  ${({ variant }) =>
    variant === 'finished' && `color: var(--text-button-neutral-disabled)`};
  ${({ variant }) =>
    variant === 'already_joined' &&
    `color: var(--text-button-neutral-disabled)`};
`;
