import { type RangeStatic } from 'quill';
import type Quill from 'quill';

import { removeSpecialCharacters } from '@/features/upload/utils/generateFileName';
import { nanoid, onTextChange } from '../../utils';
import { BLOCK_CONTAINER_CLASS, EDITOR_ELEMENT_ID } from '../../constants';
import { type IQuillOptions } from '../../types';

export class BaseHandler {
  static DEFAULTS: Omit<IQuillOptions, 'render'>;

  quill: Quill;

  options: IQuillOptions;

  range: RangeStatic | null;

  handler: 'attachment' | 'image' | 'video';

  toolbarClass: string = '';

  toolbarHtml: string = '';

  fileHolder: HTMLInputElement | undefined;

  fileType: string = '';

  uuid: string = new Date().getTime().toString();

  onTextChange = onTextChange;

  constructor(quill: Quill, options: IQuillOptions) {
    this.quill = quill;
    this.options = options;
    this.range = null;
    this.handler = 'attachment';

    this.uuid = `#${EDITOR_ELEMENT_ID}-${this.options.editorUUID}`;

    this.errorAttachment = this.errorAttachment.bind(this);
    this.uploadToAWS = this.uploadToAWS.bind(this);
  }

  applyForToolbar() {
    const toolbar = this.quill.getModule('toolbar');
    toolbar.addHandler(this.handler, this.selectLocalImage.bind(this));
    const elements = document.querySelectorAll(
      `${this.uuid} .${this.toolbarClass}`,
    );

    const element = elements[0];
    if (element) {
      element.innerHTML = this.toolbarHtml;
    }
  }

  fileChanged() {
    const file = this.fileHolder?.files?.[0];
    const attachmentId = new Date().getTime();
    const fileReader = new FileReader();
    const types = this.fileType.split(',');

    if (!file) return;

    // if (file && file.size > 10000000) {
    //   this.errorAttachment(attachmentId, 'filetoobig', file?.name);
    //   return;
    // }

    if (file && !types.includes(file.type)) {
      this.errorAttachment(attachmentId, 'wrong.fileformat');
      return;
    }

    fileReader.addEventListener(
      'load',
      () => {
        this.insertAttachment({
          dataUrl: fileReader.result,
          file,
          id: attachmentId,
        });
      },
      false,
    );

    fileReader.readAsDataURL(file);

    this.uploadFile(file)
      .then((url) => {
        this.updateAttachment(attachmentId, url);
      })
      .catch(() => {
        this.errorAttachment(attachmentId, 'uploading');
      });
  }

  async uploadFile(file: File) {
    const fileName = removeSpecialCharacters(
      `${this.options.userId}/${nanoid()}/${file.name}`,
    );
    const uploadLink = await this.options.onGenerateS3SignedUrl({
      mime: file.type,
      fileName,
    });
    const fileUrl = await this.uploadToAWS(file, uploadLink, fileName);
    return fileUrl;
  }

  async uploadToAWS(file: File, url: string, fileName: string) {
    const requestOptions = {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
        'Content-Length': file.size.toString(),
        'x-amz-acl': 'public-read',
      },
    };

    await fetch(url, requestOptions);

    return `https://${this.options.awsS3}.s3-accelerate.amazonaws.com/${fileName}`;
  }

  insertAttachment({
    dataUrl,
    file,
    id,
  }: {
    dataUrl: string | ArrayBuffer | null;
    file: File | undefined;
    id: number;
  }) {
    this.quill.insertEmbed(this.range?.index || 0, this.handler || '', {
      id,
      properties: { dataUrl, file },
      render: this.options.render,
    });
  }

  updateAttachment(id: number, url: string) {
    const element = document.getElementById(`${id}`);
    document
      .querySelectorAll(`${this.uuid} .${BLOCK_CONTAINER_CLASS}_loading`)
      .forEach((el) => {
        el.classList.remove(`${BLOCK_CONTAINER_CLASS}_loading`);
      });

    document.querySelectorAll(`${this.uuid} .uploading`).forEach((el) => {
      el.remove();
    });

    this.options.render?.(url, element);
    this.onTextChange({
      editorUUID: this.options.editorUUID,
      editor: this.quill,
      onEvent: this.options.onEvent,
    });
  }

  errorAttachment(id: number, message = 'Upload failed', fileName = '') {
    this.onTextChange({
      editorUUID: this.options.editorUUID,
      editor: this.quill,
      source: 'attachment',
      errorMessage: message,
      fileName,
      onEvent: this.options.onEvent,
    });
  }

  selectLocalImage() {
    this.range = this.quill.getSelection();
    this.fileHolder = document.createElement('input');
    this.fileHolder.setAttribute('type', 'file');
    this.fileHolder.setAttribute('accept', this.fileType);
    this.fileHolder.setAttribute('style', 'visibility:hidden');
    this.fileHolder.onchange = this.fileChanged.bind(this);
    this.fileHolder.click();
  }
}
