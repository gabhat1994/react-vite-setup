import { render } from '@/test-utils';
import { TextMessageBubble } from './index';

describe('TextMessageBubble', () => {
  test('Should render', () => {
    const { getByTestId } = render(<TextMessageBubble message="Sample text" />);
    expect(getByTestId('text-message-bubble')).toBeInTheDocument();
  });

  test('Should have message', () => {
    const { getByTestId } = render(<TextMessageBubble message="Sample text" />);
    expect(getByTestId('text-message')).toHaveTextContent('Sample text');
  });

  test('Should render sent message', () => {
    const { getByTestId } = render(
      <TextMessageBubble type="sent" message="Sample text" />,
    );
    expect(
      window.getComputedStyle(getByTestId('message-bubble')).alignItems,
    ).toBe('flex-end');
  });

  test('Should render received message', () => {
    const { getByTestId } = render(
      <TextMessageBubble type="received" message="Sample text" />,
    );
    expect(
      window.getComputedStyle(getByTestId('message-bubble')).alignItems,
    ).toBe('flex-start');
  });

  test('Should have loading element', () => {
    const { getByTestId } = render(
      <TextMessageBubble type="sent" status="sending" message="Sample text" />,
    );
    expect(getByTestId('spinner')).toBeInTheDocument();
  });
});
