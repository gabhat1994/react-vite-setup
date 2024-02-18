import { render } from '@/test-utils';
import { MediaMessageFailed } from './MediaMessageFailed';

describe('MediaMessageFailed', () => {
  test('Renders with `failed` message status', () => {
    const { getByTestId } = render(<MediaMessageFailed status="failed" />);
    expect(getByTestId('media-message-failed')).toBeInTheDocument();
  });

  test('Renders without status', () => {
    const { queryByTestId } = render(<MediaMessageFailed />);
    expect(queryByTestId('media-message-failed')).toBeNull();
  });

  test('Renders with status other than `failed`', () => {
    const { queryByTestId } = render(<MediaMessageFailed status="sending" />);
    expect(queryByTestId('media-message-failed')).toBeNull();
  });
});
