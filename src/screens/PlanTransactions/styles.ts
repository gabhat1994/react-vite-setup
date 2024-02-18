import { TSpan } from '@/components';
import { sizes } from '@/constants/devices';
import { Stack } from '@/layout';
import styled from 'styled-components';

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

export const DateWrapper = styled(Stack)`
  width: 100%;
  box-sizing: border-box;
  padding-top: 24px;
  @media (max-width: ${sizes.TABLET}) {
    padding-left: 24px;
  }
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

export const HistoryCardStack = styled(Stack).attrs({
  fullWidth: true,
  justify: 'space-between',
  align: 'center',
})`
  border-radius: 8px;
  background: var(--bg-tablecell-neutral-alt-default);
  padding: 16px;
`;

export const NoRecord = styled(TSpan).attrs({
  colorToken: '--text-tab-chips-neutral-default',
})``;

export const PaginationWrapper = styled.div`
  align-self: center;
`;
