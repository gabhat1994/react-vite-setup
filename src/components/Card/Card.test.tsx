import { render } from '@/test-utils';
import { Card } from './index';

describe('<Card />', () => {
  test(`testing basic card's container styling`, () => {
    const { container, getByTestId } = render(<Card>Content</Card>);
    const StyledCardEle = getByTestId('card');
    expect(StyledCardEle).toHaveStyle(`
      position: relative;
      transition: all 0.1s ease-in-out;
      display: flex;
      flex-direction: column;
      border: none;
      border-radius: 16px;
      cursor: default;
      padding: 12px 24px;
      vertical-align: middle;
      overflow: hidden;
      background: var(--bg-card-neutral-alt-default);
      font-family: var(--font-body-medium-regular-font);
      font-size: var(--font-body-medium-size);
      font-weight: var(--font-body-medium-regular-weight);
      line-height: var(--font-body-medium-lineheight);
    `);

    expect(container).toBeTruthy();
  });
});
