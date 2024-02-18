import { ExtensionsMap } from '@/constants/extensions';

/**
 * Change extension to according mimetype using ext=>mimetype map
 */
export const extensionToMime = (ext: string) => {
  let extension = ext;

  if (!extension || extension.length === 0) {
    return '';
  }

  if (extension.split('/').length === 2) {
    return extension;
  }

  if (ext.indexOf('.') > -1) {
    extension = ext.split('.').pop() ?? '';
  }

  const entries = Object.entries(ExtensionsMap);

  return entries.find((entry) => entry[1].includes(extension))?.[0] ?? '';
};
