import { render } from '@/test-utils';
import { MessageStatus } from './MessageStatus';

describe('MessageSender', () => {
  test('Renders without props', () => {
    const { queryByTestId } = render(<MessageStatus />);
    expect(queryByTestId('message-status')).toBeNull();
  });

  test('Should render null for received message', () => {
    const { queryByTestId } = render(<MessageStatus type="received" />);
    expect(queryByTestId('message-status')).toBeNull();
  });

  test('Should render null for sent message without status', () => {
    const { queryByTestId } = render(<MessageStatus type="sent" />);
    expect(queryByTestId('message-status')).toBeNull();
  });

  test('Should render null for sent message with status: sending, success, failed', () => {
    const { queryByTestId: get0 } = render(
      <MessageStatus type="sent" status="sending" />,
    );
    expect(get0('message-status')).toBeNull();

    const { queryByTestId: get1 } = render(
      <MessageStatus type="sent" status="success" />,
    );
    expect(get1('message-status')).toBeNull();

    const { queryByTestId: get2 } = render(
      <MessageStatus type="sent" status="failed" />,
    );
    expect(get2('message-status')).toBeNull();
  });

  test('Should render status for sent message with status - read', () => {
    const { getByTestId } = render(
      <MessageStatus type="sent" status="read" showStatus />,
    );
    expect(getByTestId('message-status')).toBeInTheDocument();
    expect(getByTestId('status')).toBeInTheDocument();
    expect(getByTestId('status')).toHaveTextContent('Read');
  });

  test('Should render status for sent message with status - sent', () => {
    const { getByTestId } = render(
      <MessageStatus type="sent" status="sent" showStatus />,
    );
    expect(getByTestId('message-status')).toBeInTheDocument();
    expect(getByTestId('status')).toBeInTheDocument();
    expect(getByTestId('status')).toHaveTextContent('Sent');
  });

  test('Should render readers for sent message', () => {
    const { getByTestId } = render(
      <MessageStatus
        type="sent"
        status="sent"
        readers={['John', 'Max']}
        showStatus
      />,
    );
    expect(getByTestId('message-status')).toBeInTheDocument();
    expect(getByTestId('status')).toBeInTheDocument();
    expect(getByTestId('status')).toHaveTextContent('John, Max');
  });

  test('Should render readers for received message', () => {
    const { getByTestId } = render(
      <MessageStatus
        type="received"
        status="read"
        readers={['John', 'Max']}
        showStatus
      />,
    );
    expect(getByTestId('message-status')).toBeInTheDocument();
    expect(getByTestId('status')).toBeInTheDocument();
    expect(getByTestId('status')).toHaveTextContent('John, Max');
  });
});
