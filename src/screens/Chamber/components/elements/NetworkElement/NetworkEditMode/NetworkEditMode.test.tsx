import { render, screen } from '@/test-utils';
import NetworkEditMode from './NetworkEditMode';

const handleChange = vi.fn();

describe('<NetworkEditMode />', () => {
  render(<NetworkEditMode body="" handleChange={handleChange} />);
  test('Testing for rendering', () => {
    const container = screen.getByTestId('network-edit-mode-container');
    expect(container).toBeInTheDocument();
  });
});
