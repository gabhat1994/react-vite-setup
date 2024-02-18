import {
  getMediaType,
  getMessageDateCreated,
  isPendingMessage,
  getFileFromPendingMessage,
  loadImageFromFile,
  isGlobalType,
  getMessageItemMaxLength,
} from './helpers';
import { mockedMessage, mockedPendingMessage } from './mocks';
import { ConversationType } from './types';

global.URL.createObjectURL = vi.fn();

describe('helpers', () => {
  test('isGlobalType', () => {
    expect(isGlobalType(ConversationType.GLOBAL_ALL)).toBe(true);
    expect(isGlobalType(ConversationType.PROJECT_OWNER)).toBe(false);
  });

  test('getMessageItemMaxLength', () => {
    expect(getMessageItemMaxLength(ConversationType.GLOBAL_ALL, 800)).toBe(
      '600px',
    );
    expect(getMessageItemMaxLength(ConversationType.GLOBAL_DIRECT, 2000)).toBe(
      '600px',
    );
    expect(getMessageItemMaxLength(ConversationType.PROJECT_OWNER, 400)).toBe(
      undefined,
    );
  });

  test('getMessageDateCreated', () => {
    const message = mockedMessage();
    expect(getMessageDateCreated(message)).toBe(
      new Date('2022-08-10').getTime(),
    );
  });

  test('getMediaType', () => {
    expect(getMediaType('image/png')).toBe('image');
    expect(getMediaType('video/mp4')).toBe('video');
  });

  test('isPendingMessage', () => {
    const message = mockedMessage();
    expect(isPendingMessage(message)).toBe(false);

    const pendingMessage = mockedPendingMessage();
    expect(isPendingMessage(pendingMessage)).toBe(true);
  });

  test('getFileFromPendingMessage', () => {
    const pendingMessage = mockedPendingMessage();
    expect(getFileFromPendingMessage(pendingMessage)).toBe(undefined);
  });

  test('loadImageFromFile', () => {
    const file = new File([new ArrayBuffer(1)], 'file.jpg', {
      type: 'image/jpg',
    });
    expect(loadImageFromFile(file)).toBeTruthy();
  });
});
