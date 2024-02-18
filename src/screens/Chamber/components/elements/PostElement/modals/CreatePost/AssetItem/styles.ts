import styled from 'styled-components';
import { cssVar, rgba } from 'polished';
import { Button } from '@/components/Button';
import { footnoteTypography } from '@/components/Typography';

export const AssetItemContainer = styled.div`
  position: relative;
  width: fit-content;
  .video-js {
    width: 120px;
    height: 120px;
    border-radius: 8px;
    .vjs-big-play-button {
      display: none;
    }
  }
`;

export const DeleteButton = styled(Button)`
  min-height: unset;
  min-width: unset;
  width: 40px;
  height: 40px;
  padding: 8px;
  position: absolute;
  top: 8px;
  right: 8px;
`;

export const DurationItem = styled.div`
  background-color: ${rgba(
    cssVar('--bg-video-timestamp-brand-primary-default'),
    0.5,
  )};
  ${footnoteTypography.footnote}
  color: var(--text-video-timestamp-neutral-alt-default);
  padding: 6.5px 8px;
  position: absolute;
  bottom: 0;
  right: 0;
  border-top-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

export const RoundedCorners = styled.div<{ enabled?: boolean }>`
  display: inline;
  ${({ enabled }) =>
    enabled &&
    `
  display: inline-block;
  width: 124px;
  height: 124px;
  border-radius: 8px;
  overflow: hidden;
  `}
`;
