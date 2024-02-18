import { extensionToMime } from './extensionToMimeType';

export const isCorrectFileType = (
  files: FileList | DataTransferItemList,
  _acceptedFileTypes?: string,
): boolean => {
  if (!files.length) {
    return false;
  }
  let mimeType = files[0]?.type;

  if (!files[0].type && 'name' in files[0] && files[0].name) {
    mimeType = extensionToMime(files[0].name);
  }

  return !!(
    _acceptedFileTypes &&
    files &&
    files.length > 0 &&
    _acceptedFileTypes.split(',').includes(mimeType ?? '')
  );
};
