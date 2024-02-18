import { type FC, useEffect, useCallback } from 'react';

import { downloadFile } from '@/utils/file';
import {
  ATTACHMENT_CLASS,
  ATTACHMENT_CONTAINER_CLASS,
  BLOCK_CONTAINER_CLASS,
  DOWNLOAD_CLASS,
  EDITOR_ELEMENT_ID,
  REMOVE_CLASS,
} from '../../constants';
import { type IListenerProps } from '../../types';

export const Listeners: FC<IListenerProps> = ({
  editEnabled,
  editorUUID,
  onEvent,
}) => {
  const uuid = `#${EDITOR_ELEMENT_ID}-${editorUUID}`;
  /**
   * On click remove button
   */

  const onRemoveEl = useCallback((ev: Event, el: Element) => {
    ev.preventDefault();
    ev.stopPropagation();
    el.closest(`.${BLOCK_CONTAINER_CLASS}`)?.parentElement?.remove();
  }, []);

  useEffect(() => {
    const removeBtns = editEnabled
      ? document.querySelectorAll(`${uuid} .${REMOVE_CLASS}`)
      : [];
    removeBtns.forEach((el) =>
      el.addEventListener('click', (ev: Event) => onRemoveEl(ev, el)),
    );

    return () => {
      removeBtns.forEach((el) =>
        el.removeEventListener('click', (ev: Event) => onRemoveEl(ev, el)),
      );
    };
  }, [editEnabled, onRemoveEl, uuid]);

  /**
   * On click attachment link
   */

  const onAttachmentClick = useCallback(
    (ev: Event, el: Element) => {
      ev.preventDefault();
      ev.stopPropagation();
      if (editEnabled) return;

      const linkEl = el.parentElement?.querySelector('a[href]');
      const href = linkEl?.getAttribute('href');

      if (!href) return;

      if (linkEl?.classList.contains(ATTACHMENT_CLASS)) {
        onEvent({ id: editorUUID, attachment: href });
      } else {
        onEvent({ id: editorUUID, link: href });
      }
    },
    [editEnabled, editorUUID, onEvent],
  );

  useEffect(() => {
    const attachmentChildren = document.querySelectorAll(
      `${uuid} .${ATTACHMENT_CONTAINER_CLASS} > div:not(.${REMOVE_CLASS})`,
    );

    attachmentChildren.forEach((el) => {
      el.addEventListener('click', (ev: Event) =>
        onAttachmentClick(ev, el as HTMLAnchorElement),
      );
    });

    return () => {
      attachmentChildren.forEach((el) =>
        el.removeEventListener('click', (ev: Event) =>
          onAttachmentClick(ev, el as HTMLAnchorElement),
        ),
      );
    };
  }, [onAttachmentClick, uuid]);

  /**
   * On click image
   */

  const onImgClick = useCallback(
    (ev: Event, el: Element) => {
      ev.stopPropagation();
      ev.preventDefault();
      onEvent({ id: editorUUID, image: el.getAttribute('src') });
    },
    [editorUUID, onEvent],
  );

  useEffect(() => {
    const imgEls = document.querySelectorAll(`${uuid} img`);

    imgEls.forEach((el) => {
      el.addEventListener('click', (ev: Event) => onImgClick(ev, el));
    });

    return () => {
      imgEls.forEach((el) => {
        el.removeEventListener('click', (ev: Event) => onImgClick(ev, el));
      });
    };
  }, [onImgClick, uuid]);

  /**
   * On click video
   */

  const onVideoClick = useCallback(
    (ev: Event, el: Element) => {
      ev.preventDefault();
      ev.stopPropagation();
      onEvent({
        id: editorUUID,
        video: el.querySelector('source')?.getAttribute('src'),
      });
    },
    [editorUUID, onEvent],
  );

  useEffect(() => {
    const videoEls = document.querySelectorAll(`${uuid} video`);

    videoEls.forEach((el) => {
      el.addEventListener('click', (ev: Event) => onVideoClick(ev, el));
    });

    return () => {
      videoEls.forEach((el) => {
        el.removeEventListener('click', (ev: Event) => onVideoClick(ev, el));
      });
    };
  }, [onVideoClick, uuid]);

  /**
   * On click download
   */

  const onDownload = useCallback((ev: Event, el: Element) => {
    ev.stopPropagation();
    ev.preventDefault();
    const attachmentEl = el.closest(`.${ATTACHMENT_CLASS}`);
    const url = attachmentEl?.getAttribute('href');
    if (url) {
      const fileParts = url.split('/');
      const fileName = fileParts[fileParts.length - 1];

      fetch(url, {
        headers: {
          'Content-Disposition': 'attachment',
        },
      })
        .then((response) => response.blob())
        .then((blob) => {
          downloadFile(blob, fileName);
        });
    }
  }, []);

  useEffect(() => {
    const downloadBtn = document.querySelectorAll(`${uuid} .${DOWNLOAD_CLASS}`);

    downloadBtn.forEach((el) => {
      el.addEventListener('click', (ev: Event) => onDownload(ev, el));
    });

    return () => {
      downloadBtn.forEach((el) => {
        el.removeEventListener('click', (ev: Event) => onDownload(ev, el));
      });
    };
  }, [onDownload, uuid]);

  return null;
};
