import { TSpan } from '@/components';
import { sizes } from '@/constants/devices';
import { Stack } from '@/layout';
import styled from 'styled-components';

export const Wrapper = styled(Stack).attrs({
  align: 'start',
  justify: 'center',
  vertical: true,
})`
  align-self: stretch;
  border-radius: 16px;
  background: var(--bg-card-neutral-alt-default);
  height: fit-content;
  @media only screen and (max-width: ${sizes.MOBILE_MAX}) {
    border-radius: 0px;
  }
`;

export const HistoryCardStack = styled(Stack).attrs({
  fullWidth: true,
  align: 'center',
  justify: 'space-between',
})`
  padding: 16px 0px;
  border-bottom: 1px solid var(--border-card-neutral-default);
`;

export const InformationStack = styled(Stack).attrs({
  vertical: true,
  align: 'start',
})``;

export const Information = styled(Stack).attrs({
  align: 'center',
  gap: 4,
})`
  height: 24px;
`;

export const BulletWrapper = styled(TSpan).attrs({
  colorToken: '--text-tablecell-body-neutral-disabled',
  font: 'body-m',
})`
  vertical-align: middle;
`;
