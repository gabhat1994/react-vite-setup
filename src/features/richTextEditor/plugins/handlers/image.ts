import type Quill from 'quill';

import {
  BLOCK_CONTAINER_CLASS,
  IMAGE_CONTAINER_CLASS,
  EDITOR_ID,
  LOADER_CLASS,
  IMAGE_ICON,
} from '../../constants';
import { type IQuillOptions } from '../../types';
import { BaseHandler } from './base';

export class ImageHandler extends BaseHandler {
  constructor(quill: Quill, options: IQuillOptions) {
    super(quill, options);

    this.fileType = 'image/jpeg,image/png,image/webp';
    this.handler = 'image';
    this.toolbarClass = 'ql-image';
    this.toolbarHtml = IMAGE_ICON;

    this.applyForToolbar();
  }
}

export const renderImageHandler = (
  url: string,
  node: Element,
  editorUUID: string,
): Element => {
  node
    .querySelectorAll(`#${EDITOR_ID}-${editorUUID} .${LOADER_CLASS}`)
    .forEach((el) => el.remove());

  const imgEl = document.createElement('img');
  imgEl.src = url;

  node
    .querySelectorAll(`#${EDITOR_ID}-${editorUUID} .${BLOCK_CONTAINER_CLASS}`)
    .forEach((el) => {
      el.classList.add(IMAGE_CONTAINER_CLASS);
      el.prepend(imgEl);
    });

  return node;
};
