import { render } from '@/test-utils';
import { ElementResizable } from '.';

describe('<ElementResizable/>', () => {
  test('renders with react node', () => {
    const { getByTestId } = render(
      <ElementResizable>
        <div data-testid="reactnode" />
      </ElementResizable>,
    );

    expect(getByTestId('reactnode')).toBeInTheDocument();
  });
});
