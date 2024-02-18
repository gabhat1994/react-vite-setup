import { cleanup, render } from '@/test-utils';
import Loading from '.';

describe('Loading', () => {
  afterEach(() => {
    cleanup();
  });
  it('should Render Loading', async () => {
    const { container } = render(
      <>{() => <Loading />}</>,
    );
    expect(container).toBeTruthy();
  });
});
