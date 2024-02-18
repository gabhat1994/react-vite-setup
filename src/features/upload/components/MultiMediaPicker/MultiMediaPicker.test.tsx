import { MockedProvider } from '@apollo/client/testing';
import { cleanup, render } from '@/test-utils';
import { GenerateUserS3SignedUrlDocument } from '@/apollo/graphql';
import { imageTypes } from '@/constants/fileTypes';
import MultiMediaPicker from './MultiMediaPicker';

describe('<MultiMediaPicker />', () => {
  afterEach(() => {
    cleanup();
  });

  test('', async () => {
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
    const onUploadFile = vi.fn();

    const { getByTestId, container } = render(
      <MockedProvider mocks={[uploadMock]} addTypename={false}>
        <div>
          <MultiMediaPicker
            type="noum"
            acceptedFileTypes={imageTypes}
            onUploading={onUploading}
            onContentChange={onContentChange}
            onUploadFile={onUploadFile}
          />
        </div>
      </MockedProvider>,
    );

    const pickerEle = getByTestId('multi_media_picker');
    const pickerButtonEle = getByTestId('multi_media_picker_btn');

    expect(container).toBeTruthy();
    expect(pickerEle).toBeTruthy();
    expect(pickerButtonEle).toBeTruthy();
  });
});
