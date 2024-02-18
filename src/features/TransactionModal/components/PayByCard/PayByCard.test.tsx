import { render } from '@/test-utils';
import PayByCard from '.';

describe('<PayByCard>', () => {
  it('should render the component with out selected prop', () => {
    const { container, getByTestId } = render(<PayByCard />);
    expect(container).toBeTruthy();
    const wrapper = getByTestId('pay-by-card-wrapper');
    expect(wrapper).toHaveStyle(`
         height:48px
    `);
  });
  it('should render the component with selected prop', () => {
    const { container, getByTestId } = render(<PayByCard selected={true} />);
    expect(container).toBeTruthy();
    const wrapper = getByTestId('pay-by-card-wrapper');
    expect(wrapper).toHaveStyle(`
         height:78px
    `);
  });
});
