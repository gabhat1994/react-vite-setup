import { intersectionObserver } from '@/test-utils/stubs';
import { cleanup, render } from '@/test-utils';
import { Alert } from './index';

describe('<Alert />', () => {
  beforeEach(() => intersectionObserver.mock());
  afterEach(() => {
    cleanup();
    intersectionObserver.restore();
  });

  test('render alert', () => {
    const dismissHandler = vi.fn();
    const { getByTestId } = render(
      <Alert id="alertID" type="error" message="xxxxx" autoHideTime={5000} />,
    );
    const alert = getByTestId('alert-container');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveStyle(`
      background-color: var(--bg-snackbar-danger-primary-default);
      width: 343px;
      padding: 9px 16px;
      border-radius: 6px;
    `);
    setTimeout(() => {
      expect(dismissHandler).toBeCalled();
    }, 5000);
  });
});
