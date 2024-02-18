import {
  type ChangeEvent,
  createRef,
  type DragEvent,
  useCallback,
  useState,
  useEffect,
  useContext,
  type ClipboardEvent,
  type RefObject,
} from 'react';

import { useTranslation } from 'react-i18next';
import { getFileNameFromUrl, isValidFileSize } from '@/utils/file';
import { useError, useToast } from '@/hooks';
import { DisablePublishOrDraftContext } from '@/providers';
import { isCorrectFileType } from '../../utils/isCorrectFileType';

import { useUpload } from '../../hooks/useUpload';
import { isHTMLNode } from '../../utils/isHTMLNode';
import isUploadError from '../../utils/isUploadError';
import {
  type UploadMediaType,
  type UploadChildrenProps,
  type UploadMeta,
} from '../../types';
import { FileInput } from './styles';

type UploadProps<TargetRef extends HTMLElement> = {
  children: (props: UploadChildrenProps<TargetRef>) => JSX.Element;
  url?: string;
  acceptedFileTypes?: string;
  maxSize?: number;
  keepOriginalName?: boolean;
  uploadToS3?: boolean;
  onContentChange?: (next: string, ChangeMeta?: UploadMeta) => void;
  onUploadFile?: (file: File) => void;
  generateThumbnail?: boolean;
  allTypesSupported?: boolean;

  /** Clipboard element for file paste */
  clipboard?: RefObject<HTMLElement>;
  type: UploadMediaType;
};

