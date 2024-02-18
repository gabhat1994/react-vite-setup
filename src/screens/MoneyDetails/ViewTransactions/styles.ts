import styled from 'styled-components';
import { Stack } from '@/layout';
import { sizes } from '@/constants/devices';
import { TSpan } from '@/components';

export const Container = styled(Stack).attrs({
  vertical: true,
  align: 'center',
  justify: 'center',
})`
  flex: 1;
  padding-top: 24px;
`;
export const GroupWrapper = styled(Stack).attrs({
  vertical: true,
  gap: 8,
  align: 'center',
  justify: 'center',
})`
  width: 670px;
  @media (max-width: ${sizes.TABLET}) {
    width: 100%;
    padding: 0px 16px;
  }
  @media (max-width: ${sizes.MOBILE_L}) {
    padding: 0px;
  }
`;
export const CardWrapper = styled(Stack).attrs({
  vertical: true,
  gap: 8,
  fullWidth: true,
})`
  width: 100%;
`;

export const DateWrapper = styled(Stack)`
  width: 100%;
  box-sizing: border-box;
  color: var(--text-card-neutral-default);
  font-size: 14px;
  font-weight: 600;
  line-height: 22.4px;
  font-family: var(--font-family);
  padding-top: 24px;
  @media (max-width: ${sizes.TABLET}) {
    padding-left: 24px;
  }
`;

export const PaginationWrapper = styled.div`
  align-self: center;
`;

export const NoRecord = styled(TSpan).attrs({
  colorToken: '--text-tab-chips-neutral-default',
})``;
