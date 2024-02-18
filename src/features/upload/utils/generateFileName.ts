import sanitizeFilename from 'sanitize-filename';
import { type UploadMediaType } from '../types';

function prepareFilename(fileName: string) {
  const fileNameParts = fileName.split('.');
  const fileExtension = fileNameParts[fileNameParts.length - 1];
  const name = sanitizeFilename([...fileNameParts.slice(0, -1)].join('-'));
  return { name, extension: fileExtension };
}

export const generateFileName = (
  fileName: string,
  type: UploadMediaType,
  userId: string,
) => {
  const { name, extension } = prepareFilename(fileName);
  return `${userId}/${type}/${name}.${extension}`;
};

export const generateFileThumbnailName = (
  fileName: string,
  type: UploadMediaType,
  userId: string,
) => {
  const { name } = prepareFilename(fileName);
  return `${userId}/${type}/${name}.jpg`;
};

export const removeSpecialCharacters = (fileName: string) =>
  fileName
    .replace(/[`~!@#$%^&*()|+?=;:'",<>{}[\]\\/]/gi, '')
    .replace(/[\s]+/g, '-');
