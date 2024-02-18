import { render, screen } from '@/test-utils';
import NetworkEditItem from './index';

const handleChange = vi.fn();
const editItems = [
  {
    name: 'github',
    value: 'johndoe',
    label: 'https://github.com/',
  },
  {
    name: 'linkedin',
    value: 'johndoe',
    label: 'https://linkedin.in/',
  },
];
describe('<NetworkEditItem />', () => {
  render(
    <>
      {editItems.map((item) => (
        <NetworkEditItem
          handleChange={handleChange}
          {...item}
          key={`item-${item.value}`}
        />
      ))}
    </>,
  );
  test('Testing for rendering', () => {
    const githubItem = screen.getByTestId('item-github');
    const linkedin = screen.getByTestId('item-linkedin');
    expect(githubItem).toBeInTheDocument();
    expect(linkedin).toBeInTheDocument();
  });
});
