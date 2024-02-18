import { render, fireEvent, act } from '@/test-utils';
import { TokenNotification } from './TokenNotification';

describe('<TokenNotification />', () => {
  vi.useFakeTimers();

  test.skip('render Token Notification', async () => {
    const handleClose = vi.fn();
    const { container, getByTestId } = render(
      <TokenNotification
        isOpen
        tokens={120}
        reason=""
        handleClose={handleClose}
      />,
    );

    vi.runAllTimers();

    const tokenModalEle = getByTestId('tokenNotificationModal');
    const notificationContainerEle = getByTestId('token-notification');
    const tokenCountEle = getByTestId('token-count');
    const closeBtn = getByTestId('close-notification');

    expect(container).toBeTruthy();
    expect(tokenModalEle).toBeTruthy();
    expect(notificationContainerEle).toBeTruthy();
    expect(tokenCountEle).toBeTruthy();
    expect(closeBtn).toBeTruthy();

    act(() => {
      fireEvent.click(closeBtn);
    });

    expect(handleClose).toHaveBeenCalled();
  });
});
