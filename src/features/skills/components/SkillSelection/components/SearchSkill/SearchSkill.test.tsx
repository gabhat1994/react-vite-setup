import { fireEvent, waitFor, cleanup } from '@testing-library/react';
import { intersectionObserver } from '@/test-utils/stubs';
import { render } from '@/test-utils';
import { SearchSkill } from './SearchSkill';

describe('<SearchSkill />', () => {
  beforeEach(() => intersectionObserver.mock());
  afterEach(() => {
    cleanup();
    intersectionObserver.restore();
  });

  const options = [
    { key: '1', label: 'Option 1', value: 'Option 1', type: 'value' as const },
  ];

  test('opens dropdown once typed query', async () => {
    const { getByTestId } = render(<SearchSkill options={options} />);
    const inputComponent = getByTestId('input-component');
    await waitFor(() =>
      fireEvent.change(getByTestId('input-component'), {
        target: {
          value: 'query',
        },
      }),
    );
    expect(inputComponent).toHaveDisplayValue('query');
  });
  test('Checks with Icon height, padding, Label transform', () => {
    const { container, getAllByTestId, getByTestId } = render(
      <SearchSkill options={options} />,
    );
    expect(container).toBeTruthy();
    const [iconLeft] = getAllByTestId('svgIcon');
    expect(iconLeft).toHaveStyle(`
    height: 24;
    width: 24;
    `);
    const labelTestId = getByTestId('labelTestId');
    expect(labelTestId).toHaveStyle(`
    transform: translate(44px,20px);
    `);
  });
});
