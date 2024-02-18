import { render } from '@/test-utils';
import { Header } from './index';

describe('<Header />', () => {
  test(`testing Header container styling`, () => {
    const { container, getByTestId } = render(
      <Header>
        <h1>Header</h1>
      </Header>,
    );
    const StyledHeader = getByTestId('header');
    expect(StyledHeader).toHaveStyle(`
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 16px 40px;
      gap: 10px;
      width: 100%;
      height: fit-content;
      background: var(--bg-top-nav-neutral-alt-default);
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      font-family: var(--font-family);
      align-items: center;
    `);

    expect(container).toBeTruthy();
  });

  test('check whether child is rendered or not', () => {
    const { getByText, container } = render(<Header>Component</Header>);
    expect(getByText('Component')).toBeInTheDocument();
    expect(container).toBeTruthy();
  });
});
