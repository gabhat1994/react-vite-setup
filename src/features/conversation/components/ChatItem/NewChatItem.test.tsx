import { render } from '@/test-utils';
import NewChatItem from './NewChatItem';

describe('<NewChatItem />', () => {
  it('renders', () => {
    const { container } = render(<NewChatItem />);
    expect(container).toBeTruthy();
  });
});
