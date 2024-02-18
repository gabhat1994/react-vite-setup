import { type SyntheticEvent, useEffect as mockUseEffect } from 'react';
import { MockFile, render } from '@/test-utils';
import { ImageMessageBubble } from './index';

type MockMessagImageProps = JSX.IntrinsicElements['img'];

vi.mock('../styles.ts', async () => ({
  ...(await vi.importActual<{}>('../styles.ts')),
  MessageImage: ({ onLoad, ...rest }: MockMessagImageProps) => {
    mockUseEffect(() => {
      onLoad?.({} as SyntheticEvent<HTMLImageElement, Event>);
    }, [onLoad]);

    return <div {...rest} />;
  },
}));

global.URL.createObjectURL = vi.fn();

describe('ImageMessageBubble', () => {
  const media = {
    getContentTemporaryUrl: async () => 'https://picsum.photos/150/240',
    contentType: 'image/png',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;

  test('Should render', async () => {
    const { getByTestId, findByTestId } = render(
      <ImageMessageBubble media={media} status="sent" showStatus />,
    );

    expect(getByTestId('image-message-bubble')).toBeInTheDocument();
    expect(await findByTestId('message-image')).toBeInTheDocument();
  });

  test('Should render sent image', () => {
    const { getByTestId } = render(
      <ImageMessageBubble type="sent" media={media} />,
    );
    expect(
      window.getComputedStyle(getByTestId('message-bubble')).alignItems,
    ).toBe('flex-end');
  });

  test('Should render received image', () => {
    const { getByTestId } = render(
      <ImageMessageBubble type="received" media={media} />,
    );
    expect(
      window.getComputedStyle(getByTestId('message-bubble')).alignItems,
    ).toBe('flex-start');
  });

  test('Should have loading indicator', () => {
    const { getByTestId } = render(
      <ImageMessageBubble
        type="sent"
        status="sending"
        pendingFile={MockFile('file')}
      />,
    );
    const SpinnerEle = getByTestId('spinner');
    expect(SpinnerEle).toBeInTheDocument();
  });
});
