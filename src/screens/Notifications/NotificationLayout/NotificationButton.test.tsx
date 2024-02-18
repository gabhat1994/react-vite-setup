import { fireEvent, render } from '@/test-utils';
import { NotificationButton } from './NotificationButton';
import { NotificationButtonsContext } from './NotificationButtons';

const contextValue = {
  loadingVariant: null,
  onButtonClick: vi.fn(),
};

describe('NotificationButton', () => {
  test('Should render button', () => {
    const { getByTestId } = render(
      <NotificationButtonsContext.Provider value={contextValue}>
        <NotificationButton variant="primary" />
      </NotificationButtonsContext.Provider>,
    );
    expect(getByTestId('button')).toBeInTheDocument();
  });

  test('Should call onButtonClick', () => {
    const onButtonClickFn = vi.fn();

    const { getByTestId } = render(
      <NotificationButtonsContext.Provider
        value={{
          loadingVariant: null,
          onButtonClick: onButtonClickFn,
        }}
      >
        <NotificationButton variant="primary" onClick={vi.fn()} />
      </NotificationButtonsContext.Provider>,
    );
    fireEvent.click(getByTestId('button'));
    expect(onButtonClickFn).toHaveBeenCalled();
  });

  test('Should has loading state for primary button', () => {
    const { getByTestId, queryByText } = render(
      <NotificationButtonsContext.Provider
        value={{ ...contextValue, loadingVariant: 'primary' }}
      >
        <NotificationButton variant="primary">
          <span>button text</span>
        </NotificationButton>
      </NotificationButtonsContext.Provider>,
    );
    expect(getByTestId('spinner')).toBeInTheDocument();
    expect(queryByText('button text')).not.toBeInTheDocument();
  });

  test('Should has loading state for secondary button', () => {
    const { getByTestId, queryByText } = render(
      <NotificationButtonsContext.Provider
        value={{ ...contextValue, loadingVariant: 'secondary' }}
      >
        <NotificationButton variant="secondary">
          <span>button text</span>
        </NotificationButton>
      </NotificationButtonsContext.Provider>,
    );
    expect(getByTestId('spinner')).toBeInTheDocument();
    expect(queryByText('button text')).not.toBeInTheDocument();
  });
});
