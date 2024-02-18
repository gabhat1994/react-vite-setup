import { render } from '@/test-utils';
import CommentItemName from './CommentItemName';

const userData = {
  _id: '153423332',
  firstName: 'Test',
  middleName: 'User',
  lastName: '1',
};
const renderComponent = () => render(<CommentItemName uid={userData} />);

describe('<CommentItemName />', () => {
  test(`testing CommentItemName styles`, () => {
    const { container, getByTestId } = renderComponent();
    const commentNameContainer = getByTestId('commentNameContainer');
    expect(commentNameContainer).toHaveStyle(`
      justify-content: space-between;
    `);
    expect(container).toBeTruthy();
  });

  test(`testing Name displayed`, () => {
    const { container, getByTestId } = renderComponent();
    const name = getByTestId('name');
    expect(name).toHaveTextContent('Test User 1');
    expect(container).toBeTruthy();
  });
});
