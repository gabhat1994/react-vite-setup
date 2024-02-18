import { render } from '@/test-utils';
import { Circle, Text, CircleProgressBar } from './CircleProgressBar';

describe('<Circle />, <Text />', () => {
  test('render', () => {
    const { getByTestId } = render(
      <svg>
        <Circle color="red" r={100} bs={10} />
        <Text percentage={10} fontsize={10} />
      </svg>,
    );
    expect(getByTestId('svg-circle')).toBeInTheDocument();
    expect(getByTestId('svg-text')).toBeInTheDocument();
  });
});

describe('<ProgressBar />', () => {
  test('render', () => {
    const { getByTestId } = render(
      <CircleProgressBar percentage={50} circleSize={100} barSize={10} />,
    );
    expect(getByTestId('cpb-svg')).toBeInTheDocument();
  });
});
