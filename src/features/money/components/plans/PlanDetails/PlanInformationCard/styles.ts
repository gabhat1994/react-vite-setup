import { sizes } from '@/constants/devices';
import { Stack } from '@/layout';
import styled, { css } from 'styled-components';

export const Wrapper = styled(Stack).attrs({
  align: 'start',
  justify: 'center',
  vertical: true,
})`
  align-self: stretch;
  border-radius: 16px;
  background: var(--bg-card-neutral-alt-default);
  @media only screen and (max-width: ${sizes.MOBILE_MAX}) {
    border-radius: 0px;
  }
`;

export const PlanSectionStack = styled(Stack).attrs({
  fullWidth: true,
})`
  padding: 0;
  border-radius: 8px;
  border: 1px solid var(--border-card-neutral-default);
  background: var(--bg-card-neutral-alt-default);
  @media only screen and (max-width: ${sizes.MOBILE_MAX}) {
    flex-direction: column;
  }
`;

export const Section = styled(Stack).attrs({
  fullWidth: true,
  vertical: true,
  gap: 16,
})<{ rightBorder?: boolean }>`
  max-width: 375px;
  padding: 24px;
  ${({ rightBorder }) =>
    rightBorder &&
    css`
      border-right: 1px solid var(--border-card-neutral-default);
      @media only screen and (max-width: ${sizes.MOBILE_MAX}) {
        border-bottom: 1px solid var(--border-card-neutral-default);
        border-right: none;
      }
    `}
`;

export const SectionInternalStack = styled(Stack).attrs({
  vertical: true,
  fullWidth: true,
  gap: 8,
})``;
