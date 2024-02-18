import { render } from '@/test-utils';
import { MessageSender } from './MessageSender';

describe('MessageSender', () => {
  test('Should render null without props', () => {
    const { queryByTestId } = render(<MessageSender />);
    expect(queryByTestId('message-sender')).toBeNull();
  });

  test('Should render null for non-received message', () => {
    const { queryByTestId } = render(<MessageSender type="sent" />);
    expect(queryByTestId('message-sender')).toBeNull();
  });

  test('Should render null without sender', () => {
    const { queryByTestId } = render(<MessageSender type="received" />);
    expect(queryByTestId('message-sender')).toBeNull();
  });

  test('Should render for received message with sender', () => {
    const { getByTestId } = render(
      <MessageSender type="received" sender="John" showSender />,
    );
    expect(getByTestId('message-sender')).toBeInTheDocument();
    expect(getByTestId('sender')).toHaveTextContent('John');
  });
});
