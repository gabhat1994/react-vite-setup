import { intersectionObserver } from '@/test-utils/stubs';
import { render } from '@/test-utils';
import VideoJS from './VideoJS';
import VideoPlayer from './VideoPlayer';

describe('<VideoPlayer />', () => {
  beforeEach(() => intersectionObserver.mock());
  afterEach(() => {
    intersectionObserver.restore();
  });
  test('Display text when video url is null', () => {
    const { getByTestId } = render(<VideoPlayer url={null} fileType={null} />);

    expect(getByTestId('no_video_found')).toBeInTheDocument();
  });

  test('render video player', () => {
    const { getByTestId } = render(
      <VideoPlayer
        url="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"
        fileType="video/mp4"
      />,
    );

    expect(getByTestId('videoPlayer')).toBeInTheDocument();
  });
});

describe('<VideoJS />', () => {
  beforeEach(() => intersectionObserver.mock());
  afterEach(() => {
    intersectionObserver.restore();
  });
  test('render video', () => {
    const videoJsOptions = {
      autoplay: false,
      controls: true,
      responsive: false,
      fluid: false,
      sources: [
        {
          src: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
          type: 'video/mp4',
        },
      ],
    };
    const { getByTestId } = render(<VideoJS options={videoJsOptions} />);

    expect(getByTestId('videoPlayer')).toBeInTheDocument();
  });
});
