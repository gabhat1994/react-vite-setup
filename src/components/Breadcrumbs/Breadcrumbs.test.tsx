import { render } from '@/test-utils';
import { Breadcrumbs } from './Breadcrumbs';

const props = {
  title: 'welcome',
};

describe('<Breadcrumbs />', () => {
  test('renders title', () => {
    const { getByText } = render(<Breadcrumbs {...props} />);
    expect(getByText('welcome')).toBeInTheDocument();
  });

  test('renders leftIcon properly', () => {
    const { getByTestId } = render(
      <Breadcrumbs {...props} leftIcon={<div data-testid="left_icon" />} />,
    );

    expect(getByTestId('left_icon')).toBeInTheDocument();
  });

  test('renders leftSecondaryIcon properly', () => {
    const { getByTestId } = render(
      <Breadcrumbs
        {...props}
        leftSecondaryIcon={<div data-testid="left_secondary_icon" />}
      />,
    );

    expect(getByTestId('left_secondary_icon')).toBeInTheDocument();
  });

  test('renders rightIcon properly', () => {
    const { getByTestId } = render(
      <Breadcrumbs {...props} rightIcon={<div data-testid="right_icon" />} />,
    );

    expect(getByTestId('right_icon')).toBeInTheDocument();
  });

  test('renders rightSecondaryIcon properly', () => {
    const { getByTestId } = render(
      <Breadcrumbs
        {...props}
        rightSecondaryIcon={<div data-testid="right_secondary_icon" />}
      />,
    );

    expect(getByTestId('right_secondary_icon')).toBeInTheDocument();
  });

  test('renders rightSecondaryIcon properly', () => {
    const { getByTestId } = render(
      <Breadcrumbs
        {...props}
        rightSecondaryIcon={<div data-testid="right_secondary_icon" />}
      />,
    );

    expect(getByTestId('right_secondary_icon')).toBeInTheDocument();
  });
});
