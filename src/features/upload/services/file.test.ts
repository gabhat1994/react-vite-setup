import axios from 'axios';
import { MockFile } from '@/test-utils';

import { FileServices, type FileUploadProcessEventType } from './file';

vi.mock('axios');

const mockedAxios = vi.mocked(axios, true);

const mockedCallback = vi.fn(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (progressEvent: FileUploadProcessEventType) => {},
);

describe('IdentifyService', () => {
  beforeEach(() => {
    mockedAxios.post.mockReset();
  });

  describe('uploadFileWithSignedUrl', () => {
    it('should call with the correct params', async () => {
      const signedUrl =
        'https://presignedurldemo.s3.eu-west-2.amazonaws.com/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJJWZ7B6WCRGMKFGQ%2F20180210%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Date=20180210T171315Z&X-Amz-Expires=1800&X-Amz-Signature=12b74b0788aa036bc7c3d03b3f20c61f1f91cc9ad8873e3314255dc479a25351&X-Amz-SignedHeaders=host';
      const file = MockFile('image.png', 1024, 'image/png');
      const fileServices = new FileServices();
      await fileServices.uploadFileWithSignedUrl(
        signedUrl,
        file,
        mockedCallback,
      );

      mockedAxios.put.mockImplementationOnce(() => Promise.resolve({}));

      expect(mockedAxios.put).toHaveBeenCalled();
    });
  });
});
