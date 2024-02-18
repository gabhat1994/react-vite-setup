import { render } from '@/test-utils';
import { SubHeader } from './SubHeader';

describe('<SubHeader />', () => {
  test(`testing Header container styling`, () => {
    const { container, getByTestId } = render(
      <SubHeader>
        <h1>SubHeader</h1>
      </SubHeader>,
    );
    const StyledHeader = getByTestId('SubHeader');
    expect(StyledHeader).toHaveStyle(`
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 16px 40px;
      gap: 10px;
      width: 100%;
      height: fit-content;
      background-color: var(--bg-top-nav-neutral-alt-default);
      font-family: var(--font-family);
      align-items: center;
    `);

    expect(container).toBeTruthy();
  });

  test('check whether child is rendered or not', () => {
    const { getByText, container } = render(<SubHeader>Component</SubHeader>);
    expect(getByText('Component')).toBeInTheDocument();
    expect(container).toBeTruthy();
  });
});
