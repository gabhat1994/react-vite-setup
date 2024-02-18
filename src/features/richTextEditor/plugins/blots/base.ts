import Quill from 'quill';
import { t } from 'i18next';

import { bytesToSize } from '../../utils';
import {
  BLOCK_CONTAINER_CLASS,
  LOADER_CLASS,
  REMOVE_CLASS,
  FILE_NAME_CLASS,
  VIDEO_ICON,
  REMOVE_ICON,
} from '../../constants';
import { type IBlotData } from '../../types';

const BlockEmbed = Quill.import('blots/block/embed');

interface IProperties {
  dataUrl: string;
  file: File;
}

class BaseBlot extends BlockEmbed {
  static tagName: string = 'div';

  static blotName: string = '';

  static create(data: IBlotData) {
    const node: HTMLElement = super.create(data);
    const { properties, id } = data;

    const icon = data.properties?.file?.type.includes('video')
      ? `<div class="icon video_icon">${VIDEO_ICON}</div>`
      : '';
    if (this.blotName === 'image') {
      const url = URL.createObjectURL(properties.file);
      const img = new Image();
      img.onload = () => {
        node.innerHTML = this.getInnerHtml(properties, img, icon);
      };
      img.src = url;
    } else {
      node.innerHTML = this.getInnerHtml(properties, undefined, icon);
    }

    node.contentEditable = 'false';
    node.setAttribute('id', id?.toString());
    return node;
  }

  static getInnerHtml(
    properties: IProperties,
    image?: HTMLImageElement,
    icon?: string,
  ) {
    let fileName = properties.file.name || '';
    if (image) {
      if (fileName.length * 14 > image?.width) {
        fileName = `${fileName.slice(0, image.width / 14 - 3)}...`;
      }
    }
    return `<${
      this.tagName
    } class="${BLOCK_CONTAINER_CLASS} ${BLOCK_CONTAINER_CLASS}_loading ${
      this.blotName
    }_container ${
      image && image?.width > 700 && 'image_container_over_width'
    }"><div class="${LOADER_CLASS}"></div>${icon}<div class="${REMOVE_CLASS}">${REMOVE_ICON}</div><div class="${FILE_NAME_CLASS}">${fileName}<div class="file_details_container"><div class="size">${bytesToSize(
      properties && properties.file ? properties.file.size : 0,
    )}</div><div class="uploading">${t(
      'noumena.rich_text_editor.file.handler.uploading.label',
    )}</div></div></div></${this.tagName}>`;
  }
}

export default BaseBlot;
