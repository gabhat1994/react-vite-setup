import { intersectionObserver } from '@/test-utils/stubs';
import { cleanup, render, screen } from '@/test-utils';
import { ConnectLinkedNoumsModal } from './Modal';

const onClose = vi.fn();
const onConfirm = vi.fn();

describe('<ConnectLinkedNoumsModal />', () => {
  beforeAll(() => intersectionObserver.mock());
  afterAll(() => {
    cleanup();
    intersectionObserver.restore();
  });
  test('renders', () => {
    render(
      <ConnectLinkedNoumsModal
        actionType="connect"
        onConfirm={onConfirm}
        onClose={onClose}
      />,
    );

    const modal = screen.getByTestId('noum-connect-with-linked-noums');
    expect(modal).toBeInTheDocument();

    const disconnectBtn = screen.getByTestId('noum-continue-button');
    expect(disconnectBtn).toBeInTheDocument();

    const closeBtn = screen.getByTestId('noum-cancel-button');
    expect(closeBtn).toBeInTheDocument();
  });
});
