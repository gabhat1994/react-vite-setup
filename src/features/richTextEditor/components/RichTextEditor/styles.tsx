import styled from 'styled-components';

import { sizes } from '@/constants/devices';
import { bodyTypography } from '@/components/Typography';

import { EDITOR_ELEMENT_ID, EDITOR_ID } from '../../constants';

export const Container = styled.div<{
  width: string | undefined;
  height: string | undefined;
  minHeight: string | undefined;
  editEnabled: boolean | undefined;
}>`
  position: relative;
  width: ${({ width }) => width ?? '100%'};
  height: ${({ height }) => height ?? '50px'};
  min-height: ${({ height }) =>
    height ? Math.min(parseInt(height, 10), 145) : 145}px;

  * {
    font-family: var(--font-body-medium-regular-font) !important;
    color: var(--text-input-neutral-filled);
    fill: var(--text-input-neutral-filled);
  }

  [id^=${EDITOR_ID}] {
    height: ${({ editEnabled }) => (editEnabled ? '300px' : '100%')};
    .ql-editor {
      height: 100%;
      overflow-y: auto;
    }
  }

  &.rte-modal {
    height: 100%;
    margin: 0;

    [id^=${EDITOR_ELEMENT_ID}] {
      width: 100%;
      flex-direction: column;
      height: 100%;
      display: flex;

      [id^=${EDITOR_ID}] {
        padding: 0 8px;
        height: 100%;

        & > .ql-editor {
          padding: 16px 8px;
        }
      }
    }
  }

  .ql-snow,
  .ql-bubble {
    &.ql-container {
      border: 1px solid var(--border-card-neutral-highlighted);
    }
  }

  .ql-bubble {
    &.ql-container {
      border: none !important;
    }
  }

  span.collapsedContent {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;

    &:first-line {
      color: var(--text-card-danger-primary-default);
    }

    * {
      color: var(--text-card-header-neutral-highlighted);
      margin: 0;
      float: left;
      font-family: var(--font-body-small-regular-font);
      font-size: var(--font-body-small-size);
      line-height: var(--font-body-small-lineheight);
      display: contents;

      &:first-child {
        width: fit-content;
      }
    }

    span {
      float: initial;
      font-weight: var(--font-body-small-regular-weight);

      &:first-line {
        width: 100%;
        color: var(--text-card-danger-primary-default);
      }
    }
  }

  * .ql-bubble.ql-toolbar button:hover,
  * .ql-bubble .ql-toolbar button:hover,
  * .ql-bubble.ql-toolbar button:focus,
  * .ql-bubble .ql-toolbar button:focus,
  * .ql-bubble.ql-toolbar button.ql-active,
  * .ql-bubble .ql-toolbar button.ql-active,
  * .ql-bubble.ql-toolbar .ql-picker-label:hover,
  * .ql-bubble .ql-toolbar .ql-picker-label:hover,
  * .ql-bubble.ql-toolbar .ql-picker-label.ql-active,
  * .ql-bubble .ql-toolbar .ql-picker-label.ql-active,
  * .ql-bubble.ql-toolbar .ql-picker-item:hover,
  * .ql-bubble .ql-toolbar .ql-picker-item:hover,
  * .ql-bubble.ql-toolbar .ql-picker-item.ql-selected,
  * .ql-bubble .ql-toolbar .ql-picker-item.ql-selected {
    color: var(--text-card-brand-primary-default) !important;
  }
  * .ql-bubble.ql-toolbar button:hover .ql-stroke,
  * .ql-bubble .ql-toolbar button:hover .ql-stroke,
  * .ql-bubble.ql-toolbar button:focus .ql-stroke,
  * .ql-bubble .ql-toolbar button:focus .ql-stroke,
  * .ql-bubble.ql-toolbar button.ql-active .ql-stroke,
  * .ql-bubble .ql-toolbar button.ql-active .ql-stroke,
  * .ql-bubble.ql-toolbar .ql-picker-label:hover .ql-stroke,
  * .ql-bubble .ql-toolbar .ql-picker-label:hover .ql-stroke,
  * .ql-bubble.ql-toolbar .ql-picker-label.ql-active .ql-stroke,
  * .ql-bubble .ql-toolbar .ql-picker-label.ql-active .ql-stroke,
  * .ql-bubble.ql-toolbar .ql-picker-item:hover .ql-stroke,
  * .ql-bubble .ql-toolbar .ql-picker-item:hover .ql-stroke,
  * .ql-bubble.ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
  * .ql-bubble .ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
  * .ql-bubble.ql-toolbar button:hover .ql-stroke-miter,
  * .ql-bubble .ql-toolbar button:hover .ql-stroke-miter,
  * .ql-bubble.ql-toolbar button:focus .ql-stroke-miter,
  * .ql-bubble .ql-toolbar button:focus .ql-stroke-miter,
  * .ql-bubble.ql-toolbar button.ql-active .ql-stroke-miter,
  * .ql-bubble .ql-toolbar button.ql-active .ql-stroke-miter,
  * .ql-bubble.ql-toolbar .ql-picker-label:hover .ql-stroke-miter,
  * .ql-bubble .ql-toolbar .ql-picker-label:hover .ql-stroke-miter,
  * .ql-bubble.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
  * .ql-bubble .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
  * .ql-bubble.ql-toolbar .ql-picker-item:hover .ql-stroke-miter,
  * .ql-bubble .ql-toolbar .ql-picker-item:hover .ql-stroke-miter,
  * .ql-bubble.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter,
  * .ql-bubble .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter {
    stroke: var(--bg-button-brand-secondary-default) !important;
  }
`;

export const RichTextEditorView = styled.div<{
  clickable?: boolean;
  fullWidth?: boolean;
}>`
  max-width: 700px;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'calc(100% - 32px)')};
  padding: 16px;
  ${bodyTypography.bodyMedium};
  ${({ clickable }) =>
    clickable &&
    `
      &:hover * {
        cursor: pointer;
      }
  `}

  &.no-padding {
    padding: 0;
    img {
      margin: 0;
    }
  }

  img {
    width: 100%;
    border-radius: 12px;
  }

  p {
    margin: 0;
  }

  @media (max-width: ${sizes.LAPTOP}) {
    max-width: 100%;
  }
`;
