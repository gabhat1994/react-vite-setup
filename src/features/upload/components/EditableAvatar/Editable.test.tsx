import { MockedProvider } from '@apollo/client/testing';
import { cleanup, render, fireEvent } from '@/test-utils';
// eslint-disable-next-line import/no-restricted-paths
import { GenerateUserS3SignedUrlDocument } from '@/apollo/graphql';
import { EditableAvatar } from './index';

describe('<Upload />', () => {
  afterEach(() => {
    cleanup();
  });

  test('opens dropdown on clicking target', async () => {
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

    const { getByTestId, container } = render(
      <MockedProvider mocks={[uploadMock]} addTypename={false}>
        <EditableAvatar
          editable
          size="XXXL"
          onContentChange={onContentChange}
        />
      </MockedProvider>,
    );

    const AvatarEle = getByTestId('avatarContainer');
    const AvatarEditButtonEle = getByTestId('avatarEditButton');
    await fireEvent.click(AvatarEditButtonEle);

    expect(AvatarEle).toBeTruthy();
    expect(AvatarEditButtonEle).toBeTruthy();
    expect(container).toBeTruthy();
  });
});
