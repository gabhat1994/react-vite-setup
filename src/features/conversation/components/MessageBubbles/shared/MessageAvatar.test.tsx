import { render } from '@/test-utils';
import { MessageAvatar } from './MessageAvatar';

describe('MessageAvatar', () => {
  test('Renders without props', () => {
    const { queryByTestId } = render(<MessageAvatar />);
    expect(queryByTestId('message-avatar')).toBeNull();
  });

  test('Renders with message received', () => {
    const { getByTestId } = render(<MessageAvatar type="received" />);
    expect(getByTestId('message-avatar')).toBeInTheDocument();
  });

  test('Renders for received message without avatar', () => {
    const { getByTestId, queryByTestId } = render(
      <MessageAvatar type="received" />,
    );
    expect(getByTestId('message-avatar')).toBeInTheDocument();
    expect(queryByTestId('avatarContainer')).toBeNull();
  });

  test('Renders for non-received message', () => {
    const { queryByTestId } = render(<MessageAvatar type="sent" />);
    expect(queryByTestId('message-avatar')).toBeNull();
  });

  test('Renders with avatar', () => {
    const { queryByTestId } = render(
      <MessageAvatar
        type="received"
        userAvatar="https://www.w3schools.com/howto/img_avatar2.png"
        showAvatar
      />,
    );
    expect(queryByTestId('message-avatar')).toBeInTheDocument();
    expect(queryByTestId('avatarContainer')).toBeInTheDocument();
  });
});
