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
  @media only screen and (max-width: ${sizes.MOBILE_MAX}) {
    border-radius: 0px;
  }
`;

export const SubHeadingWrapper = styled(Stack).attrs({
  align: 'start',
})`
  align-self: stretch;
  padding: 16px;
  border-radius: 8px 8px 0px 0px;
  border: 1px solid var(--border-card-neutral-default);
`;

export const SlotWrapper = styled(Stack).attrs({
  align: 'start',
})`
  align-self: stretch;
  padding: 16px;
  border-radius: 0px 0px 8px 8px;
  border-left: 1px solid var(--border-card-neutral-default);
  border-right: 1px solid var(--border-card-neutral-default);
  border-bottom: 1px solid var(--border-card-neutral-default);
`;


export const BulletWrapper = styled(TSpan).attrs({
  colorToken: '--text-top-nav-neutral-default',
  font: 'body-l',
})`
  vertical-align: middle;
`;
