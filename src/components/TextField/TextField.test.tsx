import { render, fireEvent } from '@/test-utils';
import { Icon } from '@/components/Icon';
import { TextField } from './index';

describe('<TextField />', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(
      <TextField label="Label" data-testid="textfield" />,
    );
    expect(getByTestId('Styled-TextField')).toBeInTheDocument();
    const textfield = getByTestId('textfield');
    expect(textfield).toHaveStyle(`
    height: 56px;
    padding: 16px 12px;
    `);
  });
  test('renders with left image', () => {
    const { container } = render(
      <TextField
        leftIcon={
          <Icon
            name="search_m"
            size={20}
            color="--icon-input-neutral-default"
          />
        }
      />,
    );
    expect(container).toBeTruthy();
  });
  test('renders with right image', () => {
    const { container } = render(
      <TextField
        rightIcon={
          <Icon
            name="search_m"
            size={20}
            color="--icon-input-neutral-default"
          />
        }
      />,
    );
    expect(container).toBeTruthy();
  });
  test('renders with left and right image', () => {
    const { container, getByTestId } = render(
      <TextField
        leftIcon={
          <Icon
            name="search_m"
            size={20}
            color="--icon-input-neutral-default"
          />
        }
        rightIcon={
          <Icon
            name="search_m"
            size={20}
            color="--icon-input-neutral-default"
          />
        }
      />,
    );
    expect(container).toBeTruthy();
    const labelTestId = getByTestId('labelTestId');
    expect(labelTestId).toHaveStyle(`
    right: 90px;
    `);
  });
  test('renders with numberOnly', () => {
    const { container, getByTestId } = render(
      <TextField
        leftIcon={
          <Icon
            name="search_m"
            size={20}
            color="--icon-input-neutral-default"
          />
        }
        rightIcon={
          <Icon
            name="search_m"
            size={20}
            color="--icon-input-neutral-default"
          />
        }
        numberOnly
      />,
    );
    expect(container).toBeTruthy();
    const labelTestId = getByTestId('labelTestId');
    expect(labelTestId).toHaveStyle(`
    right: 90px;
    `);
  });
  test('Checks with input height, padding, Label transform, when size is small', () => {
    const { container, getByTestId } = render(
      <TextField inputSize="small" data-testid="textfield" />,
    );
    expect(container).toBeTruthy();
    const textfield = getByTestId('textfield');
    expect(textfield).toHaveStyle(`
    height: 40px;
    padding: 4px 12px;
    `);
    const labelTestId = getByTestId('labelTestId');
    expect(labelTestId).toHaveStyle(`
    transform: translate(12px,12px);
    `);
  });
  test('Checks with input height, padding, Label transform, when size is normal along with left icon', () => {
    const { container, getByTestId } = render(
      <TextField
        leftIcon={
          <Icon
            name="search_m"
            size={20}
            color="--icon-input-neutral-default"
          />
        }
        inputSize="normal"
        data-testid="textfield"
      />,
    );
    expect(container).toBeTruthy();
    const textfield = getByTestId('textfield');
    expect(textfield).toHaveStyle(`
    height: 56px;
    padding: 16px 12px 16px 44px;
    `);
    const labelTestId = getByTestId('labelTestId');
    expect(labelTestId).toHaveStyle(`
    transform: translate(44px,20px);
    `);
  });
  test('Checks with Paragraph color and label color on error', () => {
    const { container, getByTestId } = render(
      <TextField error helperText="Some error" />,
    );
    expect(container).toBeTruthy();
    const pTestId = getByTestId('pTestId');
    expect(pTestId).toHaveStyle(`
    color: var(--text-input-danger-primary-default);
    margin: 2px 0 0 12px;
    `);
  });
  test('Checks with Paragraph disabled', () => {
    const { container, getByTestId } = render(
      <TextField disabled helperText="Some text" />,
    );
    expect(container).toBeTruthy();
    const pTestId = getByTestId('pTestId');
    expect(pTestId).toHaveStyle(`
    color: var(--text-input-neutral-disabled);
    `);
    const labelTestId = getByTestId('labelTestId');
    expect(labelTestId).toHaveStyle(`
    color: var(--text-input-neutral-filled);
    `);
  });
  test('Checks with Label color when value present and disabled', () => {
    const { container, getByTestId } = render(<TextField value={12} />);
    expect(container).toBeTruthy();
    const labelTestId = getByTestId('labelTestId');
    expect(labelTestId).toHaveStyle(`
    transform: translate(12px,-9px);
    `);
  });

  test('Checks onChange event and respective styles', async () => {
    const handleOnChange = vi.fn();
    const { container, getByTestId } = render(
      <TextField
        value={12}
        data-testid="textfield"
        onChange={handleOnChange}
      />,
    );
    expect(container).toBeTruthy();
    const textfield = getByTestId('textfield');
    fireEvent.change(textfield, { target: { value: '345' } });
    expect((textfield as HTMLInputElement).value).toBe('345');
    expect(handleOnChange).toHaveBeenCalledTimes(1);
    const labelTestId = getByTestId('labelTestId');
    expect(labelTestId).toHaveStyle(`
    transform: translate(12px,-9px);
    `);
  });
});
