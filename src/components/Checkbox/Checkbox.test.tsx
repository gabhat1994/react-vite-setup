import { render, fireEvent } from '@/test-utils';
import { Icon } from '@/components/Icon';
import { Checkbox } from './Checkbox';

describe('<Chips />', () => {
  test('renders', () => {
    const { container } = render(
      <Checkbox
        isChecked={false}
        icon={
          <Icon
            name="tick_m"
            size={24}
            color="--icon-checkbox-neutral-alt-default"
          />
        }
      />,
    );

    expect(container).toBeTruthy();
  });

  test('checking checkbox clicks', () => {
    const { getByTestId, container } = render(
      <Checkbox
        isChecked={false}
        icon={
          <Icon
            name="tick_m"
            size={24}
            color="--icon-checkbox-neutral-alt-default"
          />
        }
      />,
    );
    expect(container).toBeTruthy();
    const checkbox = getByTestId('checkbox');
    fireEvent.click(checkbox);
  });

  test('triggering checkbox clicks when disable click is enabled', () => {
    const { getByTestId, container } = render(
      <Checkbox
        isChecked={false}
        disableClick={true}
        icon={
          <Icon
            name="tick_m"
            size={24}
            color="--icon-checkbox-neutral-alt-default"
          />
        }
      />,
    );
    expect(container).toBeTruthy();
    const checkbox = getByTestId('checkbox');
    fireEvent.click(checkbox);
  });

  test('checking  checkbox styles after active', () => {
    const { getByTestId, container } = render(
      <Checkbox
        isChecked={true}
        disableClick={true}
        icon={
          <Icon
            name="tick_m"
            size={24}
            color="--icon-checkbox-neutral-alt-default"
          />
        }
      />,
    );
    expect(container).toBeTruthy();
    const checkbox = getByTestId('checkbox');
    expect(checkbox).toHaveStyle(`
      background: var(--bg-checkbox-brand-primary-default);
      border-color: var(--border-checkbox-brand-primary-pressed);
    `);
  });
});
