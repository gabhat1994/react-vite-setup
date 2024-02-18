import fileSizeConverter from './fileSizeConverter';

export const getFileExtension = (filename: string) => filename.split('.').pop();

export const getFileNameFromUrl = (url: string) => url.split('/').pop();

export const getVideoMimeType = (extension: string | undefined) => {
  switch (extension) {
    case 'qt':
    case 'mov':
      return 'video/quicktime';
    case 'webm':
      return 'video/webm';
    case 'mp4':
      return 'video/mp4';
    case 'msvideo':
      return 'video/x-msvideo';
    default:
      return undefined;
  }
};

export const downloadFileFromUrl = (
  url: string,
  contentType: string,
  fileName: string,
) =>
  fetch(url, {
    headers: {
      'Content-Type': contentType,
      'Content-Disposition': 'attachment',
    },
  })
    .then((response) => response.blob())
    .then((blob) => downloadFile(blob, fileName));

/**
 *
 * @param data Blog | string
 * @param fileName
 */
export const downloadFile = (data: string | Blob, fileName: string) => {
  const blobData: Blob = typeof data === 'string' ? new Blob([data]) : data;

  const downloadUrl = window.URL.createObjectURL(blobData);
  const a = document.createElement('a');
  a.href = downloadUrl;
  a.download = fileName;
  a.click();
};

export const isValidFileSize = (fileSize: number, limit?: number): boolean => {
  if (!limit) return true;
  const fileMBSize = parseFloat(fileSizeConverter(fileSize, 2, 'MB'));
  return fileMBSize <= limit;
};
