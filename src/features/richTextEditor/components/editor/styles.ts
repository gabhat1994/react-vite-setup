import styled, { css } from 'styled-components';

import {
  ATTACHMENT_CLASS,
  ATTACHMENT_CONTAINER_CLASS,
  BLOCK_CONTAINER_CLASS,
  IMAGE_CONTAINER_CLASS,
  VIDEO_CONTAINER_CLASS,
  DOWNLOAD_CLASS,
  LOADER_CLASS,
  REMOVE_CLASS,
  FILE_NAME_CLASS,
  SVG_ACTION_ICON_CLASS,
} from '../../constants';

export const EditorWrapper = styled.div<{ editEnabled: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;

  .${IMAGE_CONTAINER_CLASS} > .${FILE_NAME_CLASS} {
    grid-column: 1 / 3 !important;
    padding-left: 12px;
  }

  .${BLOCK_CONTAINER_CLASS} {
    width: 100%;
    height: auto;
    border: 1px solid var(--bg-separator-neutral-default);
    box-sizing: border-box;
    border-radius: 8px;
    font-size: var(--font-body-medium-size);
    overflow: hidden;
    display: grid;
    grid-template-columns: 64px 1fr auto;
    grid-auto-rows: 65px 1fr;

    ${({ editEnabled }) =>
      !editEnabled &&
      css`
        &.${ATTACHMENT_CONTAINER_CLASS} * {
          cursor: pointer;
        }
      `}
  }

  .${VIDEO_CONTAINER_CLASS}, .${IMAGE_CONTAINER_CLASS} {
    width: minmax(100%, max-content);
    & > .${LOADER_CLASS} {
      margin-top: 112px;
      margin-bottom: 112px;
      grid-column: 2;
      grid-row: 2;
    }
  }

  .${VIDEO_CONTAINER_CLASS} {
    width: 100%;
  }

  .image_container_over_width {
    width: 100%;
  }

  .${VIDEO_CONTAINER_CLASS}, .${IMAGE_CONTAINER_CLASS} {
    & > .error_icon {
      grid-column: 2;
      grid-row: 2;
    }
  }

  .${BLOCK_CONTAINER_CLASS} {
    & > img {
      width: 100%;
      left: 0;
      grid-column: 1 / 5;
      grid-row: 2;
    }

    & > video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: inline-block;
      border-radius: 8px;
      grid-column: 1 / 5;
      grid-row: 2;
    }
  }

  .icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    grid-column: 1/1;
    grid-row: 1/1;
    align-self: center;
    justify-self: center;

    &.attachment_icon {
      border-radius: 8px;
      border: 1px solid var(--bg-button-danger-secondary-default);

      * {
        color: var(--icon-button-danger-secondary-default) !important;
        fill: var(--icon-button-danger-secondary-default) !important;
      }
    }

    &.video_icon {
      border-radius: 8px;
      background-color: var(--bg-button-brand-primary-default);

      * {
        color: var(--icon-button-neutral-alt-default) !important;
        fill: var(--icon-button-neutral-alt-default) !important;
      }
    }
  }

  span.${ATTACHMENT_CLASS}, a.${ATTACHMENT_CLASS} {
    color: inherit;
    text-decoration: none !important;
    cursor: pointer;
  }

  .file_details_container {
    display: flex;
    gap: 10px;
  }

  .size {
    font-family: var(--font-footnote-regular-font);
    font-size: var(--font-footnote-regular-size);
    font-weight: var(--font-footnote-regular-weight);
    color: var(--text-card-neutral-default);
  }

  .${REMOVE_CLASS} {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    grid-column: 4;
    grid-row: 1;
    margin-top: 12px;
    margin-right: 12px;
    cursor: pointer;
  }

  .${DOWNLOAD_CLASS} {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 12px;
    & > svg * {
      color: var(--button-card-neutral-default);
      fill: var(--button-card-neutral-default);
    }
  }

  &.rte-view-mode {
    .${REMOVE_CLASS} {
      display: none;
      pointer-events: none;
    }
    .${IMAGE_CONTAINER_CLASS} {
      display: flex;
      .${FILE_NAME_CLASS} {
        display: none;
        pointer-events: none;
      }
    }

    .${VIDEO_CONTAINER_CLASS} {
      display: unset;
      .${FILE_NAME_CLASS}, .icon {
        display: none;
        pointer-events: none;
      }
    }
  }

  .${FILE_NAME_CLASS} {
    font-family: var(--font-body-medium-regular-font);
    font-size: var(--font-body-medium-regular-size);
    font-weight: var(--font-body-medium-regular-weight);
    color: var(--text-card-header-neutral-highlighted);
    padding-top: 12px;
    grid-row: 1;
    grid-column: 2;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: left;
  }

  .${LOADER_CLASS} {
    width: 24px;
    height: 24px;
    border: 3px solid var(--bg-button-brand-secondary-default);
    border-bottom-color: var(--icon-card-brand-primary-default);
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    align-self: center;
    justify-self: center;
  }

  .error {
    color: var(--text-card-danger-primary-default);
    font-size: 12px;
  }

  .uploading {
    font-family: var(--font-footnote-regular-font);
    font-size: var(--font-footnote-regular-size);
    font-weight: var(--font-footnote-regular-weight);
    color: var(--icon-card-brand-primary-default);
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .${VIDEO_CONTAINER_CLASS} {
    &.block_container_loading,
    &.block_container_error {
      .video_icon {
        background-color: var(--bg-button-brand-primary-disabled);

        * {
          color: var(--icon-button-neutral-disabled) !important;
          fill: var(--icon-button-neutral-disabled) !important;
        }
      }
    }
  }

  .error_icon {
    color: var(--text-card-danger-primary-default) !important;
    fill: var(--text-card-danger-primary-default) !important;
    * {
      color: var(--text-card-danger-primary-default) !important;
      fill: var(--text-card-danger-primary-default) !important;
    }
  }
`;

export const RTEArea = styled.div<{
  minHeight: string | undefined;
  editEnabled: boolean | undefined;
  contentPadding: number;
}>`
  ${({ editEnabled }) =>
    editEnabled && 'border-bottom-left-radius: 16px !important;'};
  ${({ editEnabled }) =>
    editEnabled && 'border-bottom-right-radius: 16px !important'};

  .ql-editor {
    min-height: ${({ minHeight }) =>
      minHeight && minHeight.includes('px')
        ? `${parseInt(minHeight, 10) - 112}px !important`
        : 'unset !important'};
    ${({ contentPadding }) =>
      css`
        padding: ${contentPadding}px;
      `}

    & > div.ql-align-center {
      display: flex;
      flex-direction: row;
      justify-content: center;
    }

    & > div.ql-align-right {
      display: flex;
      flex-direction: row;
      justify-content: end;
    }

    h1 {
      font-size: var(--font-header-medium-size) !important;
      line-height: var(--font-header-medium-lineheight) !important;
      font-family: var(--font-header-medium-bold-font) !important;
      font-weight: var(--font-header-medium-bold-weight) !important;
    }

    h2 {
      font-size: var(--font-header-xsmall-size) !important;
      line-height: var(--font-header-xsmall-lineheight) !important;
      font-family: var(--font-header-xsmall-bold-font) !important;
      font-weight: var(--font-header-xsmall-bold-weight) !important;
    }

    p {
      font-family: var(--font-body-medium-regular-font) !important;
      font-size: var(--font-body-medium-size) !important;
      font-weight: var(--font-body-medium-regular-weight) !important;
      line-height: var(--font-body-medium-lineheight) !important;
    }

    strong {
      font-family: var(--font-body-medium-bold-font) !important;
      font-weight: var(--font-body-medium-bold-weight) !important;
    }

    a {
      font-family: var(--font-body-medium-regular-font) !important;
      color: var(--link-appbar-brand-primary-default) !important;
    }

    img {
      width: 100%;
    }

    .${SVG_ACTION_ICON_CLASS} {
      color: var(--button-card-neutral-default) !important;
      fill: var(--button-card-neutral-default) !important;
      * {
        color: var(--button-card-neutral-default) !important;
        fill: var(--button-card-neutral-default) !important;
      }
    }

    &.ql-blank::before {
      font-style: normal !important;
      left: 24px !important;
      font-size: var(--font-input-medium-size) !important;
      line-height: var(--font-input-medium-lineheight) !important;
      font-weight: var(--font-input-medium-regular-weight) !important;
      font-family: var(--font-body-large-regular-font) !important;
      color: var(--text-input-neutral-default) !important;
    }

    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-track {
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--bg-scrollbar-default);
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: var(--bg-scrollbar-default);
    }
  }

  .ql-tooltip {
    border: 1px solid var(--border-card-neutral-highlighted) !important;
    background-color: var(--bg-card-neutral-alt-default) !important;
    box-shadow: 0 0 5px var(--border-card-neutral-highlighted) !important;
    color: var(--text-input-neutral-filled) !important;
    left: ${({ editEnabled }) =>
      editEnabled ? '16px !important' : '0 !important'};

    a {
      font-family: var(--font-body-medium-regular-font) !important;
      color: var(--link-appbar-brand-primary-default) !important;
    }

    input[type='text'] {
      border: 1px solid var(--border-card-neutral-highlighted) !important;
      outline: none !important;
      background-color: var(--bg-card-neutral-alt-default) !important;

      &:focus {
        border: 1.5px solid var(--link-appbar-brand-primary-default) !important;
      }
    }
  }

  &.ql-disabled {
    .ql-tooltip {
      display: none !important;
      height: 0px !important;
      width: 0px !important;
    }

    .ql-clipboard {
      display: none !important;
      height: 0px !important;
      width: 0px !important;
    }
  }

  &.ql-blank::before {
    font-style: normal !important;
    left: 24px !important;
    font-size: var(--font-input-medium-size) !important;
    line-height: var(--font-input-medium-lineheight) !important;
    font-weight: var(--font-input-medium-regular-weight) !important;
    font-family: var(--font-body-medium-regular-font) !important;
    color: var(--text-input-neutral-default) !important;
  }
