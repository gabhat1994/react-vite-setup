import styled from 'styled-components';
import { Stack } from '@/layout';
import { sizes } from '@/constants/devices';

export const PlanCardStack = styled(Stack)`
  width: 300px;
  min-width: 300px;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 16px;
  border: 1px solid var(--border-card-neutral-default);
  background: var(--bg-card-neutral-alt-default);
  @media (max-width: ${sizes.MOBILE_MAX}) {
    width: 100%;
  }
  @media (min-width: ${sizes.MOBILE_MAX}) and (max-width: ${sizes.TABLET_L}) {
    width: 100%;
    flex-direction: row;
    align-items: center;
  }
`;

export const PlanInformationStack = styled(Stack).attrs({
  vertical: true,
  fullWidth: true,
  align: 'start',
  gap: 16,
})`
  padding: 24px;
  border-bottom: 1px solid var(--bg-separator-neutral-highlighted);

  @media (min-width: ${sizes.MOBILE_MAX}) and (max-width: ${sizes.TABLET_L}) {
    border-right: 1px solid var(--bg-separator-neutral-highlighted);
    border-bottom: none;
  }
`;

export const PlanBenefitsStack = styled(Stack).attrs({
  align: 'center',
  fullWidth: true,
})`
  padding: 24px;
`;
