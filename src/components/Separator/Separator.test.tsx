import { render } from '@/test-utils';
import { Separator } from './Separator';

describe('<Separator>', () => {
  test('Separator Thin', () => {
    const { getByTestId } = render(<Separator size="thin" />);
    const SeparatorEle = getByTestId('separator');
    expect(SeparatorEle).toHaveStyle(`
    border-width: 1px 0 0 0;
    border-style: solid;
    border-color: var(--bg-separator-neutral-default);
    `);
  });

  test('Separator Thick', () => {
    const { getByTestId } = render(<Separator size="thick" />);
    const SeparatorEle = getByTestId('separator');
    expect(SeparatorEle).toHaveStyle(`
    border-width: 4px 0 0 0;
    border-style: solid;
    border-color: var(--bg-separator-neutral-default);
    `);
  });

  test('Separator with no size', () => {
    const { getByTestId } = render(<Separator />);
    const SeparatorEle = getByTestId('separator');
    expect(SeparatorEle).toHaveStyle(`
    border-width: 1px 0 0 0;
    border-style: solid;
    border-color: var(--bg-separator-neutral-default);
    `);
  });
});
