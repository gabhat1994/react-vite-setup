import { fireEvent, render } from '@/test-utils';
import { TextArea } from './index';

describe('<TextArea />', () => {
  test(`testing basic text area's container styling with label`, () => {
    const { container, getByTestId } = render(
      <TextArea label="Name" value="Anna Smith">
        Content
      </TextArea>,
    );
    const StyledTextAreaEle = getByTestId('Styled-TextArea');
    expect(StyledTextAreaEle).toHaveStyle(`
      position: relative;
      background-color: var(--bg-input-neutral-default);
      border-radius: 8px;
      font-family: var(--font-input-medium-regular-font);
      position: relative;
      width: 100%;
    `);

    expect(container).toBeTruthy();
  });
  test(`testing basic text area's container styling without label`, () => {
    const { container, getByTestId } = render(
      <TextArea value="Anna Smith">Content</TextArea>,
    );
    const StyledTextAreaEle = getByTestId('Styled-TextArea');
    expect(StyledTextAreaEle).toHaveStyle(`
      position: relative;
      background-color: var(--bg-input-neutral-default);
      border-radius: 8px;
      font-family: var(--font-input-medium-regular-font);
      position: relative;
      width: 100%;
    `);

    expect(container).toBeTruthy();
  });

  test(`testing basic TextArea styling with label`, () => {
    const { container, getByTestId } = render(
      <TextArea label="name" value="Anna Smith">
        Content
      </TextArea>,
    );
    const StyledTextAreaEle = getByTestId('TextArea');
    expect(StyledTextAreaEle).toHaveStyle(`
    background-color: transparent;
    border: 0;
    box-sizing: border-box;
    color: var(--text-input-neutral-disabled);
    font-family: var(--font-input-medium-regular-font);
    font-size: var(--font-input-medium-size);
    height: 56px;
    outline: none;
    display: inline-flex;
    align-items: center;
    width: 100%;
    `);

    expect(container).toBeTruthy();
  });

  test(`testing basic TextArea styling without label`, () => {
    const { container, getByTestId } = render(
      <TextArea value="Anna Smith">Content</TextArea>,
    );
    const StyledTextAreaEle = getByTestId('TextArea');
    expect(StyledTextAreaEle).toHaveStyle(`
    background-color: transparent;
    border: 0;
    box-sizing: border-box;
    color: var(--text-input-neutral-disabled);
    font-family: var(--font-input-medium-regular-font);
    font-size: var(--font-input-medium-size);
    height: 56px;
    outline: none;
    display: inline-flex;
    align-items: center;
    width: 100%;
    `);

    expect(container).toBeTruthy();
  });

  test('Checks onChange event and respective styles', async () => {
    const handleOnChange = vi.fn();
    const { container, getByTestId } = render(
      <TextArea value={12} data-testid="textArea" onChange={handleOnChange} />,
    );
    expect(container).toBeTruthy();
    const textfield = getByTestId('textArea');
    fireEvent.change(textfield, { target: { value: '345' } });
    expect((textfield as HTMLInputElement).value).toBe('345');
    expect(handleOnChange).toHaveBeenCalledTimes(1);
    const labelTestId = getByTestId('labelTestId');
    expect(labelTestId).toHaveStyle(`
    transform: translate(12px,-7px);
    `);
  });

  test('Checks with padding, Label transform', () => {
    const { container, getByTestId } = render(
      <TextArea data-testid="textfield" />,
    );
    expect(container).toBeTruthy();
    const textfield = getByTestId('textfield');
    expect(textfield).toHaveStyle(`
    height: auto;
    `);
    const labelTestId = getByTestId('labelTestId');
    expect(labelTestId).toHaveStyle(`
    transform: 12px,18px;
    `);
  });

  test('Checks with Paragraph disabled', () => {
    const { container, getByTestId } = render(<TextArea disabled />);
    expect(container).toBeTruthy();
    const pTestId = getByTestId('pTestId');
    expect(pTestId).toHaveStyle(`
    color: var(--text-input-neutral-disabled);
    opacity: 0.2;
    `);
    const labelTestId = getByTestId('labelTestId');
    expect(labelTestId).toHaveStyle(`
    color: var(--text-input-neutral-disabled);
    opacity: 0.2;
    `);
  });

  test('Checks with resize is false', () => {
    const { container, getByTestId } = render(<TextArea resize={false} />);
    expect(container).toBeTruthy();
    const testTextArea = getByTestId('TextArea');
    expect(testTextArea).toHaveStyle(`
    resize: none;
    `);
  });

  test('Checks with Paragraph color and label color on error', () => {
    const { container, getByTestId } = render(<TextArea error />);
    expect(container).toBeTruthy();
    const pTestId = getByTestId('pTestId');
    expect(pTestId).toHaveStyle(`
    color: var(--text-input-danger-primary-default);
    margin: 2px 12px 0;
    `);
  });
});
