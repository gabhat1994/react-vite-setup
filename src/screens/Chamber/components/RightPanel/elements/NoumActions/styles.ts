import styled, { css } from 'styled-components';
import { Stack } from '@/layout';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { devices, sizes } from '@/constants/devices';

export const NoumActionButton = styled(Button)<{ isNoumEditor?: boolean }>`
  ${({ isNoumEditor }) => !isNoumEditor && 'flex: 1'};
  ${({ isNoumEditor }) =>
    isNoumEditor &&
    css`
      @media (max-width: ${sizes.MOBILE_L}) {
        width: 100%;
      }
    `};
`;

export const ColumnContainer = styled(Stack)<{ gap?: number }>`
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: ${({ gap }) => `${gap ?? 12}px`};
`;
export const RowContainer = styled(Stack)<{ gap?: number }>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${({ gap }) => `${gap ?? 12}px`};
`;

export const TextContainer = styled(Stack)``;

export const ActionsWrapper = styled(Card)`
  padding: 16px;
  border-radius: 0;
  overflow: visible;

  @media ${devices.TABLET} {
    border-radius: 16px;
  }
`;

export const EllipsisWrapper = styled.div`
  button {
    background: var(--icon-button-neutral-alt-default);
  }
`;

export const InvitedWrapper = styled(Stack)`
  background: var(--bg-card-neutral-default);
  border-radius: 8px;
`;

export const InvitedButtonsStack = styled(Stack)`
  width: 289px;
  @media (max-width: ${sizes.MOBILE_L}) {
    width: 100%;
  }
`;

export const InvitedButtons = styled(Button)`
  background: var(--bg-button-neutral-alt-default);
`;
