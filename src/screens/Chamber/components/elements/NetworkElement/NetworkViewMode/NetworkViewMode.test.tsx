import { render, screen } from '@/test-utils';
import { type ElementOutput } from '@/apollo/generated/types';
import { NetworkViewMode } from './NetworkViewMode';

const element = {} as ElementOutput;
const body = '{"linkedin":"temitope-ojo-2049"}';

describe('<NetworkViewMode />', () => {
  render(<NetworkViewMode body={body} spaceId="" element={element} />);
  test('Testing for rendering', () => {
    const container = screen.getByTestId('network-view-container');
    expect(container).toBeInTheDocument();
  });
});
