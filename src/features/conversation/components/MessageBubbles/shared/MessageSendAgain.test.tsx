import { render, fireEvent } from '@/test-utils';
import { MessageSendAgain } from './MessageSendAgain';

describe('MessageSendAgain', () => {
  test('Should render null without props', () => {
    const { queryByTestId } = render(<MessageSendAgain />);
    expect(queryByTestId('message-send-again')).toBeNull();
  });

  test('Should render null for received message', () => {
    const { queryByTestId } = render(<MessageSendAgain type="received" />);
    expect(queryByTestId('message-send-again')).toBeNull();
  });

  test('Should render null for non-failed', () => {
    const { queryByTestId } = render(
      <MessageSendAgain type="sent" status="read" />,
    );
    expect(queryByTestId('message-send-again')).toBeNull();
  });

  test('Should render component for failed, sent message', () => {
    const { getByTestId } = render(
      <MessageSendAgain type="sent" status="failed" />,
    );
    expect(getByTestId('message-send-again')).toBeInTheDocument();
  });

  test('Should nothing happen without onResend func', () => {
    const onResend = vi.fn();
    const { getByTestId } = render(
      <MessageSendAgain type="sent" status="failed" />,
    );
    fireEvent.click(getByTestId('send-button'));
    expect(onResend.mock.calls.length).toEqual(0);
  });

  test('Should resend message with onResend func', () => {
    const onResend = vi.fn();
    const { getByTestId } = render(
      <MessageSendAgain type="sent" status="failed" onResend={onResend} />,
    );
    fireEvent.click(getByTestId('send-button'));
    expect(onResend.mock.calls.length).toEqual(1);
  });
});
