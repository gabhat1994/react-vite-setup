import { MockedProvider } from '@apollo/client/testing';
import { cleanup, render } from '@/test-utils';
import { GenerateUserS3SignedUrlDocument } from '@/apollo/graphql';
import { imageTypes } from '@/constants/fileTypes';
import UploadMedia from './UploadMedia';

describe('<UploadMedia />', () => {
  afterEach(() => {
    cleanup();
  });

  test('Test Upload is working as expected', async () => {
    const uploadMock = {
      request: {
        query: GenerateUserS3SignedUrlDocument,
        variables: {
          file: {
            fileName: 'example.png',
            mime: 'image/png',
          },
        },
      },
      result: {
        data: {
          url: 'https://noumena-img.s3-accelerate.amazonaws.com/Group 1.TZW5HgkP.png',
        },
      },
    };

    const onContentChange = vi.fn();
    const onUploading = vi.fn();
    const setMediaDetail = vi.fn();

    const { getByTestId, container } = render(
      <MockedProvider mocks={[uploadMock]} addTypename={false}>
        <div>
          <UploadMedia
            setMediaDetail={setMediaDetail}
            acceptedFileTypes={imageTypes}
            onUploading={onUploading}
            onContentChange={onContentChange}
            type="profile"
          />
        </div>
      </MockedProvider>,
    );

    const pickerEle = getByTestId('multi_media_upload');
    const pickerButtonEle = getByTestId('multi_media_upload_btn');

    expect(container).toBeTruthy();
    expect(pickerEle).toBeTruthy();
    expect(pickerButtonEle).toBeTruthy();
  });
});
