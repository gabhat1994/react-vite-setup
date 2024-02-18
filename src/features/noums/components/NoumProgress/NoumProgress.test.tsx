import { cleanup, render } from '@/test-utils';
import NoumProgressWrapper from './NoumProgress';
import { NoumProgressData } from './mock';

describe('<NoumProgressWrapper />', () => {
  afterEach(() => {
    cleanup();
  });

  test('render Noum progress ', () => {
    const handleOnClick = vi.fn();

    const { getByTestId } = render(
      <NoumProgressWrapper
        profileProgressPercentage={26}
        profileProgressItems={NoumProgressData}
        onItemClicked={handleOnClick}
      />,
    );

    expect(getByTestId('noumprogress-testid')).toHaveStyle(`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    min-width: 322px;
    border-radius: 16px;
    `);
  });
});
