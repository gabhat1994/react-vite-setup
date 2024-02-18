import styled, { css } from 'styled-components';
import { Stack } from '@/layout';
import { Button, TSpan } from '@/components';
import { ResolvingAnimationState } from './types';

export const RequestsAndInvitesListWrapper = styled(Stack)`
  overflow-y: auto;
`;

export const RequestsAndInvitesItemsWrapper = styled(Stack)`
  min-height: 300px;
`;

export const RequestsOrInvitesItemContainer = styled(Stack)`
  &:first-child [data-tooltip]:hover::after {
    top: 30px;
  }
`;

export const RequestsOrInvitesItemWrapper = styled(Stack)<{
  animationState: ResolvingAnimationState;
}>`
  min-height: 80px;
  ${(props) =>
    props.animationState === ResolvingAnimationState.FadeOut &&
    css`
      @keyframes fadeOut {
        from {
          opacity: 1;
        }
        to {
          opacity: 0;
        }
      }
      animation: fadeOut 0.25s ease;
    `}
`;

export const RequestsOrInvitesItemDetailWrapper = styled(Stack)`
  flex: 1;
  gap: 12px;
  justify-content: space-between;
  align-items: center;
`;

export const AvatarClickableWrapper = styled.span<{ isClickable: boolean }>`
  ${({ isClickable }) => (isClickable ? 'cursor: pointer;' : undefined)}
`;

export const TitleWrapper = styled(Stack)`
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
`;

export const TitleSpan = styled(TSpan).attrs({
  colorToken: '--text-tablecell-header-neutral-highlighted',
  font: 'body-m-bold',
})`
  display: flex;
  gap: 8px;
  cursor: pointer;
`;

export const IconButton = styled(Button)`
  max-height: unset;
  height: unset;
  &[data-tooltip]:hover::after {
    max-width: 359px;
    font-size: var(--font-body-medium-size);
    z-index: 10000;
    padding: 10px 16px;
    border-radius: 8px;
    left: 15px;
    top: -110px;
    text-align: left;
  }
`;

export const EmptyContainer = styled(Stack)`
  min-height: 20px;
  margin: auto;
`;
