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

export const Body = styled(Stack).attrs({
  align: 'start',
  vertical: true,
  gap: 8,
})`
  align-self: stretch;
`;

export const NoumCard = styled(Stack).attrs({
  align: 'center',
  padding: 16,
  gap: 12,
})`
  align-self: stretch;
  border-radius: 8px;
  background: var(--bg-card-neutral-alt-default);
  border: 1px solid var(--border-card-neutral-default);
`;

export const Image = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 6px;
`;

export const DropdownItemWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1 0 0;
`;

export const EmptyNoumData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 16px;
  width: auto;
  height: 134px;
  flex: none;
  align-self: stretch;
  flex-grow: 0;
`;
