export const IMAGE_VALID_EXTENSIONS = ['image/jpg', 'image/png', 'image/jpeg'];

export const VIDEO_VALID_EXTENSIONS = ['video/mp4', 'video/quicktime'];

export const IMAGE_ACCEPTED_FORMATS = IMAGE_VALID_EXTENSIONS.map(
  (item) => item,
).join('');
export const VIDEO_ACCEPTED_FORMATS = VIDEO_VALID_EXTENSIONS.map(
  (item) => item,
).join('');

export const IMAGE_FILE_MAX_SIZE = 1; // 2MB TODO ask design team
export const VIDEO_FILE_MAX_SIZE = 5; // 200MB TODO change to 200mb
export const DEFAULT_FILE_MAX_SIZE = 100; // 100MB TODO ask design team
