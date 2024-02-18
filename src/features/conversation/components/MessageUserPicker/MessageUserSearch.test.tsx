import { render, fireEvent } from '@/test-utils';
import { MessageUserSearch } from './MessageUserSearch';
import { type InputFieldProps } from './types';

describe('MessageUserSearch', () => {
  const onCancel = vi.fn();
  const inputProps: InputFieldProps = {
    onChange: vi.fn(),
    onFocus: vi.fn(),
    onBlur: vi.fn(),
  };

  test('Should render', () => {
    const { getByTestId } = render(
      <MessageUserSearch
        inputProps={inputProps}
        cancellable={false}
        onCancel={onCancel}
      />,
    );
    expect(getByTestId('user-search')).toBeInTheDocument();
  });

  test('Should not render cancel button', () => {
    const { queryByTestId } = render(
      <MessageUserSearch
        inputProps={inputProps}
        cancellable={false}
        onCancel={onCancel}
      />,
    );
    expect(queryByTestId('cancel-button')).toBeNull();
  });

  test('Should render cancel button and cancel search ', () => {
    const { getByTestId } = render(
      <MessageUserSearch
        inputProps={inputProps}
        cancellable
        onCancel={onCancel}
      />,
    );
    expect(getByTestId('cancel-button')).toBeInTheDocument();
    fireEvent.click(getByTestId('cancel-button'));
    expect(onCancel.mock.calls.length).toEqual(1);
  });
});
