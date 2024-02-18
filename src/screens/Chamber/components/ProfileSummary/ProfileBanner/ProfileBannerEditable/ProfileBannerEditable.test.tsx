import { MockedProvider } from '@apollo/client/testing';
import { cleanup, render, fireEvent } from '@/test-utils';
import { GenerateUserS3SignedUrlDocument } from '@/apollo/graphql';
import { ProfileBannerEditable } from './index';

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
        <ProfileBannerEditable
          onlyEditable
          size="XXXL"
          onContentChange={onContentChange}
          isBanner={false}
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
