import {
  isFileTypeValid,
  isFileSizeValid,
  getValidFormats,
} from './uploadFile';

describe('uploadFile', () => {
  describe('isFileTypeValid', () => {
    test('validate valid file or not', () => {
      const validFileTypes = ['png', 'jpg', 'jpeg', 'mp4', 'quicktime'];
      expect(isFileTypeValid('png', validFileTypes)).toBe(true);
      expect(isFileTypeValid('jpg', validFileTypes)).toBe(true);
      expect(isFileTypeValid('jpeg', validFileTypes)).toBe(true);
      expect(isFileTypeValid('mp4', validFileTypes)).toBe(true);
      expect(isFileTypeValid('quicktime', validFileTypes)).toBe(true);
      expect(isFileTypeValid('txt', validFileTypes)).toBe(false);
      expect(isFileTypeValid('xslx', validFileTypes)).toBe(false);
      expect(isFileTypeValid('env', validFileTypes)).toBe(false);
      expect(isFileTypeValid('*', validFileTypes)).toBe(true);
    });
  });

  describe('isFileSizeValid', () => {
    test('check file size is valid or not', () => {
      const MAX_FILE_SIZE = 200;
      expect(isFileSizeValid(1024, MAX_FILE_SIZE)).toBe(true);
      expect(isFileSizeValid(2048, MAX_FILE_SIZE)).toBe(true);
      expect(isFileSizeValid(10240, MAX_FILE_SIZE)).toBe(true);
      expect(isFileSizeValid(20480, MAX_FILE_SIZE)).toBe(true);
      expect(isFileSizeValid(220200960, MAX_FILE_SIZE)).toBe(false);
      expect(isFileSizeValid(314572800, MAX_FILE_SIZE)).toBe(false);
    });
  });

  describe('getValidFormats', () => {
    test('check valid formats is returning for video type', () => {
      const { formats, maxFileSize, extensions, defaultFootNote } =
        getValidFormats('video');
      expect(formats).toBe('video/mp4video/quicktime');
      expect(maxFileSize).toBe(5);
      expect(extensions).toEqual(['video/mp4', 'video/quicktime']);
      expect(defaultFootNote).toBe(
        'noumena.drag_drop_video_file_type_size.text',
      );
    });
    test('check valid formats is returning for image type', () => {
      const { formats, maxFileSize, extensions, defaultFootNote } =
        getValidFormats('image');
      expect(formats).toBe('image/jpgimage/pngimage/jpeg');
      expect(maxFileSize).toBe(1);
      expect(extensions).toEqual(['image/jpg', 'image/png', 'image/jpeg']);
      expect(defaultFootNote).toBe(
        'noumena.drag_drop_image_file_type_size.text',
      );
    });
    test('check valid formats is returning for other types', () => {
      const { formats, maxFileSize, extensions, defaultFootNote } =
        getValidFormats('pdf');
      expect(formats).toBe('*');
      expect(maxFileSize).toBe(100);
      expect(extensions).toEqual([]);
      expect(defaultFootNote).toBe(
        'noumena.drag_drop_default_file_type_size.text',
      );
    });
  });
});
