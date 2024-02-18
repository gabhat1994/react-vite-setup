import type Quill from 'quill';

import { BaseHandler } from './base';
import {
  BLOCK_CONTAINER_CLASS,
  EDITOR_ID,
  LOADER_CLASS,
  VIDEO_ICON,
} from '../../constants';
import { type IQuillOptions } from '../../types';

export class VideoHandler extends BaseHandler {
  constructor(quill: Quill, options: IQuillOptions) {
    super(quill, options);
    this.fileType = 'video/webm,video/mp4,video/x-msvideo,video/quicktime';
    this.handler = 'video';
    this.toolbarClass = 'ql-video';
    this.toolbarHtml = VIDEO_ICON;

    this.applyForToolbar();
  }
}

export const renderVideoHandler = (
  url: string,
  node: Element,
  editorUUID: string,
): Element => {
  node
    .querySelectorAll(`#${EDITOR_ID}-${editorUUID} .${LOADER_CLASS}`)
    .forEach((el) => el.remove());

  const videoIcon = document.createElement('div');
  videoIcon.setAttribute('class', 'icon video_icon');
  videoIcon.innerHTML = VIDEO_ICON;

  const videoEl = document.createElement('video');
  videoEl.setAttribute('name', 'media');
  videoEl.innerHTML = `<source src="${url}#t=0.1" />`;

  node
    .querySelectorAll(`#${EDITOR_ID}-${editorUUID} .${BLOCK_CONTAINER_CLASS}`)
    .forEach((el) => {
      el.prepend(videoEl);
      el.prepend(videoIcon);
    });

  return node;
};
