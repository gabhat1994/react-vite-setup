import { cleanup, fireEvent, waitFor } from '@testing-library/react';
import { intersectionObserver } from '@/test-utils/stubs';
import { render } from '@/test-utils';
import { Dropdown } from '.';

describe('<Dropdown/>', () => {
  test('renders with react node', () => {
    const { getByTestId } = render(
      <Dropdown options={[]} showInternalSearch>
        <div data-testid="reactnode" />
      </Dropdown>,
    );

    expect(getByTestId('reactnode')).toBeInTheDocument();
  });

  test('not open dropdown on clicking target', async () => {
    const { container, getByTestId } = render(
      <Dropdown options={[]}>
        <button type="button" data-testid="button">
          Button
        </button>
      </Dropdown>,
    );

    const target = getByTestId('button');

    await waitFor(() => fireEvent.click(target));

    const dropdownId = container.getAttribute('data-testid');

    expect(dropdownId).not.toBeInTheDocument();
  });

  test('renders with render prop with seach input', () => {
    const inputValue = 'testInputValue';
    const { getByText, getByTestId } = render(
      <Dropdown options={[]} showInternalSearch inputValue={inputValue}>
        {({ inputProps: { value } }) => (
          <div data-testid="renderprop">{value}</div>
        )}
      </Dropdown>,
    );

    expect(getByTestId('renderprop')).toBeInTheDocument();
    expect(getByText(inputValue)).toBeInTheDocument();
  });

  test('checking without portal', async () => {
    const { queryByTestId } = render(
      <Dropdown
        closeOnSelect={false}
        options={[{ type: 'value', label: 'Value', key: 'value', value: '' }]}
        usePortal={false}
      >
        <button type="button" data-testid="dropdown-button">
          Button
        </button>
      </Dropdown>,
    );

    expect(queryByTestId('dropdown-container')).toBeNull();
  });

  test('checking without icons', async () => {
    const { queryByTestId } = render(
      <Dropdown
        closeOnSelect={false}
        options={[{ type: 'value', label: 'Value', key: 'value', value: '' }]}
        usePortal={false}
        hideIcons
      >
        <button type="button" data-testid="dropdown-button">
          Button
        </button>
      </Dropdown>,
    );

    expect(queryByTestId('dropdown-icons')).toBeNull();
  });

  test('Checking dropdown styles', async () => {
    const { container } = render(
      <Dropdown
        closeOnSelect={false}
        options={[{ type: 'value', label: 'Value', key: 'value', value: '' }]}
      >
        <button type="button" data-testid="dropdown-button">
          Button
        </button>
      </Dropdown>,
    );

    expect(container.firstElementChild).toHaveStyle(`
      align-items: flex-start;
      border: 2px outset buttonface;
      display: inline-block;
      text-align: center;
    `);
  });
});

describe.skip('<Dropdown/>', () => {
  beforeEach(() => intersectionObserver.mock());
  afterEach(() => {
    cleanup();
    intersectionObserver.restore();
  });

  test('Checking that content of dropdown exist', async () => {
    const { getByTestId } = render(
      <Dropdown
        options={[{ type: 'value', label: 'Value', key: 'value', value: '' }]}
        isOpen={true}
      >
        <button type="button" data-testid="dropdown-button">
          Button
        </button>
      </Dropdown>,
    );

    expect(getByTestId('dropdown-container')).toBeInTheDocument();
  });

  test('closes on escape keydown', async () => {
    const { getByTestId, queryByTestId } = render(
      <Dropdown options={[]}>
        <button type="button" data-testid="button">
          Button
        </button>
      </Dropdown>,
    );

    const target = getByTestId('button');

    await waitFor(() => fireEvent.click(target));

    expect(getByTestId('dropdown-container')).toBeInTheDocument();

    await waitFor(() =>
      fireEvent.keyDown(document.body, {
        key: 'Escape',
        keyCode: 27,
        which: 27,
      }),
    );

    expect(queryByTestId('dropdown-container')).toBeNull();
  });

  test('does not close with click events within the dropdown container or target', async () => {
    const { getByTestId } = render(
      <Dropdown options={[]} showInternalSearch>
        <button type="button" data-testid="button">
          Button
        </button>
      </Dropdown>,
    );

    const target = getByTestId('button');

    await waitFor(() => fireEvent.click(target));

    const dropdownContainer = getByTestId('dropdown-container');

    await waitFor(() => fireEvent.click(dropdownContainer));

    expect(dropdownContainer).toBeInTheDocument();
  });

  test('renders with react node', () => {
    const { getByTestId } = render(
      <Dropdown options={[]} showInternalSearch>
        <div data-testid="reactnode" />
      </Dropdown>,
    );

    expect(getByTestId('reactnode')).toBeInTheDocument();
  });
});
