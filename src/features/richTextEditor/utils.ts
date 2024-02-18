import type Quill from 'quill';
import xss from 'xss';
import DOMPurify from 'dompurify';

import { type QuillEventRes } from './types';
import { EDITOR_ELEMENT_ID, xssOptions, domPurifyOptions } from './constants';

export const nanoid = (t = 21): string => {
  const randomArr = crypto.getRandomValues(new Uint8Array(t));

  return randomArr.reduce(
    // eslint-disable-next-line no-return-assign
    (a, e) =>
      `${a}${
        // eslint-disable-next-line no-bitwise, no-cond-assign, no-param-reassign
        (e &= 63) < 36
          ? e.toString(36)
          : e < 62
          ? (e - 26).toString(36).toUpperCase()
          : e < 63
          ? '_'
          : '-'
      }`,
    '',
  );
};

export const bytesToSize = (bytes: number): string => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  const i = parseInt(`${Math.floor(Math.log(bytes) / Math.log(1024))}`, 10);
  return `${Math.round((100 * bytes) / 1024 ** i) / 100} ${sizes[i]}`;
};

const getAbsoluteHeight = (el: HTMLElement | null) => {
  if (!el) return 0;
  const styles = window.getComputedStyle(el);
  const margin = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);

  return Math.ceil(el.getBoundingClientRect().height + margin);
};

export const onTextChange = ({
  editorUUID,
  editor,
  source,
  errorMessage,
  fileName,
  onEvent,
}: {
  editorUUID: string;
  editor?: Quill;
  source?: string;
  errorMessage?: string;
  fileName?: string;
  onEvent?: (d: QuillEventRes) => void;
}) => {
  if (onEvent) {
    const delta = editor?.getContents();

    const res =
      source === 'attachment' && errorMessage
        ? {
            id: editorUUID,
            attachment: '',
            error: errorMessage,
            fileName,
          }
        : {
            id: editorUUID,
            textChange: {
              isChanged: true,
              text: editor?.getText() || '',
              isEmpty: (editor?.root?.textContent || '').length < 2,
              value: editor?.root?.innerHTML,
              delta,
              source,
              height: getAbsoluteHeight(
                document.getElementById(`${EDITOR_ELEMENT_ID}-${editorUUID}`),
              ),
            },
          };
    onEvent(res);
  }
};

export const cleanContentFromXSS = (value: string) => {
  if (typeof value === 'string') {
    return xss(DOMPurify.sanitize(value, domPurifyOptions), xssOptions);
  }
  return '';
};
