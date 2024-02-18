import { MockedProvider } from '@apollo/client/testing';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { intersectionObserver } from '@/test-utils/stubs';
import { act, fireEvent, render, waitFor } from '@/test-utils';
import { GenerateUserS3SignedUrlDocument } from '@/apollo/graphql';
import { imageTypes, videoTypes } from '@/constants/fileTypes';
import { Button } from '@/components/Button';
import ImageEditor from '@/screens/Chamber/components/elements/ImageElement/ImageEditor';
import VideoEditor from '@/screens/Chamber/components/elements/VideoElement/VideoEditor';
import { Upload } from './Upload';

const mock = new MockAdapter(axios);

vi.stubGlobal(
  'fetch',
  vi.fn(() =>
    Promise.resolve({
      blob: () =>
        Promise.resolve(new Blob(['testing'], { type: 'image/jpeg' })),
    }),
  ),
);

vi.mock('./utils/generateFileName', () => ({
  generateFileName: () => 'video.random.mp4',
  generateFileThumbnailName: () => 'random.12345.jpg',
}));
vi.mock('@rajesh896/video-thumbnails-generator', () => ({
  generateVideoThumbnails: () => [
    'data:image/bmp;base64,Qk1xAAAAAAAAAHsAAABsAAAAAQAAAAEAAAABACAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAD/AAD/AAAAAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQ==',
  ],
}));

