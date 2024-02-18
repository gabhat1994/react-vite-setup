import styled from 'styled-components';
import { Card } from '@/components/Card';

export const Column = styled(Card)<{ width: number; inActive?: boolean }>`
  width: ${({ width }) => width && `${width}%`};
  height: 52px;
  padding: 0px;
  border-radius: 4px;
  background: var(--bg-section-picker-brand-secondary-default);
  border: 1px solid var(--border-section-picker-brand-secondary-default);
  &.inActive {
    background: var(--bg-section-picker-neutral-disabled);
    border: none;
  }
  cursor: inherit;
`;

export const Container = styled(Card)`
  width: 112px;
  height: 64px;
  border: 1px solid var(--border-card-neutral-default);
  border-radius: 8px;
  padding: 6px;
  gap: 3px;
  display: flex;
  flex-direction: row;
  &:hover {
    background: var(--bg-section-picker-brand-secondary-default);
    cursor: pointer;
    border: 1px solid var(--color-base-primary-60);
    & > ${Column} {
      background: var(--bg-section-picker-brand-primary-default);
      &.inActive {
        background: var(--bg-section-picker-brand-secondary-disabled);
      }
    }
  }
`;
