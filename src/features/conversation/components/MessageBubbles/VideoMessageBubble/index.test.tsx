import { render } from '@/test-utils';
import { VideoMessageBubble } from './index';

describe('VideoMessageBubble', () => {
  beforeEach(() => {
    const mockIntersectionObserver = vi.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  const media = {
    getContentTemporaryUrl: async () =>
      'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
    contentType: 'video/mp4',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;

  test('Should render', () => {
    const { getByTestId } = render(<VideoMessageBubble media={media} />);
    expect(getByTestId('video-message-bubble')).toBeInTheDocument();
    expect(getByTestId('message-video')).toBeInTheDocument();
  });

  test('Should render sent video', () => {
    const { getByTestId } = render(
      <VideoMessageBubble type="sent" media={media} />,
    );
    expect(
      window.getComputedStyle(getByTestId('message-bubble')).alignItems,
    ).toBe('flex-end');
  });

  test('Should render received video', () => {
    const { getByTestId } = render(
      <VideoMessageBubble type="received" media={media} />,
    );
    expect(
      window.getComputedStyle(getByTestId('message-bubble')).alignItems,
    ).toBe('flex-start');
  });

  test('Should have loading indicator', () => {
    const { getByTestId } = render(
      <VideoMessageBubble type="sent" status="sending" />,
    );
    const SpinnerEl = getByTestId('spinner');
    expect(SpinnerEl).toBeInTheDocument();
  });
});