describe('<Upload />', () => {
  beforeEach(() => intersectionObserver.mock());
  afterEach(() => {
    intersectionObserver.restore();
  });
  const uploadMock = {
    request: {
      query: GenerateUserS3SignedUrlDocument,
      variables: {
        file: {
          fileName: 'test.docx',
          mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        },
      },
    },
    result: {
      data: { url: '/uploadMock' },
    },
  };

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

  const ThumbnailSignedUrlMock = {
    request: {
      query: GenerateUserS3SignedUrlDocument,
      variables: {
        file: {
          fileName: 'random.12345.jpg',
          mime: 'image/jpeg',
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

  const SignedUrlImageMock = {
    request: {
      query: GenerateUserS3SignedUrlDocument,
      variables: {
        file: {
          fileName: 'video.random.mp4',
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

  const SignedUrlErrorMock = {
    request: {
      query: GenerateUserS3SignedUrlDocument,
      variables: {
        file: {
          fileName: 'video.random.mp4',
          mime: 'image/png',
        },
      },
    },
    result: () => ({
      data: {
        generateUserS3SignedUrl: {
          url: '',
        },
      },
      loading: false,
    }),
  };

  afterAll(() => {
    vi.clearAllTimers();
  });

  test('opens dropdown on clicking target', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[uploadMock]} addTypename={false}>
        <Upload<HTMLButtonElement> type="profile">
          {({ triggerElRef }) => (
            <Button data-testid="trigger" ref={triggerElRef}>
              Upload
            </Button>
          )}
        </Upload>
      </MockedProvider>,
    );

    expect(getByTestId('trigger')).toBeInTheDocument();
  });

  test('upload functionality test with incorrect type file', async () => {
    const mockContentChange = vi.fn();
    const { getByTestId } = render(
      <MockedProvider mocks={[SignedUrlMock]} addTypename={false}>
        <VideoEditor onContentChange={mockContentChange} />
      </MockedProvider>,
    );
    const fileUploadInput = getByTestId('file-upload-input');
    expect(getByTestId('edit-pre-upload-container')).toBeInTheDocument();
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
  test('upload should get canceled', async () => {
    const mockContentChange = vi.fn();
    // this mocks a request which is always at 40% progress
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
        <VideoEditor onContentChange={mockContentChange} />
      </MockedProvider>,
    );
    const fileUploadInput = getByTestId('file-upload-input');
    expect(getByTestId('edit-pre-upload-container')).toBeInTheDocument();
    expect(fileUploadInput).toBeInTheDocument();
    const fakeFile = new File(['sample'], 'video.mp4', { type: 'video/mp4' });
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
      <MockedProvider
        mocks={[SignedUrlMock, ThumbnailSignedUrlMock]}
        addTypename={false}
      >
        <VideoEditor onContentChange={mockContentChange} />
      </MockedProvider>,
    );
    const fileUploadInput = getByTestId('file-upload-input');
    expect(getByTestId('edit-pre-upload-container')).toBeInTheDocument();
    expect(fileUploadInput).toBeInTheDocument();
    const fakeFile = new File(['sample'], 'video.mp4', { type: 'video/mp4' });
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
          'https://noumena-img.s3-accelerate.amazonaws.com/video.random.mp4',
          {
            fileName: 'video.mp4',
            fileSize: 6,
            thumbnail:
              'https://noumena-img.s3-accelerate.amazonaws.com/random.12345.jpg',
            type: 'video',
            videoURL:
              'https://noumena-img.s3-accelerate.amazonaws.com/video.random.mp4',
          },
        );
      },
      { timeout: 5000 },
    );
  });
  test('Tests for Max size for Video', async () => {
    mock.onPut('/uploadMock').reply((config) => {
      const total = 1024; // mocked file size
      const progress = 0.4;
      if (config.onUploadProgress) {
        config.onUploadProgress({ loaded: total * progress, total });
      }
      return new Promise(() => {});
    });
    const mockContentChange = vi.fn();
    const { getByTestId, getByText } = render(
      <MockedProvider mocks={[SignedUrlMock]} addTypename={false}>
        <VideoEditor onContentChange={mockContentChange} />
      </MockedProvider>,
    );
    const fileUploadInput = getByTestId('file-upload-input');
    expect(getByTestId('edit-pre-upload-container')).toBeInTheDocument();
    expect(fileUploadInput).toBeInTheDocument();
    const fakeFile = new File(['sample'], 'video.mp4', { type: 'video/mp4' });
    Object.defineProperty(fakeFile, 'size', { value: 1024 * 1024 * 200 + 1 }); // 200MB + 1 byte
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
        expect(
          getByText(
            'There was an error uploading your files MOV, MP4. Max 200 Mb.',
          ),
        ).toBeInTheDocument();
      },
      { timeout: 5000 },
    );
  });
  test('Tests for Max size for Image', async () => {
    mock.onPut('/uploadMock').reply((config) => {
      const total = 1024; // mocked file size
      const progress = 0.4;
      if (config.onUploadProgress) {
        config.onUploadProgress({ loaded: total * progress, total });
      }
      return new Promise(() => {});
    });
    const mockContentChange = vi.fn();
    const { getByTestId, getByText } = render(
      <MockedProvider mocks={[SignedUrlMock]} addTypename={false}>
        <ImageEditor onContentChange={mockContentChange} />
      </MockedProvider>,
    );
    const fileUploadInput = getByTestId('file-upload-input');
    expect(getByTestId('image-edit-pre-upload-container')).toBeInTheDocument();
    expect(fileUploadInput).toBeInTheDocument();
    const fakeFile = new File(['sample'], 'image.png', { type: 'image/png' });
    Object.defineProperty(fakeFile, 'size', { value: 1024 * 1024 * 20 + 1 }); // 20MB + 1 byte
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
        expect(
          getByText(
            'There was an error uploading your files PNG, JPG. Max 20 Mb.',
          ),
        ).toBeInTheDocument();
      },
      { timeout: 5000 },
    );
  });
  test('drag and drop file image should get uploaded successfully', async () => {
    const dragmock = new MockAdapter(axios);
    dragmock.onPut('/uploadMock').reply(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve([200, null]);
          }, 2000);
        }),
    );
    const mockContentChange = vi.fn();
    const { getByTestId } = render(
      <MockedProvider mocks={[SignedUrlImageMock]}>
        <Upload<HTMLDivElement>
          onContentChange={mockContentChange}
          acceptedFileTypes={imageTypes}
          type="profile"
        >
          {({ triggerElRef }) => (
            <div data-testid="test-div" ref={triggerElRef}>
              Upload
            </div>
          )}
        </Upload>
      </MockedProvider>,
    );
    const testDiv = getByTestId('test-div');
    const fakeFile = new File(['sample'], 'image.png', { type: 'image/png' });
    Object.defineProperty(fakeFile, 'size', { value: 1024 * 1024 * 2 }); // 2MB
    const dataTransferObj = { dataTransfer: { files: [fakeFile] } };
    act(() => {
      fireEvent.dragEnter(testDiv, dataTransferObj);
    });
    act(() => {
      fireEvent.dragLeave(testDiv, dataTransferObj);
    });
    act(() => {
      fireEvent.drop(testDiv, dataTransferObj);
    });
    await waitFor(
      () => {
        expect(mockContentChange).toHaveBeenCalled();
      },
      { timeout: 5000 },
    );
  });
  test('drag and drop file should throw error', async () => {
    const mockContentChange = vi.fn();
    const { getByTestId } = render(
      <MockedProvider mocks={[SignedUrlErrorMock]}>
        <Upload<HTMLDivElement>
          onContentChange={mockContentChange}
          acceptedFileTypes={imageTypes}
          type="profile"
        >
          {({ triggerElRef }) => (
            <div data-testid="test-div" ref={triggerElRef}>
              Upload
            </div>
          )}
        </Upload>
      </MockedProvider>,
    );
    const testDiv = getByTestId('test-div');
    const fakeFile = new File(['sample'], 'image.png', { type: 'image/png' });
    Object.defineProperty(fakeFile, 'size', { value: 1024 * 1024 * 2 }); // 2MB
    act(() => {
      fireEvent.drop(testDiv, { dataTransfer: { files: [fakeFile] } });
    });
    await waitFor(() => {
      expect(mockContentChange).not.toHaveBeenCalled();
    });
  });
  test('drag and drop file with wrong file type', async () => {
    const mockContentChange = vi.fn();
    const { getByTestId } = render(
      <MockedProvider mocks={[SignedUrlMock]}>
        <Upload<HTMLDivElement>
          type="profile"
          onContentChange={mockContentChange}
          acceptedFileTypes={imageTypes}
        >
          {({ triggerElRef }) => (
            <div data-testid="test-div" ref={triggerElRef}>
              Upload
            </div>
          )}
        </Upload>
      </MockedProvider>,
    );
    const testDiv = getByTestId('test-div');
    const fakeFile = new File(['sample'], 'video.mp4', { type: 'video/mp4' });
    const dropZone = getByTestId('file-upload-input');
    Object.defineProperty(fakeFile, 'size', { value: 1024 * 1024 * 2 }); // 2MB
    act(() => {
      fireEvent.dragEnter(testDiv);
    });
    act(() => {
      fireEvent.dragOver(testDiv);
    });
    act(() => {
      fireEvent.dragLeave(dropZone);
    });
    act(() => {
      fireEvent.drop(testDiv, { dataTransfer: { files: [fakeFile] } });
    });
    await waitFor(() => {
      expect(mockContentChange).not.toHaveBeenCalled();
    });
  });
  test('upload Error should set Error in the Component', async () => {
    const mockContentChange = vi.fn();
    const errorMock = new MockAdapter(axios);
    errorMock.onPut('/uploadMock').reply(
      () =>
        new Promise((_, reject) => {
          reject(new Error('Error'));
        }),
    );
    const { getByTestId } = render(
      <MockedProvider mocks={[SignedUrlMock]} addTypename={false}>
        <VideoEditor onContentChange={mockContentChange} />
      </MockedProvider>,
    );
    const fileUploadInput = getByTestId('file-upload-input');
    expect(getByTestId('edit-pre-upload-container')).toBeInTheDocument();
    expect(fileUploadInput).toBeInTheDocument();
    const fakeFile = new File(['sample'], 'video.mp4', { type: 'video/mp4' });
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
        expect(mockContentChange).not.toHaveBeenCalled();
      },
      { timeout: 5000 },
    );
  });
  test('should error out when wrong file type is set for upload starts', async () => {
    const mockContentChange = vi.fn();
    const { getByTestId } = render(
      <MockedProvider mocks={[SignedUrlErrorMock]}>
        <Upload<HTMLDivElement>
          onContentChange={mockContentChange}
          acceptedFileTypes={videoTypes}
          type="profile"
        >
          {({ triggerElRef }) => (
            <div
              data-testid="test-div"
              ref={triggerElRef}
              style={{
                width: 300,
                height: 300,
              }}
            >
              Upload
            </div>
          )}
        </Upload>
      </MockedProvider>,
    );
    const fileUploadInput = getByTestId('file-upload-input');
    expect(fileUploadInput).toBeInTheDocument();
    const fakeFile = new File(['sample'], 'image.png', { type: 'image/png' });
    const event = {
      target: {
        files: [fakeFile],
      },
    };
    act(() => {
      fireEvent.change(fileUploadInput, event);
    });
    await waitFor(() => {
      expect(mockContentChange).not.toHaveBeenCalled();
    });
  });
});
