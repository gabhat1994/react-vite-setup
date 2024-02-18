import { render, screen } from '@/test-utils';
import { NetworkItem } from './index';

const items = [
  {
    data: {
      name: 'linkedin',
      link: 'linkedin.com/johndoe',
    },
  },
  {
    data: {
      name: 'github',
      link: 'github.com/johndoe',
    },
  },
  {
    data: {
      name: 'instagram',
      link: 'instagram.com/johndoe',
    },
  },
];
describe('<NetworkItem />', () => {
  render(
    <>
      {items.map((item) => (
        <NetworkItem {...item} key={`item-${item.data.link}`} />
      ))}
    </>,
  );
  test('Testing for rendering', () => {
    const githubItem = screen.getByTestId('item-github');
    const linkedin = screen.getByTestId('item-linkedin');
    const instagram = screen.getByTestId('item-instagram');
    expect(githubItem).toBeInTheDocument();
    expect(linkedin).toBeInTheDocument();
    expect(instagram).toBeInTheDocument();
  });
});
