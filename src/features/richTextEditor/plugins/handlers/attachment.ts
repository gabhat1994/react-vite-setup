import type Quill from 'quill';

import {
  ATTACHMENT_CLASS,
  BLOCK_CONTAINER_CLASS,
  DOWNLOAD_CLASS,
  EDITOR_ID,
  LOADER_CLASS,
  ATTACHMENT_ICON,
  DOWNLOAD_ICON,
} from '../../constants';
import { type IQuillOptions } from '../../types';
import { BaseHandler } from './base';

export class AttachmentHandler extends BaseHandler {
  constructor(quill: Quill, options: IQuillOptions) {
    super(quill, options);
    this.handler = 'attachment';
    this.fileType = 'application/pdf,application/msword';
    this.toolbarClass = 'ql-attachment';
    this.toolbarHtml = ATTACHMENT_ICON;

    this.applyForToolbar();
  }
}

export const renderAttachmentHandler = (
  url: string,
  node: Element,
  editorUUID: string,
): Element => {
  node
    .querySelectorAll(`#${EDITOR_ID}-${editorUUID} .${LOADER_CLASS}`)
    .forEach((el) => {
      el.classList.remove(LOADER_CLASS);
      el.classList.add('icon');
      el.classList.add('attachment_icon');
      // eslint-disable-next-line no-param-reassign
      el.innerHTML = ATTACHMENT_ICON;
    });

  const downloadBtn = document.createElement('a');
  downloadBtn.setAttribute('class', ATTACHMENT_CLASS);
  downloadBtn.setAttribute('href', url);
  downloadBtn.innerHTML = `<div class="${DOWNLOAD_CLASS}">${DOWNLOAD_ICON}</div>`;

  node
    .querySelectorAll(`#${EDITOR_ID}-${editorUUID} .${BLOCK_CONTAINER_CLASS}`)
    .forEach((el) => {
      el.appendChild(downloadBtn);
    });

  return node;
};