`;

export const ToolbarContainer = styled.div<{
  visible: boolean;
  editEnabled: boolean;
}>`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  ${({ editEnabled }) =>
    editEnabled && 'border-top-left-radius: 16px !important'};
  ${({ editEnabled }) =>
    editEnabled && 'border-top-right-radius: 16px !important'};
  height: 90px !important;
  min-height: 90px !important;
  width: 100% !important;
  border: 1px solid var(--border-card-neutral-highlighted) !important;
  background: var(--bg-card-neutral-alt-default);

  .ql-stroke {
    stroke: var(--icon-wysiwyg-default) !important;
  }

  .ql-fill {
    fill: var(--icon-wysiwyg-default) !important;
  }

  .ql-picker {
    color: var(--icon-wysiwyg-default) !important;
  }
`;

export const FormatTools = styled.div`
  margin-right: 0px !important;
  flex: 1 !important;
  display: flex !important;
  align-items: center !important;
  gap: 8px;

  &:first-child {
    width: 100% !important;
    button {
      margin-bottom: 6px !important;
    }
  }

  &:last-child {
    flex: unset !important;
    margin-right: 0px !important;
  }

  &:not(:first-child) button {
    margin-top: 6px !important;
  }
`;

export const Spacer = styled.div`
  flex: 1;
`;

export const AttachmentTools = styled.div`
  display: flex !important;
  align-items: center !important;
  gap: 8px;
`;
