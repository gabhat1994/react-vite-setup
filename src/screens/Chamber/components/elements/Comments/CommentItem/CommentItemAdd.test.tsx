import { render, fireEvent } from '@/test-utils';
import ComentItemAdd from './ComentItemAdd';

const setContent = vi.fn();
const createNewComment = vi.fn();
const addTag = vi.fn();
const nonTrimmedEmptyString = '     ';
const nonEmptyString = 'something';
vi.mock('@/apollo/graphql', () => ({
  useGlobalSearchQuery: vi.fn().mockReturnValue({ refetch: vi.fn() }),
}));
const renderComponent = () =>
  render(
    <ComentItemAdd
      onSubmit={setContent}
      createComment={createNewComment}
      isReply={true}
      value=""
      isSubmitting={false}
      addTag={addTag}
    />,
  );

describe('<ComentItemAdd />', () => {
  test(`send button should be disabled when the input value is empty`, () => {
    const { getByTestId } = renderComponent();
    const input = getByTestId('mentionsInput');
    const sendButton = getByTestId('comment-item-add-send');
    input.focus();
    fireEvent.change(input, { target: { value: nonTrimmedEmptyString } });
    expect(sendButton).toBeDisabled();
  });

  test(`send button should be enabled when the value is not empty`, () => {
    const { getByTestId } = renderComponent();
    const input = getByTestId('mentionsInput');
    const sendButton = getByTestId('comment-item-add-send');
    input.focus();
    fireEvent.change(input, { target: { value: nonEmptyString } });
    expect(sendButton).not.toBeDisabled();
  });
});
