import { imageTypesArr, videoTypesArr } from '@/constants/fileTypes';
import { getFileDetails, getFileType } from './helpers';
import { testFileImageUrl, testFileVideoUrl } from './data';

describe('Add Reference Helper', () => {
  test('getFileDetails', () => {
    expect(getFileDetails(testFileImageUrl)).toMatchObject({
      fileType: 'image',
      fileName: 'alex-gruber-ewHvqzqLQZU-unsplash.OhSVgh4J.jpg',
    });
    expect(getFileDetails(testFileVideoUrl)).toMatchObject({
      fileType: 'video',
      fileName: 'alex-gruber-ewHvqzqLQZU-unsplash.OhSVgh4J.mp4',
    });
  });

  test('getFileType', () => {
    imageTypesArr.map((item) => {
      expect(getFileType(item)).toBe('image');
      expect(getFileType(item.split('/')[1])).toBe('image');
      return item;
    });

    videoTypesArr.map((item) => {
      expect(getFileType(item)).toBe('video');
      expect(getFileType(item.split('/')[1])).toBe('video');
      return item;
    });
  });
});
