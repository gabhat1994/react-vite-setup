import { cleanup, render } from '@/test-utils';
import { BalanceComponentMain } from '.';

describe('BalanceComponent', () => {
  afterEach(() => {
    cleanup();
  });
  it('should Render BalanceComponent for normal size', async () => {
    const { container } = render(
      <>{() => <BalanceComponentMain label="test" amount={40} />}</>,
    );
    expect(container).toBeTruthy();
  });
});
