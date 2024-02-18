import { MockedProvider } from '@apollo/client/testing';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { act, fireEvent, render, waitFor } from '@/test-utils';
import { GenerateUserS3SignedUrlDocument } from '@/apollo/graphql';
import {
  BodyContentEnum,
  type ElementOutput,
  ElementStatusEnum,
} from '@/apollo/generated/types';
import ImageElement from '.';
import ImageEditor from './ImageEditor';

vi.mock('@/components/Upload/utils/generateFileName', () => ({
  generateFileName: () => 'image.random.png',
}));

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
  elementType: 'IMAGE',
  headerContent: null,
  position: 3,
  status: 'PUBLISHED',
  tempStatus: ElementStatusEnum.Draft,
  unSaved: null,
  viewOnly: null,
  __typename: 'ElementOutput',
};

const mockSpaceId = '123';

describe.skip('<ImageElement />', () => {
  const SignedUrlMock = {
    request: {
      query: GenerateUserS3SignedUrlDocument,
      variables: {
        file: {
          fileName: 'image.random.png',
          mime: 'image/png',
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

  test('upload functionality test with incorrect type file', async () => {
    const mockContentChange = vi.fn();
    const { getByTestId } = render(
      <MockedProvider mocks={[SignedUrlMock]} addTypename={false}>
        <ImageElement
          isEditing={true}
          spaceId={mockSpaceId}
          element={mockElement}
          url={mockElement.bodyContent as string}
          setShowAll={() => {}}
          onContentChange={mockContentChange}
        />
      </MockedProvider>,
    );
    const fileUploadInput = getByTestId('file-upload-input');
    expect(getByTestId('image-edit-pre-upload-container')).toBeInTheDocument();
    expect(fileUploadInput).toBeInTheDocument();
    const fakeFile = new File(['hello'], 'hello.png', { type: 'image/png' });
    const event = {
      target: {
        files: [fakeFile],
      },
    };
    act(() => {
      fireEvent.load(fileUploadInput, event);
    });
  });
  test('Test for image view mode', async () => {
    const mockContentChange = vi.fn();
    const { getByTestId } = render(
      <MockedProvider mocks={[SignedUrlMock]} addTypename={false}>
        <ImageElement
          spaceId={mockSpaceId}
          element={mockElement}
          url="https://undefined.s3-accelerate.amazonaws.com/image.random.png"
          onContentChange={mockContentChange}
        />
      </MockedProvider>,
    );
    const imageView = getByTestId('image-element-view');
    expect(imageView).toBeInTheDocument();
  });
  test('Test for image view mode without the URL', async () => {
    const mockContentChange = vi.fn();
    const { queryByTestId } = render(
      <MockedProvider mocks={[SignedUrlMock]} addTypename={false}>
        <ImageElement
          spaceId={mockSpaceId}
          element={mockElement}
          onContentChange={mockContentChange}
        />
      </MockedProvider>,
    );
    const imageView = queryByTestId('image-element-view');
    expect(imageView).toBe(null);
  });
  test('upload should get canceled', async () => {
    const mockContentChange = vi.fn();
    const mock = new MockAdapter(axios);
    mock.onPut('/uploadMock').reply((config) => {
      const total = 1024; // mocked file size
      const progress = 0.4;
      if (config.onUploadProgress) {
        config.onUploadProgress({ loaded: total * progress, total });
      }
      return new Promise(() => {});
    });
    const { getByTestId, queryAllByTestId } = render(
      <MockedProvider mocks={[SignedUrlMock]} addTypename={false}>
        <ImageEditor
          url={mockElement.bodyContent as string}
          onContentChange={mockContentChange}
        />
      </MockedProvider>,
    );
    const fileUploadInput = getByTestId('file-upload-input');
    expect(getByTestId('image-edit-pre-upload-container')).toBeInTheDocument();
    expect(fileUploadInput).toBeInTheDocument();
    const fakeFile = new File(['hello'], 'hello.png', { type: 'image/png' });
    const event = {
      target: {
        files: [fakeFile],
      },
    };
    act(() => {
      fireEvent.change(fileUploadInput, event);
    });
    await waitFor(
      () => {
        expect(mock.history.put.length).toBe(1);
        const [closeIcon] = queryAllByTestId('svgIcon');
        act(() => {
          fireEvent.click(closeIcon);
        });
      },
      { timeout: 5000 },
    );
    await waitFor(
      () => {
        expect(mockContentChange).toHaveBeenCalledWith('');
      },
      { timeout: 5000 },
    );
  });
  test('should get uploaded successfully', async () => {
    const mock = new MockAdapter(axios);

    mock.onPut('/uploadMock').reply(
      (config) =>
        new Promise((resolve) => {
          let progress = 0;
          const total = 1024;
          const it = setInterval(() => {
            progress += 0.2;
            if (config.onUploadProgress) {
              config.onUploadProgress({ loaded: total * progress, total });
            }
            if (progress === 1) {
              clearInterval(it);
            }
          }, 100);
          setTimeout(() => {
            resolve([200, null]);
          }, 2000);
        }),
    );
    const mockContentChange = vi.fn();
    const { getByTestId } = render(
      <MockedProvider mocks={[SignedUrlMock]} addTypename={false}>
        <ImageElement
          isEditing={true}
          spaceId={mockSpaceId}
          setShowAll={() => {}}
          element={mockElement}
          url={mockElement.bodyContent as string}
          onContentChange={mockContentChange}
        />
      </MockedProvider>,
    );
    const fileUploadInput = getByTestId('file-upload-input');
    expect(fileUploadInput).toBeInTheDocument();
    const fakeFile = new File(['hello'], 'hello.png', { type: 'image/png' });
    const event = {
      target: {
        files: [fakeFile],
      },
    };
    act(() => {
      fireEvent.change(fileUploadInput, event);
    });
    await waitFor(
      () => {
        expect(mockContentChange).toHaveBeenCalledWith(
          'https://noumena-img.s3-accelerate.amazonaws.com/image.random.png',
          undefined,
        );
      },
      { timeout: 5000 },
    );
  });
});
