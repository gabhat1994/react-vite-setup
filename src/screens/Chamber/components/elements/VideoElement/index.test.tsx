import { MockedProvider } from '@apollo/client/testing';
import { intersectionObserver } from '@/test-utils/stubs';
import { render } from '@/test-utils';
import { GenerateUserS3SignedUrlDocument } from '@/apollo/graphql';
import {
  BodyContentEnum,
  type ElementOutput,
  ElementStatusEnum,
} from '@/apollo/generated/types';
import VideoElement from '.';

const mockElement: ElementOutput = {
  _id: '628fbca2e748a996ac4164b9',
  bodyContent: '',
  bodyContentJson: null,
  bodyContentType: BodyContentEnum.Url,
  draft: {
    bodyContent: null,
    bodyContentJson: null,
    headerContent: null,
    isDeleted: true,
    position: null,
    __typename: 'ElementInnerOutput',
  },
  elementType: 'VIDEO',
  headerContent: null,
  position: 3,
  status: 'PUBLISHED',
  tempStatus: ElementStatusEnum.Draft,
  unSaved: null,
  viewOnly: null,
  __typename: 'ElementOutput',
};

const mockSpaceId = '123';

describe.skip('<VideoElement />', () => {
  beforeEach(() => intersectionObserver.mock());
  afterEach(() => {
    intersectionObserver.restore();
  });

  const SignedUrlMock = {
    request: {
      query: GenerateUserS3SignedUrlDocument,
      variables: {
        file: {
          fileName: 'video.random.mp4',
          mime: 'video/mp4',
        },
      },
    },
    result: () => ({
      data: {
        generateUserS3SignedUrl: {
          url: '/uploadMock',
        },
      },
      loading: false,
    }),
  };

  test('Test for video view mode', async () => {
    const mockContentChange = vi.fn();
    const { getByTestId } = render(
      <MockedProvider mocks={[SignedUrlMock]} addTypename={false}>
        <VideoElement
          spaceId={mockSpaceId}
          element={mockElement}
          url="https://undefined.s3-accelerate.amazonaws.com/video.random.mp4"
          onContentChange={mockContentChange}
        />
      </MockedProvider>,
    );
    const videoView = getByTestId('video-element-view');
    expect(videoView).toBeInTheDocument();
  });
  test('Test for video view mode without the URL', async () => {
    const mockContentChange = vi.fn();
    const { queryByTestId } = render(
      <MockedProvider mocks={[SignedUrlMock]} addTypename={false}>
        <VideoElement
          spaceId={mockSpaceId}
          element={mockElement}
          onContentChange={mockContentChange}
        />
      </MockedProvider>,
    );
    const videoView = queryByTestId('video-element-view');
    expect(videoView).toBe(null);
  });
});
