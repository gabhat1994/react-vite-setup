import {
  DEFAULT_FILE_MAX_SIZE,
  IMAGE_ACCEPTED_FORMATS,
  IMAGE_FILE_MAX_SIZE,
  IMAGE_VALID_EXTENSIONS,
  VIDEO_ACCEPTED_FORMATS,
  VIDEO_FILE_MAX_SIZE,
  VIDEO_VALID_EXTENSIONS,
} from '@/constants/uploadFile';

interface ValidFormatsObj {
  formats: string;
  extensions: string[];
  maxFileSize: number;
  defaultFootNote: string;
}

export const isFileTypeValid = (
  type: string,
  validExtensions: string[],
): boolean => {
  if (type === '*') return true;
  if (validExtensions.includes(type)) {
    return true;
  }
  return false;
};

export const isFileSizeValid = (size: number, maxFileSize: number): boolean => {
  const actualFileSize = Math.round(size / (1024 * 1024)); // checking in MB
  if (maxFileSize > actualFileSize) {
    return true;
  }
  return false;
};

export const getValidFormats = (
  accept: string | undefined,
): ValidFormatsObj => {
  if (accept === 'video') {
    return {
      formats: VIDEO_ACCEPTED_FORMATS,
      extensions: VIDEO_VALID_EXTENSIONS,
      maxFileSize: VIDEO_FILE_MAX_SIZE,
      defaultFootNote: 'noumena.drag_drop_video_file_type_size.text',
    };
  }
  if (accept === 'image') {
    return {
      formats: IMAGE_ACCEPTED_FORMATS,
      extensions: IMAGE_VALID_EXTENSIONS,
      maxFileSize: IMAGE_FILE_MAX_SIZE,
      defaultFootNote: 'noumena.drag_drop_image_file_type_size.text',
    };
  }
  return {
    formats: '*',
    extensions: [],
    maxFileSize: DEFAULT_FILE_MAX_SIZE,
    defaultFootNote: 'noumena.drag_drop_default_file_type_size.text',
  };
};