export function Upload<TargetRef extends HTMLElement>({
  children,
  url: defaultUrl,
  acceptedFileTypes,
  uploadToS3 = true,
  onContentChange,
  onUploadFile,
  maxSize,
  generateThumbnail,
  clipboard,
  keepOriginalName,
  allTypesSupported,
  type,
}: UploadProps<TargetRef>): JSX.Element {
  const { addToast } = useToast();
  const { logError } = useError();
  const { t } = useTranslation();
  const triggerElRef = createRef<TargetRef>();
  const fileInputRef = createRef<HTMLInputElement>();
  const [file, setFile] = useState<File | null>();
  const [isDraggingOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const [isUploadStarted, setIsUploadStarted] = useState<boolean>(!!defaultUrl);
  const [isUploadComplete, setIsUploadComplete] = useState<boolean>(
    !!defaultUrl,
  );

  const { setDisableUpdate } = useContext(DisablePublishOrDraftContext);

  useEffect(() => {
    setDisableUpdate(isUploadStarted && !isUploadComplete);
  }, [setDisableUpdate, isUploadStarted, isUploadComplete]);

  const [uploadPercentage, setUploadPercentage] = useState<number>(
    defaultUrl ? 100 : 0,
  );
  const [url, setUrl] = useState<string | undefined>(defaultUrl);

  const [upload, fileServices] = useUpload({
    maxSize,
    setUploadPercentage,
    generateThumbnail,
    keepOriginalName,
    type,
  });

  const cleanFileInput = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [fileInputRef]);

  const handleUpload = useCallback(
    async (mFile: File) => {
      setIsUploadStarted(true);
      const [fileType] = mFile.type.split('/');

      try {
        const { downloadableLink, signedUrlDomain, meta } = await upload(mFile);
        cleanFileInput();
        setIsUploadComplete(true);
        setUrl(signedUrlDomain);
        onContentChange?.(downloadableLink, meta);
      } catch (e: unknown) {
        if (isUploadError(e) && !e.errorExtraParams?.canceled) {
          if (e.errorExtraParams?.isLargeFile) {
            logError(e, 'uploadFile', false);
            addToast(
              'error',
              'icon',
              t('noumena.upload.file_too_big', {
                fileType: fileType || 'file',
                maxSize,
              }),
            );
            setIsUploadStarted(false);
          }

          setError(true);
        }

        cleanFileInput();
      }
    },
    [addToast, cleanFileInput, logError, maxSize, onContentChange, t, upload],
  );

  const handleFile = useCallback(
    async (files: FileList | null, callback: () => void) => {
      if (files && isCorrectFileType(files, acceptedFileTypes)) {
        if (files.length > 0) {
          const [fileType] = files[0].type.split('/');
          if (!isValidFileSize(files[0].size, maxSize)) {
            addToast(
              'error',
              'icon',
              t('noumena.upload.file_too_big', {
                fileType: fileType || 'file',
                maxSize,
              }),
            );
            callback();
            return;
          }

          setFile(files[0]);
          onUploadFile?.(files[0]);

          if (uploadToS3) {
            try {
              await handleUpload(files[0]);
            } catch (e) {
              logError(e, 'uploadFile', true);
            }
          } else {
            setIsUploadStarted(false);
          }
          callback();
        }
      } else if (files && !isCorrectFileType(files, acceptedFileTypes)) {
        addToast('error', 'icon', t('noumena.upload.invalid_file_type'));
      }
    },
    [
      acceptedFileTypes,
      maxSize,
      onUploadFile,
      uploadToS3,
      addToast,
      t,
      handleUpload,
      logError,
    ],
  );

  const onChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      handleFile(e.target.files, () => {
        e.target.value = '';
      });
    },
    [handleFile],
  );

  const onPasteHandler = useCallback(
    (e: Event | ClipboardEvent<HTMLElement>) => {
      if ('clipboardData' in e && e.clipboardData.files?.length) {
        e.preventDefault();
        e.stopPropagation();
        setError(false);
        setIsUploadStarted(false);
        setIsUploadComplete(false);
        handleFile(e.clipboardData.files, () => {
          e.clipboardData.clearData();
        });
      }
    },
    [handleFile],
  );

  const onTryAgainHandler = useCallback(() => {
    if (!file) return;

    handleUpload(file);
  }, [file, handleUpload]);

  const onDropHandler = useCallback(
    (e: Event | DragEvent<TargetRef>) => {
      e.preventDefault();
      e.stopPropagation();

      setIsDragOver(false);
      setError(false);
      if (
        'dataTransfer' in e &&
        isCorrectFileType(e.dataTransfer.files, acceptedFileTypes)
      ) {
        const { files } = e.dataTransfer;
        if (files && files.length > 0) {
          setFile(files[0]);
          onUploadFile?.(files[0]);
          if (uploadToS3) {
            handleUpload(files[0]);
          }
        }
      } else if (
        'dataTransfer' in e &&
        !isCorrectFileType(e.dataTransfer.files, acceptedFileTypes)
      ) {
        addToast('error', 'icon', t('noumena.upload.invalid_file_type'));
      }
    },
    [acceptedFileTypes, onUploadFile, uploadToS3, handleUpload, addToast, t],
  );

  const onDragEnterHandler = useCallback(
    (e: MouseEvent | DragEvent<TargetRef>) => {
      e.preventDefault();
      e.stopPropagation();
      const rect = triggerElRef.current?.getBoundingClientRect();
      if (
        'dataTransfer' in e &&
        !isCorrectFileType(e.dataTransfer.items, acceptedFileTypes)
      ) {
        return;
      }

      if (
        !isHTMLNode(triggerElRef.current) ||
        (rect &&
          e.clientX > rect.left &&
          e.clientX < rect.right &&
          e.clientY > rect.top &&
          e.clientY < rect.bottom)
      ) {
        setIsDragOver(true);
      }
    },
    [triggerElRef, acceptedFileTypes],
  );

  const onDragLeaveHandler = useCallback(
    (e: MouseEvent | DragEvent<TargetRef>) => {
      e.preventDefault();
      e.stopPropagation();

      const rect = triggerElRef.current?.getBoundingClientRect();

      if (
        !isHTMLNode(triggerElRef.current) ||
        (rect &&
          (e.clientY < rect.top ||
            e.clientY >= rect.bottom ||
            e.clientX < rect.left ||
            e.clientX >= rect.right))
      ) {
        setIsDragOver(false);
        setError(false);
      }
    },
    [triggerElRef],
  );

  const onDragMoveHandler = useCallback((e: Event | DragEvent<TargetRef>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const onCloseHandler = useCallback(() => {
    fileServices.cancelUpload();
    setFile(null);
    setError(false);
    setIsUploadStarted(false);
    setIsUploadComplete(false);
    setUploadPercentage(0);
    cleanFileInput();
    onContentChange?.('');
  }, [cleanFileInput, onContentChange, fileServices]);

  const onClickHandler = useCallback(() => {
    setError(false);
    setIsUploadStarted(false);
    setIsUploadComplete(false);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, [fileInputRef]);

  useEffect(() => {
    const { current } = triggerElRef;
    if (current && isHTMLNode(current)) {
      current.addEventListener('drop', onDropHandler);
      current.addEventListener('dragenter', onDragEnterHandler);
      current.addEventListener('dragleave', onDragLeaveHandler);
      current.addEventListener('dragover', onDragMoveHandler);
    }

    return () => {
      if (current && isHTMLNode(current)) {
        current.removeEventListener('drop', onDropHandler);
        current.removeEventListener('dragenter', onDragEnterHandler);
        current.removeEventListener('dragleave', onDragLeaveHandler);
        current.removeEventListener('dragover', onDragMoveHandler);
      }
    };
  }, [
    triggerElRef,
    onClickHandler,
    onDropHandler,
    onDragEnterHandler,
    onDragLeaveHandler,
    onDragMoveHandler,
  ]);

  useEffect(() => {
    const clipboardEl: HTMLElement | null | undefined = clipboard?.current;

    if (clipboardEl && isHTMLNode(clipboardEl)) {
      clipboardEl.addEventListener('paste', onPasteHandler);
    }

    return () => {
      if (clipboardEl && isHTMLNode(clipboardEl)) {
        clipboardEl.removeEventListener('paste', onPasteHandler);
      }
    };
  }, [clipboard, onPasteHandler]);

  return (
    <>
      <FileInput
        accept={allTypesSupported ? '*' : acceptedFileTypes ?? '*'}
        type="file"
        ref={fileInputRef}
        onChange={onChangeHandler}
        data-testid="file-upload-input"
      />
      {children({
        triggerElRef,
        fileName: file?.name || getFileNameFromUrl(url || ''),
        fileSize: file?.size,
        fileType: file?.type,
        url,
        error,
        isDraggingOver,
        isUploadStarted,
        isUploadComplete,
        onTryAgainHandler,
        uploadPercentage,
        onChangeHandler,
        onCloseHandler,
        onClickHandler,
      })}
    </>
  );
}
