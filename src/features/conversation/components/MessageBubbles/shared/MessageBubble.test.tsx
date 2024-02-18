import { render } from '@/test-utils';
import { MessageBubble } from './MessageBubble';

describe('MessageBubble', () => {
  test('Should render', () => {
    const { getByTestId } = render(<MessageBubble />);
    expect(getByTestId('message-bubble')).toBeInTheDocument();
  });
});
