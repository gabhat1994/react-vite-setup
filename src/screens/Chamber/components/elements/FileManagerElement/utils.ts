import { isSafari } from 'react-device-detect';
import { type NoumFileRoleOption } from './types';

export const getIconColorByExtension = (ext: string) => {
  switch (ext) {
    case 'zip':
      return '--icon-file-unknown-default';
    case 'pdf':
      return '--icon-file-pdf-default';
    case 'xls':
    case 'xlsx':
      return '--icon-file-xls-default';
    case 'doc':
    case 'docx':
      return '--icon-file-doc-default';
    case 'pptx':
    case 'ppt':
      return '--icon-file-ppt-default';
    default:
      return '--icon-file-unknown-default';
  }
};

export const isSupportedVideoType = (extension: string) =>
  // .mov is not supported by safari
  isSafari ? ['mp4'].includes(extension) : ['mp4', 'mov'].includes(extension);

export const isImageType = (extension: string) =>
  ['png', 'jpg', 'jpeg'].includes(extension);

export const isSupportedMediaType = (extension: string) =>
  isSupportedVideoType(extension) || isImageType(extension);

export const getNoumRoleName = (
  roleOptions: NoumFileRoleOption[],
  roleId: string,
) => roleOptions.find((roleOption) => roleOption._id === roleId)?.name;
