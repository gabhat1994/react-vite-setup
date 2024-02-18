import { flexColumn, flexRow } from '@/common/globalStyles';
import { Tag } from '@/components';
import { TSpan } from '@/components/Typography';
import { Stack } from '@/layout';
import styled from 'styled-components';

export const Container = styled(Stack)<{ withMarginTop?: boolean }>`
  width: 100%;
  gap: 16px;
  flex-direction: column;
  border-radius: 16px;
  padding-top: ${({ withMarginTop }) => (withMarginTop ? '16px' : '0')};
`;

export const ItemHead = styled(Stack)`
  width: 100%;
  gap: 12px;
  padding: 0;
  box-sizing: border-box;
`;

export const AvatarContainer = styled.div``;

export const PostDetailsWrapper = styled.div`
  ${flexRow};
  gap: 6.5px;
  align-items: center;
`;

export const NameWrap = styled.div`
  ${flexColumn};
  align-items: flex-start;
  flex: 1;
`;
export const TimeWrap = styled(Stack)`
  gap: 8px;
  align-items: center;
`;

export const ShowMore = styled(TSpan)`
  text-decoration: none;
  cursor: pointer;
`;

export const ItemImageWrap = styled.div`
  max-width: 100%;
  width: 100%;

  ${flexColumn}
  .video-js {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    max-height: 296px;

    .vjs-big-play-button {
      margin-left: -1em;
      margin-top: -1rem;
      width: 56px;
      height: 56px;
      background-color: var(--bg-button-brand-primary-default);
      border-color: var(--border-button-brand-primary-default);
      border-radius: 8px;
      .vjs-icon-placeholder:before {
        top: 4px;
      }
    }
  }
`;
export const Image = styled.img<{
  fullHeight?: boolean;
}>`
  cursor: pointer;
  object-fit: contain;
  width: 100%;
  max-height: 260px;
  object-position: 0 0;
  border-radius: 4px;
`;
export const ItemReaction = styled(Stack)`
  gap: 8px;
  width: 100%;
  justify-content: flex-start;
  padding: 0;
`;

export const ItemFooter = styled(Stack)<{}>`
  width: 100%;
  border-color: var(--bg-separator-neutral-default);
  gap: 4px;
  justify-content: space-between;
`;

export const ButtonWrap = styled(Stack)<{ disable?: boolean }>`
  cursor: ${({ disable }) => (disable === true ? 'not-allowed' : 'pointer')};
  align-items: center;
  span {
    line-height: 100%;
  }
  ${({ disable }) => disable && 'pointer-events: none;'}
`;

export const RecentTitle = styled.div`
  position: absolute;
  top: -11px;
  flex: 1;
  background: var(--bg-card-neutral-alt-default);
`;

export const TextWrapper = styled.div<{
  collapsible: boolean;
  fullHeight?: boolean;
}>`
  width: 100%;
  white-space: break-spaces;
  max-height: ${({ collapsible, fullHeight }) =>
    collapsible ? 'auto' : fullHeight ? 'auto' : '500px'};
  overflow: ${({ collapsible }) => (collapsible ? 'hidden' : 'auto')};
  padding: 0;
  box-sizing: border-box;
`;

export const BorderedWrapper = styled(Stack)<{
  isPinned: boolean;
  withBorder?: boolean;
}>`
  padding: 16px;
  width: 100%;
  flex-direction: column;
  background: var(--bg-card-neutral-alt-default);
  border-radius: 16px;
  border: ${({ isPinned, withBorder }) =>
    isPinned && withBorder
      ? '1px solid var(--border-card-brand-primary-default)'
      : withBorder
      ? '1px solid var(--border-card-neutral-highlighted)'
      : ''};
`;

// Temporary solution as Community page implements the old designs
export const StyledTag = styled(Tag)`
  height: 22px;
  min-height: 22px;
`;
