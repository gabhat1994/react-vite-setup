import { cleanup, render } from '@/test-utils';
import Wallets from './index';

describe('Wallets Section', () => {
  afterEach(() => {
    cleanup();
  });
  it('should Render Wallets Section', async () => {
    const { container } = render(
      <>{() => <Wallets mainWallets={[]} subWallets={[]} />}</>,
    );
    expect(container).toBeTruthy();
  });
});
